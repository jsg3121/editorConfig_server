import { Router } from 'express'
import {
  createAccount,
  selectUser,
  TokenService,
  validationEmail,
} from '../../database'
import bctypt from 'bcryptjs'

export const accountRouter = Router()

// info : 이메일 체크
accountRouter.get<
  '/valid/email',
  unknown,
  unknown,
  Pick<CreateAccountType, 'email'>
>('/valid/email', async (req, res) => {
  console.log(req.body)
  try {
    const isCheck = await validationEmail(req.body.email)
    if (isCheck) {
      res.send({
        status: 'success',
        description: '사용 가능한 계정입니다.',
      })
    } else {
      res.send({
        status: 'error',
        description: '중복된 계정이 존재합니다.',
      })
    }

    res.end()
  } catch (error) {
    res.send(error)
    res.end()
  }
})

// info : 이름 체크
accountRouter.get<
  '/valid/name',
  unknown,
  unknown,
  Pick<CreateAccountType, 'name'>
>('/valid/name', async (req, res) => {
  try {
    const isCheck = await validationEmail(req.body.name)
    if (isCheck) {
      res.send({
        status: 'success',
        description: '사용 가능한 이름입니다.',
      })
    } else {
      res.send({
        status: 'error',
        description: '중복된 이름이 존재합니다.',
      })
    }

    res.end()
  } catch (error) {
    res.send(error)
    res.end()
  }
})

// info : 회원가입
accountRouter.post<'/signup', unknown, unknown, CreateAccountType>(
  '/signup',
  async (req, res) => {
    try {
      const result = await createAccount(req.body)
      res.send(result)
      res.end()
    } catch (error) {
      res.send(error)
      res.end()
    }
  }
)

// info : 로그인
accountRouter.post<
  '/signin',
  unknown,
  unknown,
  Omit<CreateAccountType, 'name'>
>('/signin', async (req, res) => {
  try {
    const idCheck = await selectUser(req.body.email)
    if (idCheck) {
      const isValid = bctypt.compareSync(req.body.password, idCheck.password)
      if (!isValid) {
        throw new Error('비밀번호가 일치하지 않습니다.')
      }
      TokenService.create()
    } else {
      throw new Error('존재하지 않는 이메일 입니다.')
    }
  } catch (error) {
    throw error
  }
})
