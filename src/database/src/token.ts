import jwt from 'jsonwebtoken'
import { createTokenExpDate, getEnvValue } from '../../common'
import { tokenEmailCheck } from './account'
import dayjs from 'dayjs'

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

const createAccessToken = (email: CreateAccountType['email']) => {
  return [
    jwt.sign({ email }, ACCESS_KEY, TOKEN_OPTIONS.access),
    createTokenExpDate(TOKEN_OPTIONS.access.expiresIn),
  ]
}

const createRfreshToken = (email: CreateAccountType['email']) => {
  return [
    jwt.sign({ email }, REFRESH_KEY, TOKEN_OPTIONS.refresh),
    createTokenExpDate(TOKEN_OPTIONS.refresh.expiresIn),
  ]
}

const tokenCheck = async (token: string) => {
  const { iss, exp, email } = <jwt.JwtPayload>jwt.verify(token, ACCESS_KEY)

  const emailCheck = await tokenEmailCheck(email)
  const issCheck = TOKEN_OPTIONS.access.issuer === iss ? true : false

  if (emailCheck && issCheck) {
    return true
  }
  return false
}

export const TokenService = {
  createAccessToken,
  createRfreshToken,
  tokenCheck,
}
