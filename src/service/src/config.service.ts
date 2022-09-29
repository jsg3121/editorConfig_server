import {
  createConfigSetting,
  deleteConfigSetting,
  findConfigList,
  findDetailConfig,
  updateConfigSetting,
} from '../../database'
import { ConfigRequest, Types } from '../../types'

/**
 * info : config 생성
 * @author 장선규 jsg3121
 * @param value userId(사용자 id), type(config 타입), configName(저장된 config이름), value(config 설정)
 * @returns
 */
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

/**
 * info : 사용자가 설정한 config들의 목록 조회
 * @author 장선규 jsg3121
 * @param data userId(사용자 id)
 * @returns
 */
const getConfigList = async (data: ConfigRequest.GET) => {
  return await findConfigList(data)
    .then((res) => {
      return { code: Types.APIRespose.SUCCESS, data: res }
    })
    .catch((err) => {
      console.log(err)
      return { code: Types.APIRespose.NO_CONTENT, data: [] }
    })
}

const getDetailConfig = async (data: ConfigRequest.GET) => {
  return await findDetailConfig(data)
    .then((res) => {
      return { code: Types.APIRespose.SUCCESS, data: res }
    })
    .catch((err) => {
      return { code: Types.APIRespose.NO_CONTENT, data: [] }
    })
}

/**
 * info : 사용자가 수정한 config 설정 저장
 * @author 장선규 jsg3121
 * @param data userId(사용자 id), configName(저장된 config이름), value(config 설정)
 * @returns
 */
const updateConfig = async (data: ConfigRequest.PATCH) => {
  return await updateConfigSetting(data)
    .then((res) => {
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

/**
 * info : 사용자가 등록한 config 삭제
 * @param data userId(사용자 id), id(config id), configName(저장된 config이름)
 * @returns
 */
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
  getDetailConfig,
}
