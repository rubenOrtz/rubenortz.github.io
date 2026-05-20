import type { Metadata } from 'next'
import Link from 'next/link'
import type { ReactElement } from 'react'
import { createMetadata } from '@/lib/metadata'
import { postsSource } from '@/lib/source'

export const metadata: Metadata = createMetadata({
  title: 'Posts',
  description: 'Long-form posts on Flutter at scale, leadership, and AI.',
})

export default function PostsIndexPage(): ReactElement {
  const pages = postsSource.getPages()

  const sorted = [...pages].sort((a, b) => {
    const da = a.data.date ? new Date(a.data.date).getTime() : 0
    const db = b.data.date ? new Date(b.data.date).getTime() : 0
    return db - da
  })

  return (
    <main className='mx-auto flex w-full max-w-3xl flex-col px-4 py-16'>
      <h1 className='font-semibold text-2xl md:text-3xl'>Posts</h1>
      <p className='mt-1 text-fd-muted-foreground'>
        Long-form posts on Flutter at scale, engineering leadership, and
        AI-assisted development.
      </p>

      <ul className='mt-8 flex flex-col gap-6'>
        {sorted.map((page) => (
          <li key={page.url}>
            <Link
              className='block rounded-lg border border-border bg-fd-accent/30 p-5 transition-colors hover:bg-fd-accent'
              href={page.url}
            >
              <h2 className='font-medium text-lg'>{page.data.title}</h2>
              {page.data.date ? (
                <p className='mt-1 text-fd-muted-foreground text-xs'>
                  {new Date(page.data.date).toISOString().slice(0, 10)}
                </p>
              ) : null}
              {page.data.description ? (
                <p className='mt-2 text-fd-muted-foreground text-sm'>
                  {page.data.description}
                </p>
              ) : null}
            </Link>
          </li>
        ))}
      </ul>
    </main>
  )
}
