import { FastifyError, RouteHandler } from "fastify";

import fs from "fs";
import util from "util";
import { pipeline } from "node:stream";
import path from "path";
import { generateUUID } from "@coldsurfers/shared-utils";
import Track from "../models/Track";
import Post from "../models/Post";
import Song from "../models/Song";
import AlbumCover from "../models/AlbumCover";

const pump = util.promisify(pipeline);

export const getPostListCtrl: RouteHandler<{
  Querystring: {
    page: string;
  };
}> = async (req, rep) => {
  try {
    const { page: pageQueryString } = req.query;
    const page: number = +pageQueryString;
    const perPage = 20;
    const results = await Post.list({
      page,
      perPage,
    });
    const count = await Post.totalCount();
    return rep.status(200).send({
      results: results.map((result) => result.serialize()),
      next: results.length < perPage ? null : page + 1,
      previous: page === 1 ? null : page - 1,
      count,
    });
  } catch (e) {
    const error = e as FastifyError;
    return rep.status(error.statusCode ?? 500).send(error);
  }
};

export const getPostDetailCtrl: RouteHandler<{
  Params: {
    postId: string;
  };
}> = async (req, rep) => {
  try {
    const post = await Post.findById(req.params.postId);
    return rep.status(200).send({
      ...post?.serialize(),
    });
  } catch (e) {
    const error = e as FastifyError;
    return rep.status(error.statusCode ?? 500).send(error);
  }
};

export const postAdminPostCtrl: RouteHandler<{}> = async (req, rep) => {
  try {
    const data = await req.file();
    if (!data) {
      return rep.status(400).send();
    }
    const { fields } = data;
    const {
      album_cover,
      title,
      artist_name,
      song_names,
      album_track_file_names,
    } = fields;
    // todo: first create Post

    if (
      !Array.isArray(artist_name) &&
      artist_name?.type === "field" &&
      typeof artist_name.value === "string" &&
      !Array.isArray(title) &&
      title?.type === "field" &&
      typeof title.value === "string"
    ) {
      const post = await new Post({
        artist_name: artist_name.value,
        title: title.value,
      }).create();

      if (!post || !post.id) return rep.status(500).send();

      const { id: postId } = post;

      if (!Array.isArray(album_cover) && album_cover?.type === "file") {
        const randomFilename = `${generateUUID()}-${
          album_cover.filename ?? ""
        }`;
        await pump(
          album_cover.file,
          fs.createWriteStream(
            path.resolve(__dirname, `../../../public/media/${randomFilename}`)
          )
        );
        await new AlbumCover({
          filename: randomFilename,
          post_id: postId,
          url: `/media/${randomFilename}`,
        }).create();
      }

      let songIdsOnPost: string[] = [];

      if (song_names) {
        if (
          !Array.isArray(song_names) &&
          song_names.type === "field" &&
          typeof song_names.value === "string"
        ) {
          const songs = song_names.value.split(",");
          const songsOnPost = await Promise.all(
            songs.map(async (song) => {
              const created = await new Song({
                title: song,
                post_id: postId,
              }).create();
              return created;
            })
          );
          songIdsOnPost = songsOnPost.map((value) => value.id!);
        }
      }

      // todo: second, update postId of track
      if (album_track_file_names) {
        if (
          !Array.isArray(album_track_file_names) &&
          album_track_file_names.type === "field" &&
          typeof album_track_file_names.value === "string"
        ) {
          await Promise.all(
            album_track_file_names.value
              .split(",")
              .map(async (filename, index) => {
                const track = await Track.findByFilename(filename);
                if (!track) return;
                // eslint-disable-next-line no-underscore-dangle
                const _postId = post.id;
                if (_postId) {
                  await track.updatePostId({ postId: _postId });
                }
                // eslint-disable-next-line no-underscore-dangle
                const _songId = songIdsOnPost.at(index);
                if (_songId) {
                  await track.updateSongId({
                    songId: _songId,
                  });
                }
              })
          );
        }
      }
    }

    return rep.status(201).send();
  } catch (e) {
    const error = e as FastifyError;
    return rep.status(error.statusCode ?? 500).send(error);
  }
};

export const postAdminUploadTrack: RouteHandler<{}> = async (req, rep) => {
  try {
    const data = await req.file();
    const randomFilename = `${generateUUID()}-${
      data?.filename ? data.filename : ""
    }`;
    if (data && data.file) {
      await pump(
        data.file,
        fs.createWriteStream(
          path.resolve(__dirname, `../../../public/media/${randomFilename}`)
        )
      );
    }

    const track = new Track({
      filename: randomFilename,
      url: `/media/${randomFilename}`,
    });

    const created = await track.create();

    return rep.status(201).send({
      id: created.id,
      track_file: created.url,
    });
  } catch (e) {
    const error = e as FastifyError;
    return rep.status(error.statusCode ?? 500).send(error);
  }
};
