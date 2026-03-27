import * as React from 'react'
import { cn } from './cn'

export type DividerProps = React.HTMLAttributes<HTMLDivElement>

export function Divider({ className, ...props }: DividerProps) {
  return <div className={cn('h-px w-full bg-[#E0E0E0]', className)} {...props} />
}

