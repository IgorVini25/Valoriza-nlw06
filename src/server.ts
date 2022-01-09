import 'reflect-metadata'
import express from 'express'
import 'express-async-errors'
import { errorMiddleware } from './middlewares/errors'

import './database'
import { router } from './routes'

const app = express()

app.use(express.json())
app.use(router)

app.use(errorMiddleware)

app.listen(3333, () => console.log('Server running at http://localhost:3333'))
