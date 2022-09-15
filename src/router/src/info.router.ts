import { Router } from 'express'
import { ConfigFile } from '../../configSetting'

export const infoRouter = Router()

infoRouter.get('/info/:type', (req, res) => {
  res.send(ConfigFile.Prettier)
  res.end()
})
