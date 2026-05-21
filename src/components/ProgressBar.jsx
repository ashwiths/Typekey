export default function ProgressBar({ value, max = 100, color = 'peach', className = '', label }) {
  const pct = Math.min(100, Math.max(0, (value / max) * 100))
  const colorMap = {
    peach: 'bg-peach-500',
    green: 'bg-emerald-500',
    amber: 'bg-amber-500',
    purple: 'bg-purple-500',
  }

  return (
    <div className={className}>
      {label && (
        <div className="flex justify-between mb-1.5">
          <span className="text-xs text-gray-500 font-medium">{label}</span>
          <span className="text-xs font-semibold text-gray-700">{Math.round(pct)}%</span>
        </div>
      )}
      <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
        <div
          className={`h-full rounded-full transition-all duration-700 ease-out ${colorMap[color] || colorMap.peach}`}
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  )
}
