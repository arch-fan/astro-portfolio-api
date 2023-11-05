import { PuppeteerLogic } from '../utils/puppeteerScreenshooter'
import { type FastifyInstance } from 'fastify'

const apiRoutes = async (fastify: FastifyInstance): Promise<void> => {
  fastify.get('/', async (request, reply) => {
    const { title } = request.query as { title: string }
    const pupInstance = await PuppeteerLogic.getInstance()

    await pupInstance.setContent(title)
    // Recortar screenshot
    await reply.header('Content-Type', 'image/png').send(await pupInstance.getScreenshot())
  })
}

export default apiRoutes
