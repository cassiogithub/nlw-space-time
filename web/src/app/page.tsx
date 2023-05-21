import { SignIn, HeroSection, Copyright, Profile } from '../components'
import { EmptyMemories } from '../components/home/EmptyMemories'
import { cookies } from 'next/headers'

export default function Home() {
  const isAuthenticated = cookies().has('token')

  return (
    <main className="grid min-h-screen grid-cols-2">
      <div className="relative flex flex-col items-start justify-between overflow-hidden bg-[url('../assets/bg-stars.svg')] bg-cover px-28 py-16">
        <div className="absolute right-0 top-1/2 h-[288px] w-[526px] -translate-y-1/2 translate-x-1/2 rounded-full bg-purple-700 opacity-50 blur-full" />
        <div className="absolute bottom-0 right-2 top-0 w-2 border-white/10 bg-stripes" />

        {isAuthenticated ? <Profile /> : <SignIn />}

        <HeroSection />

        <Copyright />
      </div>

      <div className="flex flex-col bg-[url('../assets/bg-stars.svg')] bg-cover p-16">
        <EmptyMemories />
      </div>
    </main>
  )
}
