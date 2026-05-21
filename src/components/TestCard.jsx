import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { DIFFICULTY_COLORS } from '../data/tests'
import { FiLock, FiCheckCircle, FiArrowRight } from 'react-icons/fi'
import { BsLightningChargeFill } from 'react-icons/bs'

export default function TestCard({ test, isLocked, isCompleted, result, index }) {
  const iconColorMap = {
    peach: 'bg-peach-100 text-peach-600',
    green: 'bg-emerald-100 text-emerald-600',
    purple: 'bg-purple-100 text-purple-600',
    orange: 'bg-orange-100 text-orange-600',
    warm: 'bg-amber-100 text-amber-700',
  }
  const iconBg = iconColorMap[test.color] || iconColorMap.peach

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      className={`relative bg-white rounded-3xl shadow-soft border transition-all duration-300 overflow-hidden group
        ${isLocked ? 'opacity-60 border-gray-100' : 'border-gray-100 hover:shadow-soft-md hover:-translate-y-1'}
        ${isCompleted ? 'border-emerald-100' : ''}
      `}
    >
      {/* Completed ribbon */}
      {isCompleted && (
        <div className="absolute top-0 right-0 bg-emerald-500 text-white text-[10px] font-semibold px-3 py-1 rounded-bl-2xl rounded-tr-3xl flex items-center gap-1">
          <FiCheckCircle className="w-3 h-3" /> Done
        </div>
      )}

      {/* Locked overlay */}
      {isLocked && (
        <div className="absolute inset-0 backdrop-blur-[1px] bg-white/40 z-10 flex items-center justify-center rounded-3xl">
          <div className="flex flex-col items-center gap-1.5">
            <div className="w-10 h-10 rounded-2xl bg-gray-100 flex items-center justify-center">
              <FiLock className="w-5 h-5 text-gray-400" />
            </div>
            <p className="text-xs text-gray-400 font-medium">Complete previous test</p>
          </div>
        </div>
      )}

      <div className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className={`w-11 h-11 rounded-2xl flex items-center justify-center text-lg font-bold ${iconBg}`}>
              {typeof test.icon === 'string' && test.icon.length <= 2 && !test.icon.match(/^\p{Emoji}/u)
                ? test.icon
                : <span className="text-xl">{test.icon}</span>
              }
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-semibold text-gray-400">#{test.id}</span>
                <span className={`text-[10px] font-semibold px-2.5 py-0.5 rounded-full ${DIFFICULTY_COLORS[test.difficulty]}`}>
                  {test.difficulty}
                </span>
              </div>
              <h3 className="font-semibold text-gray-900 text-base leading-tight mt-0.5">{test.name}</h3>
            </div>
          </div>
        </div>

        <p className="text-sm text-gray-500 leading-relaxed mb-5">{test.description}</p>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3 text-xs text-gray-400">
            <span className="flex items-center gap-1">
              <BsLightningChargeFill className="w-3 h-3 text-peach-400" />
              {test.estimatedTime}
            </span>
            {result && (
              <span className="text-emerald-600 font-semibold">{result.wpm} WPM</span>
            )}
          </div>

          {!isLocked && (
            <Link to={`/test/${test.id}`}>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`flex items-center gap-1.5 text-sm font-semibold px-4 py-2 rounded-xl transition-all duration-200
                  ${isCompleted
                    ? 'bg-emerald-50 text-emerald-600 hover:bg-emerald-100'
                    : 'bg-peach-500 text-white hover:bg-peach-600 shadow-peach'
                  }`}
              >
                {isCompleted ? 'Retry' : 'Start'}
                <FiArrowRight className="w-3.5 h-3.5" />
              </motion.button>
            </Link>
          )}
        </div>
      </div>
    </motion.div>
  )
}
