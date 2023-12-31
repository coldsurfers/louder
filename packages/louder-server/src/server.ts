import Fastify from 'fastify'

const fastify = Fastify({
    ignoreTrailingSlash: true,
    logger: {
      level: 'info',
    },
  })