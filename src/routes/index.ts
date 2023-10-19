// src/routes/index.ts

import { type FastifyInstance } from 'fastify'
import contactFormRoute from './contact-form'

const routes = async (fastify: FastifyInstance): Promise<void> => {
  void fastify.register(contactFormRoute, { prefix: '/contact' })
}

export default routes
