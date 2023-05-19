import fastfy from 'fastify'
import cors from '@fastify/cors'
import { memoriesRoute } from './routes/memories'

const app = fastfy()
app.register(memoriesRoute)
app.register(cors, {
  origin: 'http://localhost:3000',
})

app
  .listen({
    port: 3333,
  })
  .then(() => {
    console.log('🚀 http server running on http://localhost:3333')
  })
