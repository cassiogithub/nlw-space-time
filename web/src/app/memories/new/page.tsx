import { ChevronLeft } from 'lucide-react'
import Link from 'next/link'
import { NewMemoryForm } from '../../../components/memories/NewMemoryForm'

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

      <NewMemoryForm />
    </div>
  )
}
