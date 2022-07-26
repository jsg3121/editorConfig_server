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
}

export {}
