import { prisma } from './dbManager'

const newSacerdote = async (name: string, email: string, bio?: string) => {
    const sacerdote = await prisma.sacerdote.create({
        data: { 
            name: name,
            email: email,
            bio: bio ? bio : null,
        }
    })
}
export {newSacerdote}