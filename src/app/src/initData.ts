import { PrismaClient } from '@prisma/client'
import cors from 'cors'
import express from 'express'
import { accountRouter, configRouter, infoRouter } from '../../router'

const prisma = new PrismaClient()

const init = {
  schema: true,
}

const initCheck = async () => {
  if (init.schema === false) {
    await prisma.user.create({
      data: {
        email: 'admin@master.com',
        name: 'admin',
        password: 'admin',
      },
    })
  }
}

export const runServer = async () => {
  const app = express()
  const PORT = process.env.PORT || 4000

  initCheck()

  app.use(cors())
  app.use(express.urlencoded({ extended: true }))
  app.use(express.json())
  app.use('/api/account', accountRouter)
  app.use('/api/config', configRouter)
  app.use('/api/config', infoRouter)

  app.listen(PORT, () => {
    console.log(PORT)
    console.log('server running...')
  })
}
