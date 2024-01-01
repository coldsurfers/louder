import { FastifyPluginCallback } from "fastify";
import {
  postAdminPostCtrl,
  postAdminUploadTrack,
} from "../controllers/admin.ctrl";

const adminRoute: FastifyPluginCallback = (fastify, opts, done) => {
  fastify.post("/admin/posts", postAdminPostCtrl);
  fastify.post("/admin/uploads", postAdminUploadTrack);
  done();
};

export default adminRoute;
