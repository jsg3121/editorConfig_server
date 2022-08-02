import { TokenService } from '../../service'
import { Types } from '../../types'

export const requestTokenCheck = async (headers: {
  authorization?: string
}) => {
  const { authorization = '' } = headers
  const tokenCheck = await TokenService.headerTokenCheck(authorization)
  if (tokenCheck) {
    return true
  }

  throw {
    code: Types.APIRespose.UNAUTHORIZED,
    description: '잘못된 접근 입니다.',
  }
}
