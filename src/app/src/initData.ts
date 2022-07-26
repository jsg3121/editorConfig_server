import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export const runServer = async () => {
  await prisma.user.create({
    data: {
      email: 'admin@master.com',
      name: 'admin',
      password: 'admin',
    },
  })
}
