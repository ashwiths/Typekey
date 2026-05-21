import { motion } from 'framer-motion'

export default function ProgressBar({ value, max = 100, color = 'peach', className = '', label, animated = true }) {
  const pct = Math.min(100, Math.max(0, (value / max) * 100))

  const gradientMap = {
    peach:  'from-peach-400 to-amber-400',
    green:  'from-emerald-400 to-teal-400',
    amber:  'from-amber-400 to-orange-400',
    purple: 'from-purple-400 to-violet-400',
  }
  const glowMap = {
    peach:  'rgba(212,105,58,0.4)',
    green:  'rgba(16,185,129,0.35)',
    amber:  'rgba(245,158,11,0.4)',
    purple: 'rgba(139,92,246,0.35)',
  }

  const gradient = gradientMap[color] || gradientMap.peach
  const glow = glowMap[color] || glowMap.peach

  return (
    <div className={className}>
      {label && (
        <div className="flex justify-between mb-1.5">
          <span className="text-xs text-gray-500 font-medium">{label}</span>
          <span className="text-xs font-bold text-gray-700">{Math.round(pct)}%</span>
        </div>
      )}
      <div className="h-2.5 bg-gray-100 rounded-full overflow-hidden">
        {animated ? (
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${pct}%` }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className={`h-full rounded-full bg-gradient-to-r ${gradient}`}
            style={{ boxShadow: pct > 0 ? `0 0 8px ${glow}` : 'none' }}
          />
        ) : (
          <div
            className={`h-full rounded-full bg-gradient-to-r ${gradient} transition-all duration-700 ease-out`}
            style={{ width: `${pct}%`, boxShadow: pct > 0 ? `0 0 8px ${glow}` : 'none' }}
          />
        )}
      </div>
    </div>
  )
}
