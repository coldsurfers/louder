import Fastify from "fastify";

const fastify = Fastify({
  ignoreTrailingSlash: true,
  logger: {
    level: "info",
  },
});

async function main() {
  try {
    await fastify.listen({ port: 8001, host: "0.0.0.0" });
    fastify.log.info("server started", process.env.NODE_ENV);
  } catch (e) {
    fastify.log.error(e);
    process.exit(1);
  }
}

main();
