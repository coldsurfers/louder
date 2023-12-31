import Fastify from "fastify";
import nconf from "nconf";
import path from "path";

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
    await fastify.listen({ port: nconf.get("port"), host: "0.0.0.0" });
    fastify.log.info("server started", process.env.NODE_ENV);
  } catch (e) {
    fastify.log.error(e);
    process.exit(1);
  }
}

main();
