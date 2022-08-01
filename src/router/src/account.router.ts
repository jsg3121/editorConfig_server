import { Router } from 'express'
import {
  createAccount,
  signInCheck,
  updateRefreshToken,
  validationEmail,
} from '../../database'
import { TokenService } from '../../service'
import { TOKEN } from '../../types'

export const accountRouter = Router()

/**
 * info : 회원가입 이메일 중복체크
 */
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

/**
 * info : 회원가입 이름 중복체크
 */
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

/**
 * info : 회원가입
 */
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

/**
 * info : 로그인
 */
accountRouter.post<'/login', unknown, unknown, Omit<CreateAccountType, 'name'>>(
  '/login',
  async (req, res) => {
    try {
      const user = await signInCheck(req.body)

      const [accessToken, accessTokenExp] = TokenService.createAccessToken(
        req.body.email,
        user.name,
        user.id
      )
      const [refreshToken, refreshTokenExp] = TokenService.createRefreshToken(
        req.body.email,
        user.name,
        user.id,
        accessToken
      )

      await updateRefreshToken(user.id, refreshToken)

      const responseData = {
        accessToken,
        accessTokenExp,
        refreshToken,
        refreshTokenExp,
        email: user.email,
        name: user.name,
      }

      res.send({
        isLogin: true,
        ...responseData,
      })
    } catch (error) {
      console.error(error)
      res.send({
        isLogin: false,
      })
    }
    res.end()
  }
)

/**
 * info : 페이지 접속시 토큰 체크
 */
accountRouter.post<'/tokencheck', unknown, unknown, TOKEN.TokenRequest>(
  '/tokencheck',
  async (req, res) => {
    const { accessToken, refreshToken } = req.body

    const isValid = await TokenService.tokenCheck(accessToken)

    if (!isValid && refreshToken === undefined) {
      res.send({
        isLogin: false,
      })
    }

    try {
      // access 인증
      if (isValid) {
        res.send({
          isLogin: true,
        })
      } else {
        const isRefresh = await TokenService.refreshTokenCheck(refreshToken)

        if (isRefresh) {
          res.send({
            isLogin: true,
            ...isRefresh,
          })
        }

        if (!isRefresh) {
          res.send({
            isLogin: false,
          })
        }
      }
    } catch (err) {
      console.log('err')
    }

    res.end()
  }
)

/**
 * info : 로그아웃
 */
accountRouter.post<'/logout', unknown, unknown, TOKEN.TokenRequest>(
  '/logout',
  async (req, res) => {
    const { accessToken } = req.body

    try {
      const resetToken = await TokenService.resetToken(accessToken)
      if (resetToken) {
        res.send({
          isLogin: false,
        })
      }
    } catch (error) {
      console.log(error)
      res.send({
        isLogin: false,
      })
    }

    res.end()
  }
)
