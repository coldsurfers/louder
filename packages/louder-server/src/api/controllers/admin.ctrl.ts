import { FastifyError, RouteHandler } from "fastify";

import fs from "fs";
import util from "util";
import { pipeline } from "node:stream";
import path from "path";

const pump = util.promisify(pipeline);

export const postAdminPostCtrl: RouteHandler<{}> = async (req, rep) => {
  try {
    // const data = await req.file();
    // console.log(data?.fields);
    // await req.jwtVerify();
    // const decoded = (await req.jwtDecode()) as JWTDecoded
    // todo find user by auth token
    return rep.status(501).send();
  } catch (e) {
    const error = e as FastifyError;
    return rep.status(error.statusCode ?? 500).send(error);
  }
};

export const postAdminUploadTrack: RouteHandler<{
  Body: {
    track_file: any;
  };
}> = async (req, rep) => {
  try {
    const data = await req.file();
    if (data && data.file) {
      await pump(
        data.file,
        fs.createWriteStream(
          path.resolve(__dirname, `../../../public/media/${data?.filename}`)
        )
      );
    }

    return rep.status(201).send({
      id: 1,
      track_file: `http://localhost:8000/media/${data?.filename}`,
    });
  } catch (e) {
    const error = e as FastifyError;
    return rep.status(error.statusCode ?? 500).send(error);
  }
};
