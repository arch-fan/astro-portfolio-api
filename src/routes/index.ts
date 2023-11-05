// src/routes/index.ts

import { type FastifyInstance } from 'fastify'
import contactFormRoute from './contact'
import og from './og'

const routes = async (fastify: FastifyInstance): Promise<void> => {
  void fastify.register(contactFormRoute, { prefix: '/contact' })
  void fastify.register(og, { prefix: '/og' })
}

export default routes
