import { Toast, ToastProvider, ToastViewport, ToastTitle, ToastDescription, ToastClose } from './Toast'
import { useState, useEffect } from 'react'

interface ToastProps {
  title?: string
  description?: string
  variant?: 'default' | 'success' | 'error'
  duration?: number
  onClose?: () => void
}

let toastId = 0
const toasts: Array<{ id: number; props: ToastProps }> = []
const listeners: Array<() => void> = []

export function toast(props: ToastProps) {
  const id = ++toastId
  toasts.push({ id, props })
  listeners.forEach((fn) => fn())
  
  if (props.duration !== 0) {
    setTimeout(() => {
      dismiss(id)
    }, props.duration || 4000)
  }
  
  return {
    dismiss: () => dismiss(id),
    update: (newProps: ToastProps) => {
      const index = toasts.findIndex((t) => t.id === id)
      if (index !== -1) {
        toasts[index].props = { ...toasts[index].props, ...newProps }
        listeners.forEach((fn) => fn())
      }
    },
  }
}

function dismiss(id: number) {
  const index = toasts.findIndex((t) => t.id === id)
  if (index !== -1) {
    toasts.splice(index, 1)
    listeners.forEach((fn) => fn())
  }
}

export function useToast() {
  const [, setState] = useState(toasts.length)
  
  useEffect(() => {
    const listener = () => setState((prev) => prev + 1)
    listeners.push(listener)
    return () => {
      const index = listeners.indexOf(listener)
      if (index !== -1) listeners.splice(index, 1)
    }
  }, [])
  
  return {
    toast,
    dismiss,
    toasts,
  }
}

export function Toaster() {
  const { toasts } = useToast()
  
  return (
    <ToastProvider>
      {toasts.map(({ id, props }) => (
        <Toast
          key={id}
          variant={props.variant === 'error' ? 'destructive' : (props.variant || 'default')}
          className="fixed bottom-6 right-6 z-50 w-[360px]"
        >
          <div className="grid gap-1">
            {props.title && <ToastTitle>{props.title}</ToastTitle>}
            {props.description && <ToastDescription>{props.description}</ToastDescription>}
          </div>
          <ToastClose onClick={() => dismiss(id)} />
        </Toast>
      ))}
      <ToastViewport />
    </ToastProvider>
  )
}

toast.success = (title: string, description?: string) => toast({ title, description, variant: 'success' })
toast.error = (title: string, description?: string) => toast({ title, description, variant: 'error' })
toast.info = (title: string, description?: string) => toast({ title, description, variant: 'default' })