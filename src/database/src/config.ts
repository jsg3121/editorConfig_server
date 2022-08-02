import { PrismaClient } from '@prisma/client'
import { ConfigRequest } from '../../types'
import { IPrettier } from '../../types/src/config.types'

const prisma = new PrismaClient()

export const createConfigSetting = async (data: ConfigRequest.POST) => {
  const { type, value, userId, configName } = data

  return await prisma.settingList.create({
    data: {
      userId: parseInt(userId, 10),
      configDetail: JSON.stringify(value),
      configName,
      configType: type,
    },
  })
}

export const findConfigList = async (id: number) => {
  return await prisma.settingList.findMany({
    where: {
      userId: id,
    },
  })
}

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
