import type { FormEvent } from 'react'
import { Search } from 'lucide-react'
import { useNavigate } from 'react-router'

export function SearchBox() {
  const navigate = useNavigate()

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const q = String(new FormData(e.currentTarget).get('q') ?? '').trim()
    navigate(q ? `/customers?q=${encodeURIComponent(q)}` : '/customers')
  }

  return (
    <form role="search" onSubmit={handleSubmit} className="relative w-full lg:w-64">
      <Search
        className="pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 text-muted"
        aria-hidden
      />
      <input
        type="search"
        name="q"
        aria-label="Search customers"
        placeholder="Search customers..."
        className="h-10 w-full rounded-full border border-primary bg-surface pl-10 pr-4 text-base sm:text-sm outline-none placeholder:text-muted focus:ring-2 focus:ring-primary/20"
      />
    </form>
  )
}