import CryptoJs from 'crypto-js'
import { getEnvValue } from './getEnvValue'

export const decryptToken = (token: string) => {
  const decrypt = CryptoJs.AES.decrypt(
    token,
    getEnvValue('CRYPTO_SECRET_KEY', '')
  ).toString(CryptoJs.enc.Utf8)
  return JSON.parse(decrypt)
}
