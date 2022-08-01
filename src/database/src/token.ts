import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

/**
 * info : 기간이 만료됐거나 새로 로그인을 하여 더이상 사용하지 않는 토큰 저장
 * @author 장선규 jsg3121
 * @param token 블랙리스트에 추가 될 토큰
 * @returns
 */
export const createBlackListToken  = async (token: string) => {
  return await prisma.tokenBlackList.create({
    data: {
      token,
    },
  })
}

/**
 * info : 로그인시 생성된 refresh token을 데이터베이스에 추가
 * @author 장선규 jsg3121
 * @param userId 회원 번호
 * @param token 토큰
 * @returns
 */
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

/**
 * info : accessToken이 유효한지 체크
 * @param token 검사할 토큰
 * @returns
 */
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

/**
 * info : refreshToken의 유효성 검사
 * @param refreshToken refreshToken
 * @returns
 */
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
