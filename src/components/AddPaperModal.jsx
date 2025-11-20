import { useState } from 'react'

export default function AddPaperModal({ open, onClose, onCreated }) {
  const [form, setForm] = useState({
    title: '',
    subject: '',
    board: '',
    level: '',
    year: new Date().getFullYear(),
    paper_url: '',
    marking_scheme_url: '',
    description: '',
    tags: ''
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const update = (k, v) => setForm((f) => ({ ...f, [k]: v }))

  const submit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      const baseUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'
      const payload = {
        ...form,
        year: Number(form.year),
        tags: form.tags
          .split(',')
          .map((t) => t.trim())
          .filter(Boolean),
        marking_scheme_url: form.marking_scheme_url || undefined,
        description: form.description || undefined
      }
      const res = await fetch(`${baseUrl}/api/papers`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      })
      if (!res.ok) throw new Error('Failed to create')
      await res.json()
      onCreated()
      onClose()
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  if (!open) return null

  return (
    <div className="fixed inset-0 z-30 flex items-center justify-center bg-black/60 p-4">
      <div className="bg-slate-900 border border-slate-700 rounded-xl w-full max-w-2xl">
        <div className="p-4 border-b border-slate-700 flex items-center justify-between">
          <h3 className="text-white font-semibold">Add Paper</h3>
          <button onClick={onClose} className="text-blue-200/70 hover:text-white">Close</button>
        </div>
        <form onSubmit={submit} className="p-4 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="col-span-1 md:col-span-2">
            <label className="block text-sm text-blue-200/80 mb-1">Title</label>
            <input value={form.title} onChange={(e)=>update('title', e.target.value)} required className="w-full bg-slate-800 text-blue-100 border border-slate-700 rounded-lg px-3 py-2" />
          </div>
          <div>
            <label className="block text-sm text-blue-200/80 mb-1">Subject</label>
            <input value={form.subject} onChange={(e)=>update('subject', e.target.value)} required className="w-full bg-slate-800 text-blue-100 border border-slate-700 rounded-lg px-3 py-2" />
          </div>
          <div>
            <label className="block text-sm text-blue-200/80 mb-1">Board</label>
            <input value={form.board} onChange={(e)=>update('board', e.target.value)} required className="w-full bg-slate-800 text-blue-100 border border-slate-700 rounded-lg px-3 py-2" />
          </div>
          <div>
            <label className="block text-sm text-blue-200/80 mb-1">Level</label>
            <input value={form.level} onChange={(e)=>update('level', e.target.value)} required className="w-full bg-slate-800 text-blue-100 border border-slate-700 rounded-lg px-3 py-2" />
          </div>
          <div>
            <label className="block text-sm text-blue-200/80 mb-1">Year</label>
            <input type="number" value={form.year} onChange={(e)=>update('year', e.target.value)} required className="w-full bg-slate-800 text-blue-100 border border-slate-700 rounded-lg px-3 py-2" />
          </div>
          <div className="col-span-1 md:col-span-2">
            <label className="block text-sm text-blue-200/80 mb-1">Paper URL (PDF)</label>
            <input value={form.paper_url} onChange={(e)=>update('paper_url', e.target.value)} required className="w-full bg-slate-800 text-blue-100 border border-slate-700 rounded-lg px-3 py-2" />
          </div>
          <div className="col-span-1 md:col-span-2">
            <label className="block text-sm text-blue-200/80 mb-1">Marking Scheme URL (PDF)</label>
            <input value={form.marking_scheme_url} onChange={(e)=>update('marking_scheme_url', e.target.value)} className="w-full bg-slate-800 text-blue-100 border border-slate-700 rounded-lg px-3 py-2" />
          </div>
          <div className="col-span-1 md:col-span-2">
            <label className="block text-sm text-blue-200/80 mb-1">Tags (comma separated)</label>
            <input value={form.tags} onChange={(e)=>update('tags', e.target.value)} className="w-full bg-slate-800 text-blue-100 border border-slate-700 rounded-lg px-3 py-2" />
          </div>
          <div className="col-span-1 md:col-span-2">
            <label className="block text-sm text-blue-200/80 mb-1">Description</label>
            <textarea value={form.description} onChange={(e)=>update('description', e.target.value)} rows={3} className="w-full bg-slate-800 text-blue-100 border border-slate-700 rounded-lg px-3 py-2" />
          </div>
          {error && <p className="col-span-2 text-red-400 text-sm">{error}</p>}
          <div className="col-span-2 flex justify-end gap-3">
            <button type="button" onClick={onClose} className="px-4 py-2 rounded-lg border border-slate-700 text-blue-100">Cancel</button>
            <button disabled={loading} className="px-4 py-2 rounded-lg bg-blue-600 disabled:opacity-60 text-white">{loading ? 'Saving...' : 'Save Paper'}</button>
          </div>
        </form>
      </div>
    </div>
  )
}
