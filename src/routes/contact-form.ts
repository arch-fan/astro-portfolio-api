import { type FastifyInstance, type RouteShorthandOptions } from 'fastify'
import { sendMail } from '../utils/mail'

interface FormData {
  name: string
  email: string
  message: string
}

const apiRoutes = async (fastify: FastifyInstance): Promise<void> => {
  fastify.get('/', () => {
    return { msg: 'Hola, no se si deberías estar aquí' }
  })

  // Ruta para manejar el formulario
  const postOptions: RouteShorthandOptions = {
    schema: {
      body: {
        type: 'object',
        required: ['name', 'email', 'message'],
        properties: {
          name: { type: 'string' },
          email: { type: 'string', format: 'email' },
          message: { type: 'string' }
        }
      }
    }
  }

  fastify.post('/', postOptions, async (request, reply) => {
    const { name, email, message } = request.body as FormData

    // Validación de los campos
    // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
    if (!name || !email || !message) {
      void reply.code(400).send({
        message: 'Deben estar todos los campos completos!',
        color: '#f90'
      })
    }

    if (!email.includes('@') ||
      !email.includes('.')
    ) {
      void reply.code(400).send({
        message: 'El email no es válido!',
        color: '#f90'
      })
    }

    void sendMail(
      process.env.OWNER_MAIL as string,
      `${name} ha contactado contigo.`,
      `
      Nombre: ${name}
      Email: ${email}
      Mensaje: ${message}
      `)

    void sendMail(
      email,
      'Gracias por contactar conmigo',
      `
      Hola ${name}!
      Gracias por contactar conmigo. Te responderé lo antes posible.
      `)

    void reply.send({
      message: 'El formulario se ha enviado correctamente.',
      color: '#0a0'
    })
  })
}

export default apiRoutes
