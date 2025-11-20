export default function Filters({ filters, setFilters, options }) {
  const update = (key, value) => setFilters((f) => ({ ...f, [key]: value }))

  const Select = ({ label, value, onChange, items }) => (
    <div className="flex flex-col gap-1">
      <span className="text-sm text-blue-200/70">{label}</span>
      <select
        value={value || ''}
        onChange={(e) => onChange(e.target.value || undefined)}
        className="bg-slate-800/80 text-blue-100 border border-slate-700/60 rounded-lg px-3 py-2 outline-none focus:ring-2 ring-blue-400/40"
      >
        <option value="">All</option>
        {items.map((i) => (
          <option key={i} value={i}>
            {i}
          </option>
        ))}
      </select>
    </div>
  )

  return (
    <div className="bg-slate-800/40 border border-slate-700/50 rounded-xl p-4 grid grid-cols-2 md:grid-cols-4 gap-4">
      <Select label="Subject" value={filters.subject} onChange={(v) => update('subject', v)} items={options.subjects} />
      <Select label="Board" value={filters.board} onChange={(v) => update('board', v)} items={options.boards} />
      <Select label="Level" value={filters.level} onChange={(v) => update('level', v)} items={options.levels} />
      <Select label="Year" value={filters.year} onChange={(v) => update('year', v ? Number(v) : undefined)} items={options.years} />
    </div>
  )
}
