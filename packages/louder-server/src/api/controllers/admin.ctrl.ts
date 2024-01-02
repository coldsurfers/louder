import { FastifyError, RouteHandler } from "fastify";

import fs from "fs";
import util from "util";
import { pipeline } from "node:stream";
import path from "path";
import Track from "../models/Track";
import Post from "../models/Post";
import Song from "../models/Song";
import AlbumCover from "../models/AlbumCover";

const pump = util.promisify(pipeline);

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
        await new AlbumCover({
          filename: album_cover.filename,
          post_id: postId,
          url: `http://localhost:8001/media/${album_cover.filename}`,
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
    if (data && data.file && data.filename) {
      await pump(
        data.file,
        fs.createWriteStream(
          path.resolve(__dirname, `../../../public/media/${data.filename}`)
        )
      );
    }

    const track = new Track({
      filename: data?.filename ?? "",
      url: `http://localhost:8001/media/${data?.filename ?? ""}`,
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
