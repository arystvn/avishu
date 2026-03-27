import * as React from 'react'
import { cn } from './cn'

export type ButtonVariant = 'primary' | 'outline' | 'ghost'
export type ButtonSize = 'md' | 'lg' | 'xl'

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant
  size?: ButtonSize
  fullWidth?: boolean
}

const base =
  'inline-flex items-center justify-center rounded-none border border-transparent px-6 font-medium uppercase tracking-wider transition-colors duration-150 select-none'

const variants: Record<ButtonVariant, string> = {
  primary:
    'bg-black text-white border-black hover:bg-black/90 active:bg-black/80 focus-visible:outline-none focus-visible:ring-0',
  outline:
    'bg-white text-black border-black hover:bg-black hover:text-white active:bg-black/90 focus-visible:outline-none focus-visible:ring-0',
  ghost:
    'bg-transparent text-black border-transparent hover:bg-black hover:text-white active:bg-black/90 focus-visible:outline-none focus-visible:ring-0',
}

const sizes: Record<ButtonSize, string> = {
  md: 'h-12 text-sm',
  lg: 'h-14 text-sm',
  xl: 'h-20 text-base',
}

export function Button({
  className,
  variant = 'primary',
  size = 'md',
  fullWidth,
  type,
  ...props
}: ButtonProps) {
  return (
    <button
      type={type ?? 'button'}
      className={cn(base, variants[variant], sizes[size], fullWidth && 'w-full', className)}
      {...props}
    />
  )
}

