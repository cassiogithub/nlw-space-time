import fastfy from 'fastify'
import { memoriesRoute } from './routes/memories'

const app = fastfy()
app.register(memoriesRoute)

app
  .listen({
    port: 3333,
  })
  .then(() => {
    console.log('🚀 http server running on http://localhost:3333')
  })
