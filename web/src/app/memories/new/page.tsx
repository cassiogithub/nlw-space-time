import Link from 'next/link'
import { Camera, ChevronLeft } from 'lucide-react'

export default function NewMemory() {
  return (
    <div className="flex flex-1 flex-col gap-4">
      <Link
        href="/"
        className="item-center flex gap-1 text-sm text-gray-200 hover:text-gray-100"
      >
        <ChevronLeft className="h4 w-4" />
        <span> Voltar à timeline</span>
      </Link>

      <form className="flex flex-1 flex-col gap-2">
        <div className="flex items-center gap-4">
          <input type="file" name="" id="media" className="sr-only" />
          <label
            htmlFor="media"
            className="flex cursor-pointer items-center gap-1.5 text-sm text-gray-200 hover:text-gray-100"
          >
            <Camera className="h-4 w-4" />
            Anexar mídia
          </label>

          <label
            htmlFor="isPublic"
            className="flex cursor-pointer items-center gap-1.5 text-sm text-gray-200 hover:text-gray-100"
          >
            <input
              type="checkbox"
              name=""
              id="isPublic"
              value="true"
              className="h-4 w-4 cursor-pointer rounded border-gray-400 bg-gray-700 text-purple-500"
            />
            Tornar memoria publica
          </label>
        </div>

        <textarea
          name="content"
          spellCheck="false"
          className="w-full flex-1 resize-none rounded border-0 bg-transparent p-0 text-lg leading-relaxed text-gray-100 placeholder:text-gray-400 focus:ring-0"
          placeholder="Fique livre para adicionar fotos, vídeos e relatos sobre essa experiência que você quer lembrar para sempre."
        />
      </form>
    </div>
  )
}
