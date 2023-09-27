import { FastifyInstance, RouteOptions, HookHandlerDoneFunction } from 'fastify'
import { prisma } from '../dbManager'
import { crearSacerdotesSchema, getSacerdotesSchema } from '../schemas/sacerdotesSchemas'

export const sacerdotes = async (fastify : FastifyInstance , opts : RouteOptions, done : HookHandlerDoneFunction) => {

    fastify.get('/sacerdotes', {schema: getSacerdotesSchema}, async (request, reply) => {
        try {
            const users = await prisma.sacerdote.findMany()
            reply
                .code(200)
                .send(users.map(function (item) {
                    return {name: item.name, bio: item.bio}
                }))
        } catch {
            reply
                .code(500)
                .send({ error: 'Error Interno del Servidor', message: 'Ya estamos atendiendo el error. Gracias por tu paciencia.'})
        }
    })

    fastify.post('/primerSacerdote', {schema : crearSacerdotesSchema}, async (request: any, reply) => {
        try {
            const user = await prisma.sacerdote.findFirst({orderBy: {id: 'desc'}})
            if (user) {
                reply
                    .code(403)
                    .send({ error: 'Ya hubo un primer sacerdote', message: 'Al menos una cuenta de sacerdote ya existe; no puedes crear otra desde aquí. Pídele a un sacerdote con cuenta que registre una cuenta de sacerdote para ti.'})
            } else {
                const sacerdote = await prisma.sacerdote.create({
                    data: { 
                        name: request.body.name,
                        email: request.body.email,
                        bio: request.body.bio,
                    }
                })
            }
        } catch (serverError: any) {
            if (serverError.name === "PrismaClientKnownRequestError") {
                fastify.log.error(serverError.message)
                reply
                    .code(409)
                    .send({ error: serverError.name, message: serverError})
            } else {
                fastify.log.error(serverError)
                reply
                    .code(500)
                    .send({ error: 'Error Interno del Servidor', message: 'Ya estamos atendiendo el error. Gracias por tu paciencia.'})
            }
        }
        
    })

    fastify.post('/otroSacerdote', {schema: crearSacerdotesSchema}, async (request: any, reply) => {
        try {
            const sacerdote = await prisma.sacerdote.create({
                data: { 
                    name: request.body.name,
                    email: request.body.email,
                    bio: request.body.bio,
                }
            })
            reply
                .code(201)
                .send({message: 'Tu nuevo sacerdote se ha creado.'})
        } catch (serverError: any) {
            if (serverError.name === "PrismaClientKnownRequestError") {
                fastify.log.error(serverError.message)
                reply
                    .code(409)
                    .send({ error: serverError.name, message: serverError})
            } else {
                fastify.log.error(serverError)
                reply
                    .code(500)
                    .send({ error: 'Error Interno del Servidor', message: 'Ya estamos atendiendo el error. Gracias por tu paciencia.'})
            }
        }        
    })

    done()
}