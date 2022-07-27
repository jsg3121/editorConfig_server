import { Router } from 'express'
import {
  createAccount,
  signInCheck,
  TokenService,
  validationEmail,
} from '../../database'

export const accountRouter = Router()

// info : 이메일 체크
accountRouter.get<
  '/valid/email',
  unknown,
  unknown,
  Pick<CreateAccountType, 'email'>
>('/valid/email', async (req, res) => {
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
  } catch (error) {
    res.send(error)
  }
  res.end()
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
  } catch (error) {
    res.send(error)
  }
  res.end()
})

// info : 회원가입
accountRouter.post<'/signup', unknown, unknown, CreateAccountType>(
  '/signup',
  async (req, res) => {
    try {
      const result = await createAccount(req.body)
      res.send(result)
    } catch (error) {
      res.send(error)
    }
    res.end()
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
    const user = await signInCheck(req.body)

    const [accessToken, accessTokenExp] = TokenService.createAccessToken(
      req.body.email
    )
    const [refreshToken, refreshTokenExp] = TokenService.createRfreshToken(
      req.body.email
    )

    const responseData = {
      accessToken,
      accessTokenExp,
      refreshToken,
      refreshTokenExp,
      email: user.email,
      name: user.name,
    }

    res.send(responseData)
  } catch (error) {
    console.error(error)
    res.send(error)
  }
  res.end()
})

accountRouter.post<'/tokencheck', unknown, unknown, any>(
  '/tokencheck',
  async (req, res) => {
    const { accessToken } = req.body
    try {
      const isValid = await TokenService.tokenCheck(accessToken)
      if (!isValid) {
        res.send({
          isLogin: false,
        })
      } else {
        res.send({
          isLogin: true,
        })
      }
    } catch (error) {
      res.send({
        isLogin: false,
      })
    }
    res.end()
  }
)
