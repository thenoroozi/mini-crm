type SectionHeaderProps = {
  eyebrow: string
  title: string
  description: string
}

export function SectionHeader({ eyebrow, title, description }: SectionHeaderProps) {
  return (
    <div className="mx-auto mb-12 max-w-2xl text-center">
      <span className="text-sm font-semibold text-primary">{eyebrow}</span>
      <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
        {title}
      </h2>
      <p className="mt-4 leading-7 text-slate-600">{description}</p>
    </div>
  )
}