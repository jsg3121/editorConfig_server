import { Prisma } from '@prisma/client'

declare global {
  type CreateAccountType = Pick<
    Prisma.UserCreateInput,
    'name' | 'email' | 'password'
  >

  type UpdateAccountType = Pick<
    Prisma.UserCreateInput,
    'email' | 'name' | 'password'
  >

  type User = {
    id: number
    name: string
    email: string
    password: string
    createAt: Date
  }

  type SettingList = {
    id: number
    userId: number
    configType: string
    configDetail: string
    createAt: Date
    updateAt: Date
  }

  type TokenBlackList = {
    id: number
    token: string
  }

  type RefreshTokenList = {
    id: number
    userId: number
    token: string
  }

  type ResponseData<T = {}> = {
    status: number
    description: string
    result?: T
  }
}

export {}
