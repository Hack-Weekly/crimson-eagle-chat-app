import { ChatAppLogo } from '@/assets'
import Link from 'next/link'
import Toggle from '../ui/Toggle'
import { useTheme } from '@/hooks/useTheme'
import dynamic from 'next/dynamic'
import Image from 'next/image'
const SideLinks = dynamic(() => import('./sideLinks'), { ssr: false })

export default function Sidebar() {
  return (
    <div className="flex h-screen w-[100px] flex-col items-center gap-2 border-r bg-light-secondary p-3 dark:border-slate-700 dark:bg-dark">
      <div className="flex flex-grow flex-col items-center gap-2">
        <Link href="/">
          <ChatAppLogo />
        </Link>
        <SideLinks />
      </div>
      <div className="mb-3 flex flex-col items-center gap-5">
        <DarkModeToggle />
        <Image
          src="https://avatars.githubusercontent.com/u/107163858?v=4"
          alt="logo"
          className="cursor-pointer rounded-full"
          width={40}
          height={40}
        />
      </div>
    </div>
  )
}

function DarkModeToggle() {
  const { dark, changeDarkMode } = useTheme()
  return <Toggle checked={dark} onChange={changeDarkMode} />
}
