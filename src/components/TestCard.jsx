import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { DIFFICULTY_COLORS } from '../data/tests'
import { FiLock, FiCheckCircle, FiArrowRight, FiClock } from 'react-icons/fi'
import { BsLightningChargeFill } from 'react-icons/bs'

// Richer difficulty badge colours
const DIFF_BADGE = {
  Beginner:     'bg-emerald-50 text-emerald-700 border border-emerald-200',
  Easy:         'bg-sky-50 text-sky-700 border border-sky-200',
  Medium:       'bg-amber-50 text-amber-700 border border-amber-200',
  Hard:         'bg-orange-50 text-orange-700 border border-orange-200',
  Expert:       'bg-red-50 text-red-700 border border-red-200',
}

const ICON_BG = {
  peach:  'bg-gradient-to-br from-peach-100 to-peach-200 text-peach-700',
  green:  'bg-gradient-to-br from-emerald-100 to-emerald-200 text-emerald-700',
  purple: 'bg-gradient-to-br from-purple-100 to-purple-200 text-purple-700',
  orange: 'bg-gradient-to-br from-orange-100 to-orange-200 text-orange-700',
  warm:   'bg-gradient-to-br from-amber-100 to-amber-200 text-amber-700',
}

export default function TestCard({ test, isLocked, isCompleted, result, index }) {
  const iconBg = ICON_BG[test.color] || ICON_BG.peach

  const cardBase = `
    relative bg-white rounded-3xl border overflow-hidden
    transition-all duration-300 group
  `
  const cardState = isLocked
    ? 'border-gray-100/80 shadow-[0_2px_12px_rgba(0,0,0,0.03)]'
    : isCompleted
    ? 'border-emerald-100 shadow-[0_4px_20px_rgba(16,185,129,0.06)] hover:-translate-y-2 hover:shadow-[0_16px_40px_rgba(16,185,129,0.12),0_4px_12px_rgba(0,0,0,0.04)] cursor-pointer'
    : 'border-gray-100 shadow-[0_4px_20px_rgba(0,0,0,0.04)] hover:-translate-y-2 hover:shadow-[0_16px_40px_rgba(212,105,58,0.1),0_4px_12px_rgba(0,0,0,0.04)] hover:border-peach-100 cursor-pointer'

  const CardContent = () => (
    <>
      {/* Top accent bar */}
      <div className={`absolute top-0 left-0 right-0 h-[3px] rounded-t-3xl transition-opacity duration-300 ${
        isCompleted
          ? 'bg-gradient-to-r from-emerald-400 to-teal-400 opacity-100'
          : isLocked
          ? 'bg-gray-200 opacity-50'
          : 'bg-gradient-to-r from-peach-400 to-amber-400 opacity-0 group-hover:opacity-100'
      }`} />

      {/* Subtle hover glow */}
      {!isLocked && (
        <div className={`absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none ${
          isCompleted
            ? 'bg-[radial-gradient(ellipse_at_top_right,rgba(16,185,129,0.04)_0%,transparent_70%)]'
            : 'bg-[radial-gradient(ellipse_at_top_right,rgba(212,105,58,0.04)_0%,transparent_70%)]'
        }`} />
      )}

      {/* ── Completed ribbon ── */}
      {isCompleted && (
        <div className="absolute top-3.5 right-3.5 bg-gradient-to-br from-emerald-500 to-teal-500 text-white text-[10px] font-bold px-2.5 py-1 rounded-full flex items-center gap-1 shadow-sm z-20">
          <FiCheckCircle className="w-3 h-3" /> Done
        </div>
      )}

      {/* ── Locked overlay ── */}
      {isLocked && (
        <div className="absolute inset-0 backdrop-blur-[2px] bg-white/50 z-10 flex items-center justify-center rounded-3xl">
          <div className="flex flex-col items-center gap-2">
            <div className="w-11 h-11 rounded-2xl bg-white border border-gray-200 shadow-sm flex items-center justify-center">
              <FiLock className="w-4.5 h-4.5 text-gray-400" />
            </div>
            <p className="text-[11px] text-gray-500 font-semibold bg-white/80 px-3 py-1 rounded-full border border-gray-100">
              Complete previous test
            </p>
          </div>
        </div>
      )}

      <div className="p-6">
        {/* ── Icon + meta row ── */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3.5">
            <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-xl shadow-sm flex-shrink-0 ${iconBg}`}>
              <span>{test.icon}</span>
            </div>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-[11px] font-bold text-gray-400 tracking-wide">#{test.id}</span>
                <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full ${DIFF_BADGE[test.difficulty] || 'bg-gray-100 text-gray-600 border border-gray-200'}`}>
                  {test.difficulty}
                </span>
              </div>
              <h3 className="font-bold text-gray-900 text-[15px] leading-tight group-hover:text-peach-600 transition-colors duration-200">
                {test.name}
              </h3>
            </div>
          </div>
        </div>

        {/* ── Description ── */}
        <p className="text-sm text-gray-500 leading-relaxed mb-5 line-clamp-2">{test.description}</p>

        {/* ── Footer row ── */}
        <div className="flex items-center justify-between pt-4 border-t border-gray-100/80">
          <div className="flex items-center gap-3 text-xs text-gray-400">
            <span className="flex items-center gap-1.5">
              <FiClock className="w-3.5 h-3.5" />
              <span className="font-medium">{test.estimatedTime}</span>
            </span>
            {result && (
              <span className="flex items-center gap-1 text-emerald-600 font-bold bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                <BsLightningChargeFill className="w-2.5 h-2.5" />
                {result.wpm} WPM
              </span>
            )}
          </div>

          {!isLocked && (
            <motion.div
              whileHover={{ scale: 1.06, x: 1 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: 'spring', stiffness: 500, damping: 25 }}
              className={`flex items-center gap-1.5 text-[13px] font-bold px-4 py-2 rounded-xl transition-all duration-200 ${
                isCompleted
                  ? 'bg-emerald-50 text-emerald-600 border border-emerald-200 hover:bg-emerald-100'
                  : 'bg-gradient-to-b from-peach-400 to-peach-500 text-white border border-peach-500 shadow-[0_4px_12px_rgba(212,105,58,0.3)]'
              }`}
            >
              {isCompleted ? 'Retry' : 'Start'} <FiArrowRight className="w-3.5 h-3.5" />
            </motion.div>
          )}
        </div>
      </div>
    </>
  )

  if (isLocked) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.45, delay: index * 0.05, ease: [0.16, 1, 0.3, 1] }}
        className={`${cardBase} ${cardState}`}
      >
        <CardContent />
      </motion.div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.45, delay: index * 0.05, ease: [0.16, 1, 0.3, 1] }}
      className="h-full"
    >
      <Link to={`/test/${test.id}`} className="block h-full">
        <div className={`${cardBase} ${cardState} h-full`}>
          <CardContent />
        </div>
      </Link>
    </motion.div>
  )
}
