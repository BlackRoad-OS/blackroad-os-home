import FlexSearch from 'flexsearch'

export type SearchDocument = {
  id: string
  title: string
  description: string
  href: string
  category: string
  content: string
}

const documents: SearchDocument[] = [
  {
    id: 'welcome',
    title: 'Welcome to BlackRoad OS Home',
    description: 'Overview, navigation tips, and a link to the active blackroad-os-web handbook portal.',
    href: '/',
    category: 'Home',
    content: 'welcome landing overview home handbook search flexsearch'
  },
  {
    id: 'culture',
    title: 'Culture',
    description: 'Operating principles, behaviors, and rituals for teams.',
    href: '/handbook/culture',
    category: 'Handbook',
    content: 'culture principles rituals feedback cadence ceremonies norms'
  },
  {
    id: 'roles',
    title: 'Roles',
    description: 'Core roles, expectations, and decision rights.',
    href: '/handbook/roles',
    category: 'Handbook',
    content: 'roles responsibilities decision rights competency ladder steward product engineering design'
  },
  {
    id: 'glossary',
    title: 'Glossary',
    description: 'Shared vocabulary and definitions.',
    href: '/handbook/glossary',
    category: 'Handbook',
    content: 'glossary definitions language terms lexicon'
  },
  {
    id: 'decision-flow',
    title: 'Decision Flow',
    description: 'Lightweight steps for proposing, validating, and recording decisions.',
    href: '/governance/decision-flow',
    category: 'Governance',
    content: 'decision rfc adr escalation evaluation consensus snapshot'
  },
  {
    id: 'security-policy',
    title: 'Security Policy',
    description: 'Baselines for data handling, access, and incident response.',
    href: '/governance/security-policy',
    category: 'Governance',
    content: 'security policy access control incident response backups secrets'
  },
  {
    id: 'meeting-agenda',
    title: 'Meeting Agenda Template',
    description: 'Reusable agenda skeleton with timeboxes and outcomes.',
    href: '/templates/meeting-agenda',
    category: 'Templates',
    content: 'agenda template meeting facilitation outcomes prep notes'
  },
  {
    id: 'pr-review',
    title: 'PR Review Template',
    description: 'Checklist for pull request reviews and release notes.',
    href: '/templates/pr-review',
    category: 'Templates',
    content: 'pull request review checklist qa release notes'
  }
]

export function buildSearchIndex(): FlexSearch.Index {
  const index = new FlexSearch.Index({
    tokenize: 'forward',
    preset: 'match',
    cache: true,
    context: true
  })

  documents.forEach((doc) => {
    index.add(doc.id, `${doc.title} ${doc.description} ${doc.content}`)
  })

  return index
}

export function searchDocuments(query: string): SearchDocument[] {
  if (!query.trim()) return []
  const index = buildSearchIndex()
  const ids = index.search(query, { limit: 8 })

  return ids
    .map((resultId) => documents.find((doc) => doc.id === resultId))
    .filter((doc): doc is SearchDocument => Boolean(doc))
}

export function listDocuments(): SearchDocument[] {
  return documents
}
