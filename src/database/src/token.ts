import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

export const updateBlackList = async (id: number, token: string) => {
  return await prisma.tokenBlackList.upsert({
    where: {
      id,
    },
    create: {
      token,
    },
    update: {
      token,
    },
  })
}

export const updateRefreshToken = async (userId: number, token: string) => {
  return await prisma.refreshTokenList.upsert({
    where: {
      userId,
    },
    create: {
      refreshToken: token,
      userId,
    },
    update: {
      refreshToken: token,
    },
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

export const validRefreshTokenCheck = async (refreshToken: string) => {
  const token = await prisma.refreshTokenList.findFirst({
    where: {
      refreshToken,
    },
  })

  if (token) {
    return true
  }
  return false
}
