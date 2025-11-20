import { BookOpen, Search, Plus, GraduationCap } from 'lucide-react'

export default function Header({ query, setQuery, onAdd }) {
  return (
    <header className="sticky top-0 z-20 backdrop-blur supports-[backdrop-filter]:bg-slate-900/60 bg-slate-900/80 border-b border-slate-700/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center gap-4">
        <div className="flex items-center gap-3 text-white">
          <div className="p-2 rounded-xl bg-blue-500/20 border border-blue-400/30">
            <GraduationCap className="w-6 h-6 text-blue-300" />
          </div>
          <div>
            <h1 className="text-xl font-semibold leading-tight">Past Papers Explorer</h1>
            <p className="text-xs text-blue-200/70">Find and study previous exam papers</p>
          </div>
        </div>

        <div className="flex-1" />

        <div className="relative w-full max-w-md">
          <Search className="w-4 h-4 text-blue-200/70 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search papers, subjects, tags..."
            className="w-full bg-slate-800/80 text-blue-100 placeholder:text-blue-300/50 border border-slate-700/60 rounded-lg pl-10 pr-3 py-2 outline-none focus:ring-2 ring-blue-400/40"
          />
        </div>

        <button
          onClick={onAdd}
          className="inline-flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white font-medium px-3 py-2 rounded-lg transition-colors"
        >
          <Plus className="w-4 h-4" />
          Add Paper
        </button>
      </div>
    </header>
  )
}
