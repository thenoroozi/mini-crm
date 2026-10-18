import { forwardRef, useId } from 'react'
import type { InputHTMLAttributes, ReactNode } from 'react'
import { cn } from '../../lib/cn'

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
   label?: string
   error?: string
   endAdornment?: ReactNode
}

export const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
   { label, error, endAdornment, className, id, ...props },
   ref,
) {
   const autoId = useId()
   const inputId = id ?? autoId
   const errorId = `${inputId}-error`
   const hasAdornment = Boolean(endAdornment)
   return (
      <div className="flex flex-col gap-1.5">
         {label && (
            <label htmlFor={inputId} className="text-sm font-medium text-ink">
               {label}
            </label>
         )}
         <div className="relative">
            <input
               ref={ref}
               id={inputId}
               aria-invalid={error ? true : undefined}
               aria-describedby={error ? errorId : undefined}
               className={cn(
                  'h-10 w-full rounded-lg border bg-surface px-3 text-sm text-ink outline-none transition-colors',
                  'placeholder:text-muted focus:border-primary focus:ring-2 focus:ring-primary/20',
                  'disabled:cursor-not-allowed disabled:bg-canvas disabled:opacity-60',
                  hasAdornment && 'pr-11',
                  error ? 'border-danger' : 'border-line',
                  className,
               )}
               {...props}
            />
            {hasAdornment && (
               <div className="absolute inset-y-0 right-1.5 flex items-center">{endAdornment}</div>
            )}
         </div>
         {error && (
            <p id={errorId} className="text-xs text-danger">
               {error}
            </p>
         )}
      </div>
   )
})