import './globals.css'
import {
  Roboto_Flex as Roboto,
  Bai_Jamjuree as BaiJamjuree,
} from 'next/font/google'
import { ReactNode } from 'react'

const roboto = Roboto({ subsets: ['latin'], variable: '--font-roboto' })
const baiHamjuree = BaiJamjuree({
  subsets: ['latin'],
  weight: '700',
  variable: '--font-bai-jamjuree',
})

export const metadata = {
  title: 'NLW Spacetime',
  description: 'Uma capsula do tempo marcha',
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body
        className={`${roboto.variable} ${baiHamjuree.variable} bg-gray-950 font-sans text-gray-100`}
      >
        {children}
      </body>
    </html>
  )
}
