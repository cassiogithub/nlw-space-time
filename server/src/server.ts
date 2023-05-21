import fastfy from 'fastify'
import cors from '@fastify/cors'
import jwt from '@fastify/jwt'

import { memoriesRoute } from './routes/memories'
import { authRoutes } from './routes/auth'
import 'dotenv/config'

const app = fastfy()

app.register(cors, {
  origin: 'http://localhost:3000',
})
app.register(jwt, {
  secret: process.env.JWT_SECRET as string,
})

app.register(memoriesRoute)
app.register(authRoutes)

app
  .listen({
    port: 3333,
  })
  .then(() => {
    console.log('🚀 http server running on http://localhost:3333')
  })
