import nlwlogo from '../../assets/nlw-spacetime-logo.svg'
import Image from 'next/image'

export function HeroSection() {
  return (
    <div className="space-y-5">
      <Image src={nlwlogo} alt="NLW Spacetime" />

      <div className="max-w-[420px] space-y-4">
        <h1 className="text-5xl font-bold leading-none text-gray-50">
          Sua capsula do tempo
        </h1>
        <p className="text-lg leading-relaxed">
          Colecione momentos marcantes da sua jornada e compartilhe (se quiser)
          com o mundo!
        </p>
      </div>

      <a
        className="inline-block rounded-full bg-green-500 px-5 py-3 font-alt text-sm uppercase leading-none text-black hover:bg-green-700"
        href=""
      >
        CADASTRAR LEMBRANÇA
      </a>
    </div>
  )
}
