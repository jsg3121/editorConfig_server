import { Router } from 'express'
import { requestTokenCheck } from '../../common'
import { ConfigService } from '../../service'
import { ConfigRequest, Types } from '../../types'

export const configRouter = Router()

//config 파일 CRUD

/**
 * info : config 파일 생성
 */

configRouter.all('/file', async (req, res) => {
  const { authorization = '' } = req.headers

  res.end()
})

configRouter.post<'/file', unknown, unknown, ConfigRequest.POST>(
  '/file',
  async (req, res) => {
    const { userId, type, value } = req.body

    try {
      await requestTokenCheck(req.headers)
      if (!userId || !type || !value) {
        res.send({
          code: Types.APIRespose.BAD_REQUEST,
          description: '잘못된 요청입니다.',
        })
      }

      const create = await ConfigService.createConfig(req.body)

      res.send(create)
    } catch (error) {
      res.send(error)
    }

    res.end()
  }
)

/**
 * info : config 파일 가져오기
 */
configRouter.get<'/file', unknown, unknown, any>('/file', (req, res) => {
  // db에 저장된 파일이 존재하면 해당 파일 불러옴
  // 저장된 파일이 없다면 새로 생성하는 페이지로 이동
  console.log('get')
})

/**
 * info : config 파일 수정
 */
configRouter.patch<'/file', unknown, unknown, any>('/file', (req, res) => {
  console.log('patch')
})

/**
 * info : config 파일 삭제
 */
configRouter.delete<'/file', unknown, unknown, any>('/file', (req, res) => {
  console.log('delete')
})
