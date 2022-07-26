import express from 'express'
import { runServer } from './app'

export const app = express()

app.use(express.urlencoded({ extended: true }))
app.use(express.json())

const init = {
  schema: true,
}

const PORT = process.env.PORT || 4000

app.listen(PORT, async () => {
  if (init.schema === false) {
    console.log('init data...')
    await runServer()
  }

  console.log('server start!!')
})
