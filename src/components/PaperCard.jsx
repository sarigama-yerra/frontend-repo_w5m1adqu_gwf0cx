import { FileText, ExternalLink, FileCheck2 } from 'lucide-react'

export default function PaperCard({ paper }) {
  return (
    <div className="group bg-slate-800/40 border border-slate-700/50 rounded-xl p-4 hover:border-blue-500/40 transition-colors">
      <div className="flex items-start gap-3">
        <div className="p-2 rounded-lg bg-blue-500/20 border border-blue-400/30">
          <FileText className="w-5 h-5 text-blue-300" />
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="text-white font-medium truncate" title={paper.title}>{paper.title}</h3>
          <p className="text-sm text-blue-200/70 truncate">
            {paper.subject} • {paper.board} • {paper.level} • {paper.year}
          </p>
          {paper.tags?.length ? (
            <div className="mt-2 flex flex-wrap gap-2">
              {paper.tags.map((t) => (
                <span key={t} className="text-xs px-2 py-1 rounded bg-slate-700/60 text-blue-200/80">{t}</span>
              ))}
            </div>
          ) : null}
        </div>
      </div>

      <div className="mt-4 flex items-center gap-3">
        <a
          href={paper.paper_url}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md bg-blue-500/90 hover:bg-blue-600 text-white text-sm"
        >
          <ExternalLink className="w-4 h-4" /> View Paper
        </a>
        {paper.marking_scheme_url ? (
          <a
            href={paper.marking_scheme_url}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md bg-emerald-500/90 hover:bg-emerald-600 text-white text-sm"
          >
            <FileCheck2 className="w-4 h-4" /> Marking Scheme
          </a>
        ) : null}
      </div>
    </div>
  )
}
