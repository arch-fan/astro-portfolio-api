// src/index.ts

import Fastify from 'fastify'
import apiv1 from './routes'

const PORT = parseInt(process.env.PORT ?? '3000')
const fastify = Fastify({ logger: true })

void fastify.register(apiv1, { prefix: '/api' })

const start = async (): Promise<void> => {
  try {
    await fastify.listen({ port: PORT })
    console.log(`Listening on http://localhost:${PORT}`)
  } catch (err) {
    fastify.log.error(err)
    process.exit(1)
  }
}

void start()
