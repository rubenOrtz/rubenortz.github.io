import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import type { ReactElement } from 'react'
import { createMetadata } from '@/lib/metadata'
import { postsSource } from '@/lib/source'
import { getMDXComponents } from '@/mdx-components'

export const revalidate = false
export const dynamicParams = false

export default async function PostPage(
  props: PageProps<'/posts/[slug]'>
): Promise<ReactElement> {
  const { slug } = await props.params
  const page = postsSource.getPage([slug])

  if (!page) {
    return notFound()
  }

  const { body: Mdx } = await page.data.load()

  return (
    <main className='mx-auto flex w-full max-w-3xl flex-col px-4 py-16'>
      <Link className='text-fd-muted-foreground text-sm hover:underline' href='/posts'>
        ← All posts
      </Link>
      <h1 className='mt-4 font-semibold text-3xl md:text-4xl'>{page.data.title}</h1>
      {page.data.date ? (
        <p className='mt-2 text-fd-muted-foreground text-sm'>
          {new Date(page.data.date).toISOString().slice(0, 10)}
        </p>
      ) : null}
      {page.data.description ? (
        <p className='mt-2 text-fd-muted-foreground text-lg'>
          {page.data.description}
        </p>
      ) : null}
      <article className='prose mt-8 text-fd-foreground/90'>
        <Mdx components={getMDXComponents({})} />
      </article>
    </main>
  )
}

export async function generateMetadata(
  props: PageProps<'/posts/[slug]'>
): Promise<Metadata> {
  const { slug } = await props.params
  const page = postsSource.getPage([slug])
  if (!page) {
    return createMetadata({ title: 'Not Found' })
  }

  return createMetadata({
    title: page.data.title,
    description: page.data.description,
    openGraph: {
      url: page.url,
    },
  })
}

export function generateStaticParams() {
  return postsSource.getPages().map((page) => ({
    slug: page.slugs[0] ?? '',
  }))
}
