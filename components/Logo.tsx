import Image from 'next/image'
import Link from 'next/link'

interface Props {
  size?: 'sm' | 'md' | 'lg'
  href?: string
}

const sizes = {
  sm: { w: 28, h: 28, text: 'text-base' },
  md: { w: 36, h: 36, text: 'text-xl' },
  lg: { w: 48, h: 48, text: 'text-2xl' },
}

export default function Logo({ size = 'md', href = '/' }: Props) {
  const { w, h, text } = sizes[size]

  return (
    <Link href={href} className="flex items-center gap-2">
      <Image src="/logo.png" alt="PropostaTrack" width={w} height={h} className="object-contain" />
      <span className={`font-extrabold ${text}`}>
        <span className="text-[#1B3B6F]">Proposta</span>
        <span className="text-[#E85D04]">Track</span>
      </span>
    </Link>
  )
}
