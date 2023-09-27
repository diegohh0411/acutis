import Fastify, { FastifyInstance } from 'fastify'

// Setup Fastify
const envToLogger = {
    development: {
      transport: {
        target: 'pino-pretty',
        options: {
          translateTime: 'HH:MM:ss Z',
          ignore: 'pid,hostname',
        },
      },
    },
    production: {
        level: 'error'
    }
}

const fastify : FastifyInstance = Fastify({
    logger: envToLogger.production ?? true // defaults to true if no entry matches in the map
})

// Register routes
import userManagement from './routes/userManagement'
fastify.register(userManagement)

// Function to start the server
const start = async () => {
    try {
        const address = fastify.server.address()
        const port = typeof address === 'string' ? address : address?.port

        await fastify.listen({
            port: 3000,
            listenTextResolver: (address) => { return `Acutis engine is listening at ${address}` }
        })        
    } catch (err) {
        fastify.log.error(err)
        process.exit(1)
    }
}

start()