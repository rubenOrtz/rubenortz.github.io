import { BookIcon, type LucideIcon, NotebookPenIcon } from 'lucide-react'
import type { LinkProps } from 'next/link'
import Link from 'next/link'
import type { ReactElement, ReactNode } from 'react'
import { cn } from '@/lib/cn'

export default function HomePage(): ReactElement {
  return (
    <main className='mx-auto flex w-full max-w-[1400px] flex-col px-4 py-16'>
      <h1 className='font-semibold text-2xl md:text-3xl'>Rubén Ortiz</h1>
      <p className='mt-1 text-fd-muted-foreground text-lg'>
        Senior Software Engineer · Flutter at Scale · Notes from the trenches.
      </p>
      <p className='mt-4 max-w-2xl text-fd-muted-foreground'>
        Senior Software Engineer at Symmetry Club. I write about Flutter at
        scale, engineering leadership, refactors with numbers, and AI-assisted
        development.
      </p>

      <div className='mt-8 grid grid-cols-1 gap-4 text-left md:grid-cols-2'>
        <HomeCard
          description='Long-form posts on Flutter, scale, leadership, and AI-assisted development.'
          href='/posts'
          icon={{ icon: NotebookPenIcon, id: '(index)' }}
          title='Posts'
        />

        <HomeCard
          description='Working notes and technical references.'
          href='/docs'
          icon={{ icon: BookIcon, id: 'docs' }}
          title='Docs'
        />
      </div>
    </main>
  )
}

function HomeCard({
  title,
  description,
  icon: { icon: ItemIcon, id },
  href,
}: {
  title: string
  description: string
  icon: {
    icon: LucideIcon
    id: string
  }
  href: string
}): ReactElement {
  return (
    <Item href={href}>
      <Icon className={id}>
        <ItemIcon className='size-full' />
      </Icon>
      <h2 className='mb-2 font-semibold text-lg'>{title}</h2>
      <p className='text-fd-muted-foreground text-sm'>{description}</p>
    </Item>
  )
}

function Icon({
  className,
  children,
}: {
  className?: string
  children: ReactNode
}): ReactElement {
  return (
    <div
      className={cn(
        'mb-2 size-9 rounded-lg border p-1.5 shadow-fd-primary/30',
        className
      )}
      style={{
        boxShadow: 'inset 0px 8px 8px 0px var(--tw-shadow-color)',
      }}
    >
      {children}
    </div>
  )
}

function Item(
  props: LinkProps & { className?: string; children: ReactNode }
): ReactElement {
  const { className, children, ...rest } = props
  return (
    <Link
      {...rest}
      className={cn(
        'rounded-2xl border border-border bg-fd-accent/30 p-6 shadow-lg backdrop-blur-lg transition-all hover:bg-fd-accent',
        className
      )}
    >
      {children}
    </Link>
  )
}
