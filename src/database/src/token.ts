import jwt from 'jsonwebtoken'
import { createTokenExpDate, getEnvValue } from '../../common'

const ACCESS_KEY = getEnvValue('JWT_ACCESS_PRIVATE_KEY', '')

const TOKEN_OPTIONS: jwt.SignOptions = {
  expiresIn: getEnvValue('JWT_ACCESS_EXP', '10d'),
}

const createToken = (email: CreateAccountType['email']) => {
  return [
    jwt.sign({ email }, ACCESS_KEY, TOKEN_OPTIONS),
    createTokenExpDate(TOKEN_OPTIONS.expiresIn),
  ]
}

export const TokenService = {
  createToken,
}
