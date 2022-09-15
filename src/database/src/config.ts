import { PrismaClient } from '@prisma/client'
import { ConfigRequest } from '../../types'

const prisma = new PrismaClient()

/**
 * info : create config setting
 * @author 장선규 jsg3121
 * @param createData
 * @returns
 */
export const createConfigSetting = async (createData: ConfigRequest.POST) => {
  const { configType, configDetail, userId, configName } = createData

  return await prisma.settingList
    .create({
      data: {
        userId,
        configDetail: JSON.stringify(configDetail),
        configName,
        configType,
      },
    })
    .catch((error) => {
      console.log(error)
    })
}

/**
 * info : get all config setting list
 * @author 장선규 jsg3121
 * @param getData
 * @returns
 */
export const findConfigList = async (getData: ConfigRequest.GET) => {
  const { userId } = getData

  return await prisma.settingList.findMany({
    where: {
      userId: parseInt(userId, 10),
    },
  })
}

/**
 * info : update select config setting
 * @author 장선규 jsg3121
 * @param patchData
 * @returns
 */
export const updateConfigSetting = async (patchData: ConfigRequest.PATCH) => {
  const { userId, value, configName } = patchData

  return await prisma.settingList.update({
    data: {
      configDetail: JSON.stringify(value),
      updateAt: new Date(),
      configName,
    },
    where: {
      id: parseInt(userId, 10),
    },
  })
}

/**
 * info : delete config setting
 * @author 장선규 jsg3121
 * @param deleteData
 * @returns
 */
export const deleteConfigSetting = async (deleteData: ConfigRequest.DELETE) => {
  const { configName, userId, id } = deleteData

  return await prisma.settingList.deleteMany({
    where: {
      id: parseInt(id, 10),
      userId: parseInt(userId, 10),
      configName,
    },
  })
}
