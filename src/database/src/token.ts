import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

export const updateBlackList = async (token: string) => {
  return await prisma.tokenBlackList
    .create({
      data: {
        token,
      },
    })
    .then(() => {
      return true
    })
    .catch((err) => {
      throw err
    })
}

export const tokenBlackListCheck = async (token: string) => {
  const isCheck = await prisma.tokenBlackList.findFirst({
    where: {
      token,
    },
  })
  if (isCheck === null || isCheck === undefined) {
    return true
  }
  return false
}
