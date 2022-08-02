import { createConfigSetting, findConfigList } from '../../database'
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

const getConfigList = async (id: string) => {
  return await findConfigList(parseInt(id, 10))
    .then((res) => {
      return { code: Types.APIRespose.SUCCESS, data: res }
    })
    .catch((err) => {
      console.log(err)
      return { code: Types.APIRespose.NO_CONTENT, data: [] }
    })
}

export const ConfigService = {
  createConfig,
  getConfigList,
}
