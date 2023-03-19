import clsx from 'clsx'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { ChatCircleDots, Users } from 'phosphor-react'

export default function SideLinksC() {
  const { asPath } = useRouter()

  return (
    <div className="mt-3 flex w-max flex-col items-center justify-center gap-3">
      {Nav_Buttons.map((el) => (
        <Link
          key={el.href}
          href={el.href}
          className={clsx(
            'rounded-md p-2 dark:text-white',
            el.href === asPath && 'bg-main-accent text-white'
          )}
        >
          {el.icon}
        </Link>
      ))}
    </div>
  )
}

const Nav_Buttons = [
  {
    index: 0,
    icon: <ChatCircleDots width={30} height={30} />,
    href: '/',
  },
  {
    index: 1,
    icon: <Users width={30} height={30} />,
    href: '/#',
  },
]
