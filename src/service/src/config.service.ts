import { createConfigSetting } from '../../database'
import { ConfigRequest, Types } from '../../types'

const createConfig = async (value: ConfigRequest.POST) => {
  return await createConfigSetting(value)
    .then(() => {
      return {
        code: Types.APIRespose.SUCCESS,
        description: '생성이 완료되었습니다.',
      }
    })
    .catch(() => {
      return {
        code: Types.APIRespose.SUCCESS,
        description: '생성에 실패하였습니다.',
      }
    })
}

export const ConfigService = {
  createConfig,
}
