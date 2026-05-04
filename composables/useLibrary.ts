import { ref, computed, onMounted } from 'vue'

export interface Publication {
  id: string
  title: string
  authors: string
  desc: string
  category: 'Journal' | 'Research' | 'Digest' | 'Guidelines'
  date: string
  size: string
  pages: number
  readCount: number
  contentUrl: string
  thumbnail?: string
}

const publications = ref<Publication[]>([
  { 
    id: 'PUB-001',
    title: 'Cytopathology National Journal v4', 
    authors: 'Dr. A. Bello, Prof. M. Smith',
    desc: 'Case studies on cellular variance in West African pathology diagnostic modules.', 
    category: 'Journal', 
    date: 'Mar 2026', 
    size: '4.2 MB',
    pages: 124,
    readCount: 1200,
    contentUrl: '#'
  },
  { 
    id: 'PUB-002',
    title: 'Lab Safety Protocol 2026', 
    authors: 'Scientific Registry Board',
    desc: 'Revised national standards for safety in cellular science laboratories.', 
    category: 'Guidelines', 
    date: 'Feb 2026', 
    size: '1.8 MB',
    pages: 45,
    readCount: 3500,
    contentUrl: '#'
  },
  { 
    id: 'PUB-003',
    title: 'Annual Scientific Digest', 
    authors: 'Conference Committee 2025',
    desc: 'A collection of the most significant research papers from last years congress.', 
    category: 'Digest', 
    date: 'Jan 2026', 
    size: '8.4 MB',
    pages: 312,
    readCount: 850,
    contentUrl: '#'
  },
  { 
    id: 'PUB-004',
    title: 'Histology Research Paper', 
    authors: 'Dr. Jane Doe, Dr. Sarah Johnson',
    desc: 'Advancements in molecular markers for early detection techniques.', 
    category: 'Research', 
    date: 'Dec 2025', 
    size: '2.1 MB',
    pages: 18,
    readCount: 620,
    contentUrl: '#'
  },
  { 
    id: 'PUB-005',
    title: 'Cellular Morphology Irregularities', 
    authors: 'Prof. Adebayo',
    desc: 'Analyzing microscopic variations in urban vs rural patient samples.', 
    category: 'Research', 
    date: 'Nov 2025', 
    size: '3.5 MB',
    pages: 32,
    readCount: 410,
    contentUrl: '#'
  }
])

const recentReads = ref<Publication[]>([])

export const useLibrary = () => {
  
  const loadRecentReads = () => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('recent_reads')
      if (stored) {
        const ids = JSON.parse(stored)
        recentReads.value = ids.map((id: string) => publications.value.find(p => p.id === id)).filter(Boolean)
      }
    }
  }

  const trackRead = (pub: Publication) => {
    if (!recentReads.value.find(p => p.id === pub.id)) {
      recentReads.value.unshift(pub)
      if (recentReads.value.length > 5) recentReads.value.pop()
      
      if (typeof window !== 'undefined') {
        localStorage.setItem('recent_reads', JSON.stringify(recentReads.value.map(p => p.id)))
      }
    }
  }

  onMounted(() => {
    loadRecentReads()
  })

  return {
    publications,
    recentReads,
    trackRead,
    loadRecentReads
  }
}
