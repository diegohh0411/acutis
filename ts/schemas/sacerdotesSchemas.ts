const common400 = {
    type: 'object',
    properties: {
        error: { type: 'string' },
        message: { type: 'string' }
    }
}

const common200 = {
    type: 'object',
    properties: {
        message: { type: 'string' }
    }
}

const crearSacerdote = {
    type : 'object',
    properties : {
        name : { type : 'string' },
        email : { type : 'string' },
        bio : { type : 'string' }
    },
    required : [ 'name', 'email']
}

const PrismaClientKnownRequestError = {
    type: 'object',
    properties: {
        error: { type: 'string' },
        message: {
            code: 'string',
            meta: {
                target: ['string']
            },
            message: 'string',
            clientVersion: 'string'
        }
    }
}

const getSacerdotes = {
    type: 'array',
    items: {
        name: {type: 'string'},
        bio: {type: 'string' | 'null'}
    }
}

export const crearSacerdotesSchema = {
    body : crearSacerdote,
    response : {
        200 : common200,
        201 : common200,
        400 : common400,
        403 : common400,
        409 : PrismaClientKnownRequestError,
        500 : common400
    }
}

export const getSacerdotesSchema = {
    response: {
        200: getSacerdotes,
        500: common400
    }
}