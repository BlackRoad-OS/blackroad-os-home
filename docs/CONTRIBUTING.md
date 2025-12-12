# Contributing to BlackRoad OS Home (Archived)

## Adding Handbook Pages

1. Contribute active changes in the canonical [`blackroad-os-web`](https://github.com/BlackRoad-OS/blackroad-os-web) repository. This archive remains for reference only.
2. Create a new `.mdx` file under `pages/` with front-matter:
   ```mdx
   ---
   title: Your Page Title
   description: One-line summary
   ---
   ```
3. Keep pages under 120 lines and use concise section headings.
4. Update the relevant `_meta.json` to surface the page in navigation.
5. Run `pnpm lint` to catch formatting issues.

## Content Conventions

- Prefer short paragraphs and bulleted checklists for runbooks.
- Use `<!-- TODO(home-next): ... -->` markers for deferred features.
- Reference related governance or templates using relative links.

## Build Hooks

- `pnpm build` triggers TOC generation (`scripts/generate-toc.ts`) and writes a build signature (`lib/sig.ts`).
- If you add new directories under `pages/`, ensure the generator includes them.

## Reviewing

Pull requests should include a summary of changes, test commands run, and any screenshots for UI changes.
