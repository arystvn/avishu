import * as React from 'react'
import { createPortal } from 'react-dom'
import { cn } from './cn'

export type ModalProps = {
  open: boolean
  onClose: () => void
  children: React.ReactNode
  className?: string
}

export function Modal({ open, onClose, children, className }: ModalProps) {
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => {
    setMounted(true)
  }, [])

  React.useEffect(() => {
    if (!open) return
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [open, onClose])

  if (!open || !mounted) return null

  return createPortal(
    <div className="fixed inset-0 z-50">
      <button
        aria-label="Close"
        className="absolute inset-0 cursor-default bg-black/20"
        onClick={onClose}
      />
      <div
        role="dialog"
        aria-modal="true"
        className={cn(
          'absolute inset-x-0 bottom-0 top-0 bg-white text-black translate-y-0 transition-transform duration-200',
          className,
        )}
      >
        {children}
      </div>
    </div>,
    document.body,
  )
}

