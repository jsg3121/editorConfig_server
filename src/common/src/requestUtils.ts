import { TokenService } from '../../service'
import { Types } from '../../types'

/**
 * info : API요청시 헤더 토큰 정보 체크
 * @author 장선규 jsg3121
 * @param headers 토큰 정보
 * @returns
 */
export const requestTokenCheck = async (headers: {
  authorization?: string
}) => {
  const { authorization = '' } = headers
  const tokenCheck = await TokenService.headerTokenCheck(authorization)
  if (tokenCheck) {
    return true
  } else {
    throw {
      code: Types.APIRespose.UNAUTHORIZED,
      description: '잘못된 접근 입니다.',
    }
  }
}
