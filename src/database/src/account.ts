import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'
import { Types } from '../../types'

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

/**
 * info : 회원가입 중복체크
 * @author 장선규 jsg3121
 * @param {CreateAccountType} data 회원가입 입력 정보
 * @returns {Promise<ResponseData>}
 */
export const createAccount = async (
  data: CreateAccountType
): Promise<ResponseData> => {
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
      return {
        status: Types.APIRespose.SUCCESS,
        description: 'Sign Up Success',
      }
    })
    .catch((err) => {
      return { status: Types.APIRespose.BAD_REQUEST, description: err }
    })

  return result
}

/**
 * info : 로그인 체크
 * @author 장선규 jsg3121
 * @param {CreateAccountType} data 로그인 입력 정보
 * @returns {Promise<ResponseData<User>>}
 */
export const signInCheck = async (
  data: Omit<CreateAccountType, 'name'>
): Promise<ResponseData<User>> => {
  const user = await prisma.user.findUnique({
    where: {
      email: data.email,
    },
  })

  if (user === null) {
    return Promise.reject({
      status: Types.APIRespose.UNAUTHORIZED,
      description: '일치하는 계정이 존재하지 않습니다.',
    })
  } else {
    const isValid = bcrypt.compareSync(data.password, user.password)
    if (!isValid) {
      return Promise.reject({
        status: Types.APIRespose.UNAUTHORIZED,
        description: '일치하는 계정이 존재하지 않습니다.',
      })
    }
    return {
      status: Types.APIRespose.SUCCESS,
      description: 'Login Success',
      result: user,
    }
  }
}

/**
 * info : 토큰 데이터 내 이메일 유효화 체크
 * @author 장선규 jsg3121
 * @param email 이메일
 * @returns
 */
export const tokenEmailCheck = async (email: string) => {
  return await prisma.user
    .findUnique({
      where: {
        email,
      },
    })
    .then(() => {
      return true
    })
    .catch((err) => {
      console.log(err)
      return false
    })
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
