import { useEffect, useMemo, useState } from 'react'
import Header from './components/Header'
import Filters from './components/Filters'
import PaperCard from './components/PaperCard'
import AddPaperModal from './components/AddPaperModal'

function App() {
  const [query, setQuery] = useState('')
  const [filters, setFilters] = useState({ subject: undefined, board: undefined, level: undefined, year: undefined })
  const [options, setOptions] = useState({ subjects: [], boards: [], levels: [], years: [] })
  const [papers, setPapers] = useState([])
  const [open, setOpen] = useState(false)
  const baseUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

  const fetchFilters = async () => {
    try {
      const res = await fetch(`${baseUrl}/api/papers/filters`)
      const data = await res.json()
      setOptions(data)
    } catch (e) {
      // ignore for now
    }
  }

  const fetchPapers = async () => {
    const params = new URLSearchParams()
    if (filters.subject) params.set('subject', filters.subject)
    if (filters.board) params.set('board', filters.board)
    if (filters.level) params.set('level', filters.level)
    if (filters.year) params.set('year', String(filters.year))
    if (query) params.set('q', query)
    const url = `${baseUrl}/api/papers?${params.toString()}`
    const res = await fetch(url)
    const data = await res.json()
    setPapers(data)
  }

  useEffect(() => {
    fetchFilters()
  }, [])

  useEffect(() => {
    const t = setTimeout(() => {
      fetchPapers()
    }, 250)
    return () => clearTimeout(t)
  }, [query, filters])

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-blue-100">
      <Header query={query} setQuery={setQuery} onAdd={() => setOpen(true)} />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Filters filters={filters} setFilters={setFilters} options={options} />

        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {papers.map((p) => (
            <PaperCard key={p.id} paper={p} />
          ))}
        </div>

        {papers.length === 0 && (
          <div className="mt-10 text-center text-blue-200/70">No papers yet. Try adjusting filters or add one.</div>
        )}
      </main>

      <AddPaperModal open={open} onClose={() => setOpen(false)} onCreated={fetchPapers} />
    </div>
  )
}

export default App
