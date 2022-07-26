import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

/**
 * info : 이메일 입력 실시간 중복체크
 * @author 장선규 jsg3121
 * @param {CreateAccountType['email']} data 이메일 입력값
 * @returns {Promise<boolean>}
 */
export const validationEmail = async (
  data: CreateAccountType['email']
): Promise<boolean> => {
  const validEmail = await prisma.user.findUnique({
    where: {
      email: data,
    },
  })

  if (validEmail) {
    return false
  } else {
    return true
  }
}

/**
 * info : 이름 입력 실시간 중복체크
 * @author 장선규 jsg3121
 * @param {CreateAccountType['name']} data 이름 입력값
 * @returns {Promise<boolean>}
 */
export const validationName = async (
  data: CreateAccountType['name']
): Promise<boolean> => {
  const validName = await prisma.user.findUnique({
    where: {
      name: data,
    },
  })

  if (validName) {
    return false
  } else {
    return true
  }
}

export const createAccount = async (data: CreateAccountType) => {
  const signUp = {
    email: data.email,
    name: data.name,
    password: bcrypt.hashSync(data.password, 10),
  }

  const result = await prisma.user
    .create({
      data: signUp,
    })
    .then(() => {
      return { code: 200, description: 'Sign Up Success' }
    })
    .catch((err) => {
      return { code: 400, description: err }
    })

  return result
}

// export const updateAccount = async (data: UpdateAccountType) => {
//   const result = await prisma.user.update({
//     where: {
//       email: data.email,
//     },
//     data: {
//       name: data.name,
//     },
//   })
// }
