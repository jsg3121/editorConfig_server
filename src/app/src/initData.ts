import { PrismaClient } from '@prisma/client'
import cors from 'cors'
import express from 'express'
import { accountRouter, configRouter } from '../../router'

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

  app.listen(PORT, () => {
    console.log(PORT)
    console.log('server running...')
  })

  app.get('/api/fruits', (_, res) => {
    const data = [
      {
        id: 1,
        name: '포도',
        image: '🍇',
        stock: 10,
        price: 6000,
        isPrime: false,
      },
      {
        id: 2,
        name: '오렌지',
        image: '🍊',
        stock: 13,
        price: 5000,
        isPrime: true,
      },
      {
        id: 3,
        name: '앵두',
        image: '🍒',
        stock: 5,
        price: 1400,
        isPrime: true,
      },
      {
        id: 4,
        name: '레몬',
        image: '🍋',
        stock: 20,
        price: 500,
        isPrime: false,
      },
      {
        id: 5,
        name: '토마토',
        image: '🍅',
        stock: 10,
        price: 6000,
        isPrime: false,
      },
      {
        id: 6,
        name: '바나나',
        image: '🍌',
        stock: 10,
        price: 1000,
        isPrime: false,
      },
      {
        id: 7,
        name: '사과',
        image: '🍎',
        stock: 10,
        price: 9000,
        isPrime: true,
      },
      {
        id: 8,
        name: '메론',
        image: '🍈',
        stock: 10,
        price: 12000,
        isPrime: true,
      },
      {
        id: 9,
        name: '파인애플',
        image: '🍍',
        stock: 10,
        price: 10000,
        isPrime: false,
      },
      {
        id: 10,
        name: '복숭아',
        image: '🍑',
        stock: 10,
        price: 6400,
        isPrime: false,
      },
      {
        id: 11,
        name: '딸기',
        image: '🍓',
        stock: 10,
        price: 3200,
        isPrime: false,
      },
      {
        id: 12,
        name: '수박',
        image: '🍉',
        stock: 10,
        price: 8900,
        isPrime: false,
      },
    ]

    res.send(data)
    res.end()
  })

  app.post('/api/purchase', (req, res) => {
    res.send(req.body)
    res.end()
  })
}
