import * as React from 'react'
import { cn } from './cn'

export type BadgeVariant = 'solid' | 'muted' | 'outline'

export type BadgeProps = React.HTMLAttributes<HTMLSpanElement> & {
  variant?: BadgeVariant
}

const variants: Record<BadgeVariant, string> = {
  solid: 'bg-black text-white border-black',
  muted: 'bg-[#F5F5F5] text-black border-[#E0E0E0]',
  outline: 'bg-transparent text-black border-black',
}

export function Badge({ className, variant = 'outline', ...props }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center border px-2 py-1 text-[11px] font-medium uppercase tracking-wider rounded-none',
        variants[variant],
        className,
      )}
      {...props}
    />
  )
}

