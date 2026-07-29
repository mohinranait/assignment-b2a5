import Link from 'next/link'
import { Button } from '../ui/button'
import Logo from './Logo'
import { IUser } from '@/types/user.type'
type Props = {
   user: IUser
}
const Header = ({user}:Props) => {
  return (
    <header>
      <nav className="sticky top-0 z-40 border-b border-border bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60">
        <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <Logo />
            <div className="flex items-center gap-4">
              <Link href="/login">
                <Button variant="ghost" size="sm">
                  Sign In
                </Button>
              </Link>
              <Link href="/register">
                <Button size="sm">Get Started</Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>
    </header>
  )
}

export default Header