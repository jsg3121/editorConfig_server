import { Prisma } from '@prisma/client'

global {
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
}

export {}
