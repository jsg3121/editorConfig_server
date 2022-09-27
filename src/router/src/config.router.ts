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
 * info : config 파일 가져오기 (모든 파일 가져오기)
 */
configRouter.get<'/file/:userId', ConfigRequest.GET>(
  '/file/:userId',
  async (req, res) => {
    try {
      await requestTokenCheck(req.headers)

      const data = await ConfigService.getConfigList(req.params)

      res.send(data)
    } catch (error) {
      res.send(error)
    }
    res.end()
  }
)

configRouter.get<'/detail/:userId', ConfigRequest.GET>(
  '/detail/:userId',
  async (req, res) => {
    try {
      await requestTokenCheck(req.headers)

      const data = await ConfigService.getDetailConfig(req.params)
      res.send(data)
    } catch (error) {
      res.send(error)
    }
  }
)

/**
 * info : config 파일 수정
 */
configRouter.patch<'/file', unknown, unknown, ConfigRequest.PATCH>(
  '/file',
  async (req, res) => {
    console.log(req.body)
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
configRouter.delete<'/delete/:userId/:id', ConfigRequest.DELETE>(
  '/delete/:userId/:id',
  async (req, res) => {
    try {
      await requestTokenCheck(req.headers)

      const deleteCofig = await ConfigService.deleteConfig(req.params)

      res.send(deleteCofig)
    } catch (error) {
      console.log(error)
      res.send(error)
    }

    res.end()
  }
)
