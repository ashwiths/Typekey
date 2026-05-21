import { motion } from 'framer-motion'

export default function StatsCard({ label, value, unit, icon, color = 'peach', delay = 0 }) {
  const colorMap = {
    peach: 'bg-peach-50 text-peach-600',
    green: 'bg-emerald-50 text-emerald-600',
    amber: 'bg-amber-50 text-amber-600',
    purple: 'bg-purple-50 text-purple-600',
    red: 'bg-red-50 text-red-500',
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay }}
      className="bg-white rounded-3xl p-6 shadow-soft border border-gray-100"
    >
      <div className={`w-11 h-11 rounded-2xl flex items-center justify-center mb-4 ${colorMap[color]}`}>
        {icon}
      </div>
      <p className="text-3xl font-bold text-gray-900 mb-1">
        {value}
        {unit && <span className="text-lg font-medium text-gray-400 ml-1">{unit}</span>}
      </p>
      <p className="text-sm text-gray-500">{label}</p>
    </motion.div>
  )
}
