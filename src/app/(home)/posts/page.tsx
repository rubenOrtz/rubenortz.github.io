import type { Metadata } from 'next'
import Link from 'next/link'
import type { ReactElement } from 'react'
import { ArrowRight, Calendar, Clock, Rss } from 'lucide-react'
import { createMetadata } from '@/lib/metadata'
import { postsSource } from '@/lib/source'

export const metadata: Metadata = createMetadata({
  title: 'Posts',
  description: 'Long-form posts on Flutter at scale, leadership, and AI.',
})

function formatDate(input: string | Date): string {
  return new Date(input).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

function estimateReadMinutes(description: string | undefined): number {
  // We use the description as a proxy for length when the body isn't easily
  // available at index time. Floor at 4, ceiling at 20 — readers expect a
  // honest-feeling number, not a precise one.
  if (!description) return 6
  const proxyWords = description.split(/\s+/).length * 30
  return Math.min(20, Math.max(4, Math.round(proxyWords / 220)))
}

export default function PostsIndexPage(): ReactElement {
  const pages = postsSource.getPages()

  const sorted = [...pages].sort((a, b) => {
    const da = a.data.date ? new Date(a.data.date).getTime() : 0
    const db = b.data.date ? new Date(b.data.date).getTime() : 0
    return db - da
  })

  const [featured, ...rest] = sorted

  return (
    <main className='relative mx-auto w-full max-w-3xl px-4 py-16 md:py-24'>
      {/* Decorative gradient */}
      <div
        aria-hidden
        className='pointer-events-none absolute inset-x-0 top-0 -z-10 h-[320px] bg-gradient-to-b from-fd-accent/40 via-fd-accent/10 to-transparent'
      />

      {/* Hero */}
      <header className='mb-16'>
        <p className='mb-4 font-semibold text-fd-muted-foreground text-xs uppercase tracking-[0.18em]'>
          Posts · Notes from the trenches
        </p>
        <h1 className='font-bold text-4xl leading-[1.05] tracking-tight md:text-5xl lg:text-6xl'>
          Long-form writing on building software that ships.
        </h1>
        <p className='mt-6 max-w-2xl text-base text-fd-muted-foreground leading-relaxed md:text-lg'>
          Refactors with the numbers attached. Architecture decisions that never
          made it into a slide deck. The bumps along the way and what they teach
          you to look for next time.
        </p>
      </header>

      {/* Featured (latest) post */}
      {featured && (
        <section className='mb-16'>
          <SectionLabel>Latest</SectionLabel>
          <Link
            href={featured.url}
            className='group relative block overflow-hidden rounded-2xl border border-fd-border bg-fd-card p-8 transition-all duration-200 hover:-translate-y-0.5 hover:border-fd-foreground/30 hover:shadow-xl md:p-10'
          >
            {/* Hover gradient sheen */}
            <div
              aria-hidden
              className='pointer-events-none absolute inset-0 bg-gradient-to-br from-transparent via-fd-accent/0 to-fd-accent/40 opacity-0 transition-opacity duration-300 group-hover:opacity-100'
            />

            <div className='relative'>
              <div className='mb-5 flex flex-wrap items-center gap-x-4 gap-y-2 text-fd-muted-foreground text-xs'>
                {featured.data.date && (
                  <time
                    dateTime={new Date(featured.data.date).toISOString()}
                    className='flex items-center gap-1.5'
                  >
                    <Calendar className='size-3.5' aria-hidden />
                    {formatDate(featured.data.date)}
                  </time>
                )}
                <span className='flex items-center gap-1.5'>
                  <Clock className='size-3.5' aria-hidden />
                  {estimateReadMinutes(featured.data.description)} min read
                </span>
              </div>

              <h2 className='font-bold text-2xl leading-tight tracking-tight transition-colors group-hover:text-fd-primary md:text-3xl lg:text-4xl'>
                {featured.data.title}
              </h2>

              {featured.data.description && (
                <p className='mt-5 text-base text-fd-muted-foreground leading-relaxed md:text-lg'>
                  {featured.data.description}
                </p>
              )}

              <div className='mt-7 inline-flex items-center gap-2 font-medium text-fd-foreground/80 text-sm transition-colors group-hover:text-fd-foreground'>
                Read the post
                <ArrowRight
                  className='size-4 transition-transform group-hover:translate-x-1'
                  aria-hidden
                />
              </div>
            </div>
          </Link>
        </section>
      )}

      {/* Earlier posts */}
      {rest.length > 0 && (
        <section className='mb-16'>
          <SectionLabel>Earlier</SectionLabel>
          <ul className='-mx-4 flex flex-col divide-y divide-fd-border'>
            {rest.map((page) => (
              <li key={page.url}>
                <Link
                  href={page.url}
                  className='group flex flex-col gap-2 rounded-lg px-4 py-5 transition-colors hover:bg-fd-accent/30 md:flex-row md:items-baseline md:gap-6'
                >
                  <div className='flex-1'>
                    <h3 className='font-medium text-base leading-snug transition-colors group-hover:text-fd-primary md:text-lg'>
                      {page.data.title}
                    </h3>
                    {page.data.description && (
                      <p className='mt-1 line-clamp-2 text-fd-muted-foreground text-sm'>
                        {page.data.description}
                      </p>
                    )}
                  </div>
                  {page.data.date && (
                    <time
                      dateTime={new Date(page.data.date).toISOString()}
                      className='whitespace-nowrap text-fd-muted-foreground text-xs'
                    >
                      {formatDate(page.data.date)}
                    </time>
                  )}
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* Empty state — only shows when there's exactly one post (no 'earlier') */}
      {featured && rest.length === 0 && (
        <section className='rounded-2xl border border-fd-border border-dashed p-8 text-center'>
          <p className='font-medium text-fd-foreground/80 text-sm'>
            More posts are in the pipeline.
          </p>
          <p className='mt-2 text-fd-muted-foreground text-sm'>
            Subscribe via{' '}
            <Link
              href='/rss.xml'
              className='inline-flex items-center gap-1 font-medium text-fd-foreground underline underline-offset-4 hover:no-underline'
            >
              <Rss className='size-3.5' aria-hidden />
              RSS
            </Link>{' '}
            or follow on{' '}
            <a
              href='https://www.linkedin.com/in/rubenortz/'
              target='_blank'
              rel='noopener noreferrer'
              className='font-medium text-fd-foreground underline underline-offset-4 hover:no-underline'
            >
              LinkedIn
            </a>
            .
          </p>
        </section>
      )}

      {/* Truly empty (no posts at all) */}
      {!featured && (
        <section className='rounded-2xl border border-fd-border border-dashed p-12 text-center'>
          <p className='text-fd-muted-foreground'>Nothing here yet. Soon.</p>
        </section>
      )}
    </main>
  )
}

function SectionLabel({ children }: { children: React.ReactNode }): ReactElement {
  return (
    <div className='mb-6 flex items-center gap-3'>
      <span className='font-semibold text-fd-muted-foreground text-xs uppercase tracking-[0.18em]'>
        {children}
      </span>
      <span className='h-px flex-1 bg-fd-border' />
    </div>
  )
}
