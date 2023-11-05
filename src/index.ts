import 'dotenv/config'
import Fastify from 'fastify'
import apiv1 from './routes'
import cors from '@fastify/cors'

const ADDRESS = process.env.ADDRESS ?? 'localhost'
const PORT = parseInt(process.env.PORT as string) ?? 3000

const fastify = Fastify({ logger: true })

void fastify.register(cors, {
  origin: false
})

void fastify.register(import('@fastify/rate-limit'), {
  global: false,
  timeWindow: '1 minute',
  allowList: ['127.0.0.1']
})

void fastify.register(apiv1, { prefix: '/api' })

const start = async (): Promise<void> => {
  try {
    await fastify.listen({ host: ADDRESS, port: PORT })
    console.log(`Listening on http://${ADDRESS}:${PORT}`)
  } catch (err) {
    fastify.log.error(err)
    process.exit(1)
  }
}

void start()
