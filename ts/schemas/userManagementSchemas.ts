interface ErrorReply {
    type: string,
    properties: {
        error: { type: string },
        message: { type: string }
    }
}

interface SuccessReply {
    type: string,
    properties: {
        message: { type: string }
    }
}

interface crearSacerdotesRequest {
    type: string,
    properties: {
        name: { type : string},
        email: { type : string},
        bio?: { type : string | null}
    },
    required : [string, string]
}

interface PrismaErrorReply {
    type: string,
    properties: {
        error: { type: string },
        message: {
            code: string,
            meta: {
                target: [string]
            },
            message: string,
            clientVersion: string
        }
    }
}

const common400:ErrorReply = {
    type: 'object',
    properties: {
        error: { type: 'string' },
        message: { type: 'string' }
    }
}

const common200:SuccessReply = {
    type: 'object',
    properties: {
        message: { type: 'string' }
    }
}

const commonCrearSacerdote:crearSacerdotesRequest = {
    type : 'object',
        properties : {
            name : { type : 'string' },
            email : { type : 'string' },
            bio : { type :  'string' || 'null' }
        },
    required : [ 'name', 'email']
}

const PrismaClientKnownRequestError:PrismaErrorReply = {
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

export const crearSacerdotesSchema = {
    body : commonCrearSacerdote,
    response : {
        200 : common200,
        201 : common200,
        400 : common400,
        403 : common400,
        409 : PrismaClientKnownRequestError,
        500 : common400
    }
}