import Image from 'next/image'
import { getUser } from '../../lib/auth'

export function Profile() {
  const { name, avatarUrl } = getUser()
  return (
    <div className="flex items-center gap-3 text-left">
      <Image
        src={avatarUrl}
        width={40}
        height={40}
        alt=""
        className="h-10 w-10 rounded-full"
      />

      <p className="max-w-[140px] cursor-default text-sm leading-snug">
        {name}

        <a
          href="/api/auth/logout"
          className="block text-red-500 hover:text-red-600"
        >
          Quero Sair
        </a>
      </p>
    </div>
  )
}
