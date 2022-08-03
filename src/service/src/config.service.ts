import {
  createConfigSetting,
  deleteConfigSetting,
  findConfigList,
  updateConfigSetting,
} from '../../database'
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

const updateConfig = async (data: ConfigRequest.PATCH) => {
  return await updateConfigSetting(data)
    .then((res) => {
      console.log(res)
      return { code: Types.APIRespose.SUCCESS, description: '수정되었습니다.' }
    })
    .catch((err) => {
      console.log(err)
      return {
        code: Types.APIRespose.SERVER_ERROR,
        description: '수정에 실패하였습니다.',
      }
    })
}

const deleteConfig = async (data: ConfigRequest.DELETE) => {
  return await deleteConfigSetting(data)
    .then(() => {
      return { code: Types.APIRespose.SUCCESS, description: '삭제되었습니다.' }
    })
    .catch((err) => {
      console.log(err)
      return {
        code: Types.APIRespose.SERVER_ERROR,
        description: '삭제에 실패하였습니다.',
      }
    })
}

export const ConfigService = {
  createConfig,
  getConfigList,
  updateConfig,
  deleteConfig,
}
