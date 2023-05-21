import { FastifyInstance } from 'fastify'
import { z } from 'zod'
import { prisma } from '../lib/prisma'

const CODE_UNAUTHORIZED = 401

export async function memoriesRoute(app: FastifyInstance) {
  app.addHook('preHandler', async (request) => {
    await request.jwtVerify()
  })

  app.get('/memories', async (request) => {
    const memories = await prisma.memory.findMany({
      where: {
        userId: request.user.sub,
      },
      orderBy: {
        createdAt: 'asc',
      },
    })

    return memories.map((memory) => ({
      id: memory.id,
      coverUrl: memory.coverUrl,
      excerpt: memory.content.substring(0, 115).concat('...'),
    }))
  })

  app.get('/memories/:id', async (request, reply) => {
    const paramsSchema = z.object({
      id: z.string().uuid(),
    })
    const { id } = paramsSchema.parse(request.params)

    const memory = await prisma.memory.findFirstOrThrow({
      where: { id },
    })

    if (!memory.isPublic && memory.userId !== request.user.sub) {
      return reply.status(CODE_UNAUTHORIZED).send()
    }

    return memory
  })

  app.post('/memories', async (request) => {
    const bodySchema = z.object({
      content: z.string(),
      isPublic: z.coerce.boolean().default(false),
      coverUrl: z.string(),
    })

    const { content, isPublic, coverUrl } = bodySchema.parse(request.body)
    await prisma.memory.create({
      data: {
        content,
        isPublic,
        coverUrl,
        userId: request.user.sub,
      },
    })
  })

  app.put('/memories/:id', async (request, reply) => {
    const paramsSchema = z.object({
      id: z.string().uuid(),
    })
    const bodySchema = z.object({
      content: z.string(),
      isPublic: z.coerce.boolean().default(false),
      coverUrl: z.string(),
    })
    const { content, isPublic, coverUrl } = bodySchema.parse(request.body)
    const { id } = paramsSchema.parse(request.params)

    const memory = await prisma.memory.findUniqueOrThrow({
      where: { id },
    })

    if (memory.userId !== request.user.sub) {
      return reply.status(CODE_UNAUTHORIZED).send()
    }

    return await prisma.memory.update({
      where: {
        id,
      },
      data: {
        content,
        isPublic,
        coverUrl,
      },
    })
  })

  app.delete('/memories/:id', async (request, reply) => {
    const paramsSchema = z.object({
      id: z.string().uuid(),
    })
    const { id } = paramsSchema.parse(request.params)

    const memory = await prisma.memory.findUniqueOrThrow({
      where: { id },
    })

    if (memory.userId !== request.user.sub) {
      return reply.status(CODE_UNAUTHORIZED).send()
    }

    await prisma.memory.delete({
      where: {
        id,
      },
    })
  })
}
