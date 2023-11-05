// src/routes/index.ts

import { type FastifyInstance } from 'fastify'
import contactFormRoute from './contact'

const routes = async (fastify: FastifyInstance): Promise<void> => {
  void fastify.register(contactFormRoute, { prefix: '/contact' })
}

export default routes
