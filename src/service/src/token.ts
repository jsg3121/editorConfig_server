import jwt from 'jsonwebtoken'
import { createTokenExpDate, getEnvValue } from '../../common'
import { tokenBlackListCheck, updateBlackList } from '../../database'
import { tokenEmailCheck } from '../../database/src/account'

const ACCESS_KEY = getEnvValue('JWT_ACCESS_PRIVATE_KEY', '')
const REFRESH_KEY = getEnvValue('JWT_REFRESH_PRIVATE_KEY', '')

const TOKEN_OPTIONS: {
  access: jwt.SignOptions
  refresh: jwt.SignOptions
} = {
  access: {
    // expiresIn: getEnvValue('JWT_ACCESS_EXP', '10d'),
    expiresIn: '20s',
    issuer: getEnvValue('JWT_ACCESS_ISSURE', ''),
  },
  refresh: {
    expiresIn: '60d',
    // expiresIn: getEnvValue('JWT_REFRESH_EXP', '30d'),
    issuer: getEnvValue('JWT_REFRESH_ISSURE', ''),
  },
}

const createAccessToken = (email: CreateAccountType['email'], name: string) => {
  return [
    jwt.sign({ email, name }, ACCESS_KEY, TOKEN_OPTIONS.access),
    createTokenExpDate(TOKEN_OPTIONS.access.expiresIn),
  ]
}

const createRefreshToken = (
  email: CreateAccountType['email'],
  name: string,
  accessToken: string
) => {
  return [
    jwt.sign({ email, name, accessToken }, REFRESH_KEY, TOKEN_OPTIONS.refresh),
    createTokenExpDate(TOKEN_OPTIONS.refresh.expiresIn),
  ]
}

const tokenCheck = async (token: string) => {
  try {
    const { iss, email } = <jwt.JwtPayload>jwt.verify(token, ACCESS_KEY)

    const emailCheck = await tokenEmailCheck(email)
    const issCheck = TOKEN_OPTIONS.access.issuer === iss ? true : false

    if (emailCheck && issCheck) {
      return true
    }
    return false
  } catch (error) {
    return false
  }
}

const refreshTokenCheck = async (token: string) => {
  try {
    const { iss, email, name, accessToken } = <jwt.JwtPayload>(
      jwt.verify(token, REFRESH_KEY)
    )

    const blackListCheck = await tokenBlackListCheck(accessToken)
    const emailCheck = await tokenEmailCheck(email)
    const issCheck = TOKEN_OPTIONS.refresh.issuer === iss ? true : false

    if (blackListCheck) {
      if (emailCheck && issCheck) {
        await updateBlackList(accessToken)
        const [newAccessToken, newAccessTokenExp] = createAccessToken(
          email,
          name
        )
        const [newRefreshToken, newRefreshTokenExp] = createRefreshToken(
          email,
          name,
          newAccessToken
        )
        return {
          newAccessToken,
          newAccessTokenExp,
          newRefreshToken,
          newRefreshTokenExp,
          email,
          name,
        }
      }
    }
    return false
  } catch (error) {
    return false
  }
}

export const TokenService = {
  createAccessToken,
  createRefreshToken,
  tokenCheck,
  refreshTokenCheck,
}
