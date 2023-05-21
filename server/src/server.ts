import 'dotenv/config'

import cors from '@fastify/cors'
import jwt from '@fastify/jwt'
import fastfy from 'fastify'

import multipart from '@fastify/multipart'
import { authRoutes } from './routes/auth'
import { memoriesRoute } from './routes/memories'
import { uploadRoutes } from './routes/upload'
import { resolve } from 'node:path'

const app = fastfy()

app.register(multipart)
app.register(cors, {
  origin: 'http://localhost:3000',
})

app.register(jwt, {
  secret: process.env.JWT_SECRET as string,
})

app.register(require('@fastify/static'), {
  root: resolve(__dirname, '../uploads'),
  prefix: '/uploads',
})

app.register(memoriesRoute)
app.register(authRoutes)
app.register(uploadRoutes)

app
  .listen({
    port: 3333,
  })
  .then(() => {
    console.log('🚀 http server running on http://localhost:3333')
  })
