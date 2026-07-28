import GearCard from '@/components/shared/GearCard';
import { Card } from '@/components/ui/card';
import { apiUrl } from '@/config/accessEnv';
import { cn } from '@/lib/utils';
import { IGear } from '@/types/gear.type';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react'


type Props= {
  className?: string
}

const Gears = async ({className}:Props) => {

  const res = await fetch(`${apiUrl}/gear`);
  const data = await res.json();

  const gears: IGear[] = data.data.gears || [];


  return (
    <div className={cn("mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3", className)}>
      {gears.map((item) => (
        <GearCard gear={item} key={item.id} />
      ))}
    </div>
  )
}

export default Gears