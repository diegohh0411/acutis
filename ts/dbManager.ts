import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export { prisma }
/*
async function main() {
    const user = await prisma.sacerdote.findMany()
    console.log(user)
}

main()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect
        process.exit(1)
    })
*/