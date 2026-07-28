import Link from 'next/link'
import React from 'react'

const Logo = () => {
  return (
   <Link href={'/'}>
    <div className="flex items-center gap-2">
      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary text-primary-foreground">
        <span className="font-bold">GR</span>
      </div>
      <span className="text-xl font-bold">GearRent</span>
    </div>
    </Link>
  )
}

export default Logo