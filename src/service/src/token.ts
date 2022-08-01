import jwt from 'jsonwebtoken'
import { createTokenExpDate, getEnvValue } from '../../common'
import {
  tokenBlackListCheck,
  createBlackList,
  updateRefreshToken,
  validRefreshTokenCheck,
} from '../../database'
import { tokenEmailCheck } from '../../database/src/account'

const ACCESS_KEY = getEnvValue('JWT_ACCESS_PRIVATE_KEY', '')
const REFRESH_KEY = getEnvValue('JWT_REFRESH_PRIVATE_KEY', '')

const TOKEN_OPTIONS: {
  access: jwt.SignOptions
  refresh: jwt.SignOptions
} = {
  access: {
    expiresIn: getEnvValue('JWT_ACCESS_EXP', '10d'),
    issuer: getEnvValue('JWT_ACCESS_ISSURE', ''),
  },
  refresh: {
    expiresIn: getEnvValue('JWT_REFRESH_EXP', '30d'),
    issuer: getEnvValue('JWT_REFRESH_ISSURE', ''),
  },
}

/**
 * info : accessToken 생성
 * @author 장선규 jsg3121
 * @param email 회원 이메일
 * @param name 회원 이름
 * @param id 회원 번호
 * @returns
 */
const createAccessToken = (
  email: CreateAccountType['email'],
  name: string,
  id: number
) => {
  return [
    jwt.sign({ email, name, id }, ACCESS_KEY, TOKEN_OPTIONS.access),
    createTokenExpDate(TOKEN_OPTIONS.access.expiresIn),
  ]
}

/**
 * info : refreshToken 생성
 * @author 장선규 jsg3121
 * @param email 회원 이메일
 * @param name 회원 이름
 * @param id 회원 번호
 * @returns
 */
const createRefreshToken = (
  email: CreateAccountType['email'],
  name: string,
  id: number,
  accessToken: string
): [string, string] => {
  return [
    jwt.sign(
      { email, name, id, accessToken },
      REFRESH_KEY,
      TOKEN_OPTIONS.refresh
    ),
    createTokenExpDate(TOKEN_OPTIONS.refresh.expiresIn),
  ]
}

/**
 * info : 자동로그인을 위한 토큰 유효성 검사
 * @author 장선규 jsg3121
 * @param token 유효성 토큰 체크
 * @returns
 */
const tokenCheck = async (token: string) => {
  const isBlackList = await tokenBlackListCheck(token)

  if (isBlackList) {
    try {
      const { iss, email } = <jwt.JwtPayload>jwt.verify(token, ACCESS_KEY)

      const emailCheck = await tokenEmailCheck(email)
      const issCheck = TOKEN_OPTIONS.access.issuer === iss ? true : false

      if (emailCheck && issCheck) {
        return true
      }
    } catch (error) {
      return false
    }
  }
  return false
}

/**
 * info : refreshToken의 유효성 검사
 * @author 장선규 jsg3121
 * @param token refreshToken유효성 검사
 * @returns
 */
const refreshTokenCheck = async (token: string) => {
  try {
    const { email, name, id, accessToken } = <jwt.JwtPayload>(
      jwt.verify(token, REFRESH_KEY)
    )
    await createBlackList(accessToken)

    const validRefreshToken = await validRefreshTokenCheck(token)

    if (validRefreshToken) {
      const [newAccessToken, newAccessTokenExp] = createAccessToken(
        email,
        name,
        id
      )
      const [newRefreshToken, newRefreshTokenExp] = createRefreshToken(
        email,
        name,
        id,
        newAccessToken
      )

      await updateRefreshToken(id, newRefreshToken)
      console.log('refresh check true')

      return {
        newAccessToken,
        newAccessTokenExp,
        newRefreshToken,
        newRefreshTokenExp,
        email,
        name,
      }
    }

    console.log('both fail')

    return false
  } catch (error) {
    console.log(error)
    return false
  }
}

export const TokenService = {
  createAccessToken,
  createRefreshToken,
  tokenCheck,
  refreshTokenCheck,
}
