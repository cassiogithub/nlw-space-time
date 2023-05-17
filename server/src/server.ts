import { PrismaClient } from '@prisma/client'
import fastfy from 'fastify'

const app = fastfy()

const prisma = new PrismaClient()
app.get('/users', () => {
  return prisma.user.findMany()
})

app.get('/hello', () => {
  return 'Hello World'
})

app
  .listen({
    port: 3333,
  })
  .then(() => {
    console.log('🚀 http server running on http://localhost:3333')
  })
