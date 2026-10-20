import { ChevronLeft, ChevronRight } from 'lucide-react'
import { cn } from '../../lib/cn'

type PaginationProps = {
  page: number
  pageSize: number
  total: number
  itemLabel: string
  onPageChange: (page: number) => void
}

// Shows first, last and the pages around the current one; gaps become an ellipsis.
function getPageItems(current: number, totalPages: number): Array<number | string> {
  const wanted = new Set([1, totalPages, current - 1, current, current + 1])
  const pages = [...wanted].filter((p) => p >= 1 && p <= totalPages).sort((a, b) => a - b)

  const items: Array<number | string> = []
  pages.forEach((p, i) => {
    if (i > 0 && p - pages[i - 1] > 1) items.push(`gap-${p}`)
    items.push(p)
  })
  return items
}

const arrowClass =
  'flex size-8 items-center justify-center rounded-lg text-ink transition-colors hover:bg-canvas disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:bg-transparent'

export function Pagination({ page, pageSize, total, itemLabel, onPageChange }: PaginationProps) {
  const totalPages = Math.max(1, Math.ceil(total / pageSize))
  const first = total === 0 ? 0 : (page - 1) * pageSize + 1
  const last = Math.min(page * pageSize, total)

  return (
    <nav
      aria-label="Pagination"
      className="flex flex-col items-center justify-between gap-3 border-t border-line px-5 py-4 sm:flex-row"
    >
      <p className="text-xs text-muted">
        Showing {first}–{last} of {total} {itemLabel}
      </p>

      {totalPages > 1 && (
        <div className="flex items-center gap-1">
          <button
            type="button"
            aria-label="Previous page"
            disabled={page <= 1}
            onClick={() => onPageChange(page - 1)}
            className={arrowClass}
          >
            <ChevronLeft className="size-4" aria-hidden />
          </button>

          <div className="hidden items-center gap-1 sm:flex">
            {getPageItems(page, totalPages).map((item) =>
              typeof item === 'string' ? (
                <span key={item} className="px-1 text-muted" aria-hidden>
                  …
                </span>
              ) : (
                <button
                  key={item}
                  type="button"
                  onClick={() => onPageChange(item)}
                  aria-current={item === page ? 'page' : undefined}
                  className={cn(
                    'size-8 rounded-lg text-xs font-medium transition-colors',
                    item === page ? 'bg-primary text-white' : 'text-ink hover:bg-canvas',
                  )}
                >
                  {item}
                </button>
              ),
            )}
          </div>

          <span className="px-2 text-xs text-muted sm:hidden">
            Page {page} of {totalPages}
          </span>

          <button
            type="button"
            aria-label="Next page"
            disabled={page >= totalPages}
            onClick={() => onPageChange(page + 1)}
            className={arrowClass}
          >
            <ChevronRight className="size-4" aria-hidden />
          </button>
        </div>
      )}
    </nav>
  )
}