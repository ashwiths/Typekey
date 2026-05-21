import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { MdKeyboard } from 'react-icons/md'
import { BsLightningChargeFill } from 'react-icons/bs'
import { FiArrowRight, FiTarget, FiZap, FiTrendingUp, FiGrid } from 'react-icons/fi'
import { HiOutlineClock } from 'react-icons/hi'

// Animated WPM counter in hero
function LiveStatsCard() {
  const [wpm, setWpm] = useState(28)
  const [accuracy, setAccuracy] = useState(94)
  const [time, setTime] = useState(15)

  useEffect(() => {
    const interval = setInterval(() => {
      setWpm((w) => Math.min(100, w + Math.floor(Math.random() * 3)))
      setAccuracy((a) => Math.min(99, a + (Math.random() > 0.5 ? 1 : 0)))
      setTime((t) => Math.max(0, t - 1))
    }, 1200)
    return () => clearInterval(interval)
  }, [])

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ delay: 0.4, duration: 0.7, ease: 'easeOut' }}
      className="absolute top-0 left-0 right-0 bg-white/80 backdrop-blur-md rounded-3xl shadow-soft-lg border border-white/80 px-5 py-4"
    >
      <div className="flex justify-around">
        {[
          { icon: BsLightningChargeFill, label: 'WPM', value: wpm, color: 'text-peach-500' },
          { icon: FiTarget, label: 'Accuracy', value: `${accuracy}%`, color: 'text-emerald-500' },
          { icon: HiOutlineClock, label: 'Time', value: `00:${String(time).padStart(2, '0')}`, color: 'text-amber-500' },
        ].map(({ icon: Icon, label, value, color }) => (
          <div key={label} className="flex flex-col items-center gap-1">
            <Icon className={`w-4 h-4 ${color}`} />
            <motion.span
              key={value}
              initial={{ y: -4, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              className="text-2xl font-bold text-gray-900"
            >
              {value}
            </motion.span>
            <span className="text-xs text-gray-400">{label}</span>
          </div>
        ))}
      </div>
    </motion.div>
  )
}

// Keyboard illustration SVG
function KeyboardIllustration() {
  const homeRowKeys = ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L', ';']
  const topRowKeys = ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P']
  const bottomRowKeys = ['Z', 'X', 'C', 'V', 'B', 'N', 'M', ',', '.', '/']
  const highlighted = ['A', 'S', 'D', 'F', 'J', 'K', 'L', ';']

  return (
    <div className="bg-white rounded-3xl shadow-soft-lg border border-gray-100 p-5 space-y-1.5">
      {[topRowKeys, homeRowKeys, bottomRowKeys].map((row, ri) => (
        <div key={ri} className="flex gap-1 justify-center">
          {row.map((k) => {
            const isHL = highlighted.includes(k)
            return (
              <div
                key={k}
                className={`w-9 h-9 rounded-lg flex items-center justify-center text-xs font-semibold border transition-all
                  ${isHL
                    ? 'bg-peach-100 border-peach-300 text-peach-700 shadow-sm'
                    : 'bg-gray-50 border-gray-200 text-gray-500'
                  }`}
              >
                {k}
              </div>
            )
          })}
        </div>
      ))}
      <div className="flex justify-center mt-1">
        <div className="w-56 h-9 rounded-lg bg-gray-50 border border-gray-200 flex items-center justify-center text-xs text-gray-400">
          Space
        </div>
      </div>
    </div>
  )
}

export default function HeroSection() {
  const navigate = useNavigate()

  return (
    <section className="relative min-h-screen flex items-center pt-20 pb-16 overflow-hidden">
      {/* Soft background blobs */}
      <div className="absolute top-20 right-0 w-96 h-96 bg-peach-100/40 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-20 left-0 w-80 h-80 bg-amber-100/30 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left: Text */}
          <div>
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 bg-peach-50 border border-peach-200 rounded-full px-4 py-1.5 mb-8"
            >
              <BsLightningChargeFill className="w-3.5 h-3.5 text-peach-500" />
              <span className="text-sm text-peach-700 font-medium">Improve Your Typing Skills</span>
            </motion.div>

            {/* Heading */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight mb-6"
            >
              Type{' '}
              <span className="text-peach-500">Better.</span>
              <br />
              <span className="text-peach-500">Faster.</span>{' '}
              Smarter.
            </motion.h1>

            {/* Subheading */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-lg text-gray-500 leading-relaxed mb-10 max-w-md"
            >
              Take our 15 progressive typing tests and improve your speed, accuracy and keyboard confidence step by step.
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-wrap gap-4 mb-10"
            >
              <motion.button
                onClick={() => navigate('/test/1')}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="btn-primary flex items-center gap-2 text-base px-8 py-3.5"
              >
                Start Your First Test <FiArrowRight className="w-4 h-4" />
              </motion.button>
              <motion.button
                onClick={() => navigate('/tests')}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="btn-secondary flex items-center gap-2 text-base px-8 py-3.5"
              >
                View All Tests <FiGrid className="w-4 h-4" />
              </motion.button>
            </motion.div>

            {/* Social proof */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="flex items-center gap-3"
            >
              <div className="flex -space-x-2">
                {['#f4a261', '#e76f51', '#457b9d', '#2a9d8f'].map((color, i) => (
                  <div
                    key={i}
                    className="w-8 h-8 rounded-full border-2 border-white flex items-center justify-center text-xs text-white font-bold"
                    style={{ backgroundColor: color }}
                  >
                    {['A', 'R', 'S', 'T'][i]}
                  </div>
                ))}
              </div>
              <p className="text-sm text-gray-500">
                Join <span className="font-semibold text-gray-700">10,000+</span> learners improving their typing skills
              </p>
            </motion.div>
          </div>

          {/* Right: Keyboard + Stats card */}
          <div className="relative hidden lg:block">
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.3, ease: 'easeOut' }}
              className="relative mt-16"
            >
              <LiveStatsCard />
              <div className="mt-20">
                <KeyboardIllustration />
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
