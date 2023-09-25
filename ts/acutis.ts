import Fastify, { FastifyInstance, RouteShorthandOptions } from 'fastify'
import { Server, IncomingMessage, ServerResponse } from 'http'

// Setup Fastify
const server:FastifyInstance = Fastify({})
const opts:RouteShorthandOptions = {
    schema: {
        response: {
            200: {
                type: 'object',
                properties: {
                    pong: {
                        type: 'string'
                    }
                }
            }
        }
    }
}

// Declare routes
server.get('/ping', opts, async (req, rep) => {
    return {pong: 'worked!'}
})

// Run the server
const start = async () => {
    try {
        await server.listen({port:3000})

        const address = server.server.address()
        const port = typeof address === 'string' ? address : address?.port
    } catch (err) {
        server.log.error(err)
        process.exit(1)
    }
}

// start()