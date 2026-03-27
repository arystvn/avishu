import * as React from 'react'
import { cn } from './cn'

export type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  label?: string
}

export function Input({ className, type = 'text', ...props }: InputProps) {
  return (
    <input
      type={type}
      className={cn(
        'w-full rounded-none border-0 border-b border-black bg-transparent px-0 py-3 text-base font-normal text-black outline-none placeholder:uppercase placeholder:tracking-wider placeholder:text-[#AAAAAA] focus:border-black focus:ring-0',
        className,
      )}
      {...props}
    />
  )
}

