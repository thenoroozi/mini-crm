import { forwardRef, useState } from 'react'
import type { ComponentPropsWithoutRef } from 'react'
import { Eye, EyeOff } from 'lucide-react'
import { Input } from './Input'

type PasswordInputProps = Omit<ComponentPropsWithoutRef<typeof Input>, 'type' | 'endAdornment'>

export const PasswordInput = forwardRef<HTMLInputElement, PasswordInputProps>(
  function PasswordInput(props, ref) {
    const [visible, setVisible] = useState(false)

    return (
      <Input
        ref={ref}
        type={visible ? 'text' : 'password'}
        endAdornment={
          <button
            type="button"
            onClick={() => setVisible((v) => !v)}
            aria-label={visible ? 'Hide password' : 'Show password'}
            aria-pressed={visible}
            className="flex size-8 items-center justify-center rounded-md text-muted hover:text-ink focus-visible:outline-2 focus-visible:outline-primary"
          >
            {visible ? (
              <EyeOff className="size-4" aria-hidden />
            ) : (
              <Eye className="size-4" aria-hidden />
            )}
          </button>
        }
        {...props}
      />
    )
  },
)