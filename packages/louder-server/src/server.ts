import Fastify from "fastify";
import nconf from "nconf";
import path from "path";
import AutoLoad from "@fastify/autoload";
import cors from "@fastify/cors";
import jwt from "@fastify/jwt";
import fastifyStatic from "@fastify/static";

const fastify = Fastify({
  ignoreTrailingSlash: true,
  logger: {
    level: "info",
  },
});

async function loadSettings() {
  return new Promise<void>((resolve, reject) => {
    try {
      nconf.file({
        file: path.resolve(__dirname, "./config/config.json"),
      });
      resolve();
    } catch (e) {
      reject(e);
    }
  });
}

async function main() {
  try {
    await loadSettings();
    await fastify.register(cors, {
      origin:
        process.env.NODE_ENV === "development"
          ? ["http://localhost:3000"]
          : ["https://louder.coldsurf.io"],
      preflight: true,
      methods: ["GET", "POST", "OPTIONS", "PATCH", "PUT", "DELETE"],
    });
    await fastify.register(fastifyStatic, {
      root: path.join(__dirname, "../public/assets"),
      prefix: "/static/",
    });
    await fastify.register(AutoLoad, {
      dir: path.resolve(__dirname, "./api/routes"),
      options: {
        prefix: "/v1",
      },
    });

    await fastify.register(jwt, {
      secret: nconf.get("secrets").jwt,
    });

    await fastify.setNotFoundHandler(async (req, res) =>
      res.sendFile("bundles/index.html")
    );

    await fastify.listen({ port: nconf.get("port"), host: "0.0.0.0" });
    fastify.log.info("server started", process.env.NODE_ENV);
  } catch (e) {
    fastify.log.error(e);
    process.exit(1);
  }
}

main();
