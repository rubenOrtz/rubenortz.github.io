import { HomeLayout } from 'fumadocs-ui/layouts/home'
import { baseOptions, linkItems } from '@/lib/layout.shared'

export default function Layout({ children }: LayoutProps<'/'>) {
  const base = baseOptions()

  return (
    <HomeLayout
      {...base}
      links={linkItems}
      style={
        {
          '--spacing-fd-container': '1300px',
        } as object
      }
    >
      {children}
      <Footer />
    </HomeLayout>
  )
}

function Footer() {
  return (
    <footer className='mt-auto border-t bg-fd-card p-4 text-fd-secondary-foreground'>
      <div className='flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between'>
        <div>
          <p className='mb-1 font-semibold text-sm'>Rubén Ortiz</p>
          <p className='text-xs'>
            Senior Software Engineer · Flutter at Scale · Notes from the trenches.
          </p>
        </div>
        <div className='text-xs sm:text-right'>
          <p>© 2026 Rubén Ortiz Martín</p>
          <p>
            Site built with{' '}
            <a
              className='underline hover:text-fd-foreground'
              href='https://github.com/techwithanirudh/fumadocs-starter'
              rel='noopener noreferrer'
              target='_blank'
            >
              fumadocs-starter
            </a>
            .
          </p>
        </div>
      </div>
    </footer>
  )
}
