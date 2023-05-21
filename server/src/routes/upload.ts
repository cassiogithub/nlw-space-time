import { FastifyInstance } from 'fastify'
import { randomUUID } from 'node:crypto'
import { createWriteStream } from 'node:fs'
import { extname, resolve } from 'node:path'
import { pipeline } from 'node:stream'
import { promisify } from 'node:util'

const pump = promisify(pipeline)

const MAX_FILE_SIZE_IN_MB = 5_242_880
const BAD_REQUEST_CODE = 400

export async function uploadRoutes(app: FastifyInstance) {
  app.addHook('preHandler', async (request) => {
    await request.jwtVerify()
  })

  app.post('/upload', async (request, reply) => {
    const upload = await request.file({
      limits: {
        fileSize: MAX_FILE_SIZE_IN_MB,
      },
    })

    if (!upload) {
      return reply.status(BAD_REQUEST_CODE).send()
    }
    const mimeTypeRegex = /^(image|video)\/[a-zA-Z]+/
    const isValidFileFormat = mimeTypeRegex.test(upload.mimetype)

    if (!isValidFileFormat) {
      return reply.status(BAD_REQUEST_CODE).send()
    }

    const fileId = randomUUID()
    const extension = extname(upload.filename)
    const fileName = fileId.concat(extension)

    const writeStream = createWriteStream(
      resolve('__dirname', '../uploads/', fileName),
    )

    await pump(upload.file, writeStream)

    const fullUrl = request.protocol.concat('://').concat(request.hostname)
    const fileUrl = new URL(`/uploads/${fileName}`, fullUrl).toString()

    return { fileUrl }
  })
}
