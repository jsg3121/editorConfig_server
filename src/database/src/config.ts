import { PrismaClient } from '@prisma/client'
import { ConfigRequest } from '../../types'

const prisma = new PrismaClient()

export const createConfigSetting = async (data: ConfigRequest.POST) => {
  const { type, value, userId, configName } = data

  return await prisma.settingList.create({
    data: {
      userId: parseInt(userId, 10),
      configDetail: value,
      configName,
      configType: type,
    },
  })
}
