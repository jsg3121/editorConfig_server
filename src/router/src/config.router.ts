import { Router } from 'express'
import { requestTokenCheck } from '../../common'
import { ConfigService } from '../../service'
import { ConfigRequest, Types } from '../../types'

export const configRouter = Router()

//config 파일 CRUD

/**
 * info : config 파일 생성
 */
configRouter.post<'/file', unknown, unknown, ConfigRequest.POST>(
  '/file',
  async (req, res) => {
    const { userId, configType, configDetail } = req.body

    try {
      await requestTokenCheck(req.headers)
      if (
        userId === undefined ||
        configType === undefined ||
        configDetail === undefined
      ) {
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
configRouter.get<'/file', unknown, unknown, ConfigRequest.GET>(
  '/file',
  async (req, res) => {
    try {
      await requestTokenCheck(req.headers)

      const data = await ConfigService.getConfigList(req.body)

      res.send(data)
    } catch (error) {
      res.send(error)
    }
    res.end()
  }
)

/**
 * info : config 파일 수정
 */
configRouter.patch<'/file', unknown, unknown, ConfigRequest.PATCH>(
  '/file',
  async (req, res) => {
    try {
      await requestTokenCheck(req.headers)

      const patch = await ConfigService.updateConfig(req.body)

      res.send(patch)
    } catch (error) {
      console.log(error)
      res.send(error)
    }

    res.end()
  }
)

/**
 * info : config 파일 삭제
 */
configRouter.delete<'/file', unknown, unknown, ConfigRequest.DELETE>(
  '/file',
  async (req, res) => {
    try {
      await requestTokenCheck(req.headers)

      const deleteCofig = await ConfigService.deleteConfig(req.body)

      res.send(deleteCofig)
    } catch (error) {
      console.log(error)
      res.send(error)
    }

    res.end()
  }
)
