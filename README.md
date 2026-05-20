# rubenortiz.tech

Personal blog and technical docs by Rubén Ortiz Martín, deployed at
[rubenortiz.tech](https://rubenortiz.tech). Repo is `rubenOrtz/rubenortz.github.io`
on GitHub for historical reasons (it bootstrapped as a `<user>.github.io` user
page before the custom domain was registered).

## What this is

The public source-of-truth for Rubén's long-form technical writing —
Flutter at scale, engineering leadership, refactors with numbers, and
AI-assisted development. LinkedIn and X posts link back here; the
private `rubenOrtz/linkedin-brand` repo holds the voice / pillars / NDA
rules and the `/linkedin-post` skill used to draft the teasers.

## Stack

- [Fumadocs](https://fumadocs.dev) starter ([techwithanirudh/fumadocs-starter](https://github.com/techwithanirudh/fumadocs-starter))
- Next.js 16 (App Router) with `output: 'export'` for static site generation
- MDX content under `content/`
- Tailwind v4 styling
- GitHub Pages hosting, deployed via GitHub Actions (`.github/workflows/deploy.yml`)
- Bun for installs and build

## Local dev

```bash
bun install
bun dev          # http://localhost:3000
bun run build    # produces ./out (static site)
```

A `.env` file with `OPENAI_API_KEY="sk-stub-not-used-static-export"` is
required for the upstream `t3-env` validation to pass; the AI features
were removed for static export, so any `sk-*` placeholder works.

## Adding a post

1. Create `content/posts/<slug>.mdx`:

   ```mdx
   ---
   title: "Your title"
   date: 2026-05-20
   description: "One-line summary that shows on the listing and in OpenGraph tags."
   ---

   Body in MDX.
   ```

2. Add the slug to `content/posts/meta.json` (controls ordering in the
   sidebar; the listing page sorts by `date` desc independently).
3. Commit on `main`, push — the Actions workflow rebuilds and deploys.

## Adding a docs page

Create `content/docs/<path>/<slug>.mdx` following the same frontmatter
shape (`title`, `description`, optional `date`). Docs pages render with
the full fumadocs notebook layout (TOC, code blocks, hover cards).

## Custom domain

Configured as `rubenortiz.tech` via `public/CNAME` (apex, one line, no
protocol). Next.js copies `public/` straight into the build output, so
GitHub Pages picks it up on every deploy.

DNS records (configured at the domain registrar, not in this repo):

```
A     @      185.199.108.153
A     @      185.199.109.153
A     @      185.199.110.153
A     @      185.199.111.153
CNAME www    rubenortz.github.io.
```

GitHub Pages auto-issues a TLS cert via Let's Encrypt once DNS resolves.
Enable "Enforce HTTPS" under repo Settings → Pages after the cert is
provisioned (usually within 10-30 minutes of DNS propagation).

## What got stripped from the upstream template

To make `output: 'export'` work with GitHub Pages, the following starter
features were removed (all server-only or static-export incompatible):

- `src/app/api/` (AI chat, OpenAPI proxy, server search)
- `src/proxy.ts` middleware (rewrites — incompatible with `output: 'export'`)
- `src/app/og/[...slug]/` dynamic OG image generation
- `src/app/llms.txt`, `llms-full.txt`, `llms.mdx/[[...slug]]` (file/dir name
  collision during static export)
- `src/components/fumadocs/ai/` AI search panel (depended on /api/chat)

The OpenAPI try-it-out widget on `/docs/api-reference` still renders but
its "try" button has no proxy to call. Restoring it would require a
client-side direct-fetch shim or moving back to a server-rendered host.

## Credit

Started from [techwithanirudh/fumadocs-starter](https://github.com/techwithanirudh/fumadocs-starter).

## Related repos

- [`rubenOrtz/linkedin-brand`](https://github.com/rubenOrtz/linkedin-brand) — private; brand voice, NDA rules, `/linkedin-post` skill.
