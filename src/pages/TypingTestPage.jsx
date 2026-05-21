import { useState, useCallback, useEffect } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import Navbar from '../components/Navbar'
import TypingArea from '../components/TypingArea'
import KeyboardVisualizer from '../components/KeyboardVisualizer'
import { TESTS, DIFFICULTY_COLORS } from '../data/tests'
import { useProgress } from '../hooks/useProgress'
import { FiArrowLeft, FiArrowRight, FiCheckCircle } from 'react-icons/fi'
import { BsLightningChargeFill } from 'react-icons/bs'
import { MdEmojiEvents } from 'react-icons/md'

// Simple CSS confetti burst using DOM
function fireConfetti() {
  const colors = ['#d4693a', '#eeaf86', '#f5d0b5', '#2a9d8f', '#e9c46a', '#264653']
  for (let i = 0; i < 60; i++) {
    const el = document.createElement('div')
    el.style.cssText = `
      position:fixed;
      top:50%;left:50%;
      width:${6 + Math.random() * 6}px;
      height:${6 + Math.random() * 6}px;
      border-radius:${Math.random() > 0.5 ? '50%' : '2px'};
      background:${colors[Math.floor(Math.random() * colors.length)]};
      pointer-events:none;
      z-index:9999;
      transform:translate(-50%,-50%);
      animation:none;
    `
    document.body.appendChild(el)
    const angle = Math.random() * 2 * Math.PI
    const dist = 80 + Math.random() * 200
    const tx = Math.cos(angle) * dist
    const ty = Math.sin(angle) * dist - 100
    el.animate([
      { transform: 'translate(-50%,-50%) scale(1)', opacity: 1 },
      { transform: `translate(calc(-50% + ${tx}px), calc(-50% + ${ty}px)) scale(0)`, opacity: 0 }
    ], { duration: 800 + Math.random() * 600, easing: 'cubic-bezier(0,0,0.2,1)', fill: 'forwards' })
    setTimeout(() => el.remove(), 1500)
  }
}

const DIFF_BADGES = {
  Beginner: 'bg-emerald-50 text-emerald-700 border border-emerald-200/80',
  Easy: 'bg-sky-50 text-sky-700 border border-sky-200/80',
  Medium: 'bg-amber-50 text-amber-700 border border-amber-200/80',
  Hard: 'bg-orange-50 text-orange-700 border border-orange-200/80',
  Expert: 'bg-red-50 text-red-700 border border-red-200/80',
}

export default function TypingTestPage() {
  const { id } = useParams()
  const testId = parseInt(id, 10)
  const navigate = useNavigate()
  const { completeTest, isTestLocked } = useProgress()

  const test = TESTS.find((t) => t.id === testId)
  const [liveStats, setLiveStats] = useState({ wpm: 0, accuracy: 100, mistakes: 0, elapsed: 0, pressedKey: '', nextKey: '' })
  const [result, setResult] = useState(null)

  // Reset page state whenever the level ID changes to ensure clean navigation
  useEffect(() => {
    setResult(null)
    setLiveStats({ wpm: 0, accuracy: 100, mistakes: 0, elapsed: 0, pressedKey: '', nextKey: '' })
  }, [testId])

  const handleComplete = useCallback((res) => {
    setResult(res)
    completeTest(testId, res)
    fireConfetti()
  }, [testId, completeTest])

  const handleStats = useCallback((stats) => {
    setLiveStats(stats)
  }, [])

  const nextTest = TESTS.find((t) => t.id === testId + 1)

  const formatTime = (s) => {
    const m = Math.floor(s / 60)
    const sec = Math.floor(s % 60)
    return `${m}m ${sec}s`
  }

  if (!test) {
    return (
      <div className="page-wrapper">
        <Navbar />
        <div className="flex items-center justify-center min-h-[60vh] flex-col gap-4">
          <p className="text-2xl font-bold text-gray-900">Test not found</p>
          <Link to="/tests" className="btn-primary">Back to Tests</Link>
        </div>
      </div>
    )
  }

  if (isTestLocked(testId)) {
    return (
      <div className="page-wrapper">
        <Navbar />
        <div className="flex items-center justify-center min-h-[65vh] flex-col gap-5 px-6 text-center">
          <div className="text-6xl animate-bounce">🔒</div>
          <p className="text-2xl font-bold text-gray-900 tracking-tight">Test Locked</p>
          <p className="text-gray-500 max-w-sm">Complete Test {testId - 1} first to unlock this practice session.</p>
          <Link to={`/test/${testId - 1}`} className="btn-primary flex items-center gap-2 px-8 py-3.5 shadow-[0_10px_25px_rgba(212,105,58,0.25)]">
            Go to Test {testId - 1} <FiArrowRight />
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="page-wrapper relative overflow-hidden">
      <Navbar />

      {/* ── Background Ambient Blobs ── */}
      <div className="fixed top-0 right-0 w-[550px] h-[450px] bg-peach-100/25 rounded-full blur-[130px] pointer-events-none -z-10" />
      <div className="fixed bottom-0 left-0 w-[450px] h-[350px] bg-amber-50/30 rounded-full blur-[110px] pointer-events-none -z-10" />

      <div className="max-w-4xl mx-auto px-6 lg:px-8 pt-20 pb-12">
        {/* Back + Test info */}
        <div className="flex items-center justify-between mb-4">
          <Link to="/tests" className="group flex items-center gap-1.5 text-[13px] font-bold text-gray-400 hover:text-peach-600 transition-colors uppercase tracking-wider">
            <FiArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" /> Back to path
          </Link>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">Level {testId} of {TESTS.length}</span>
            <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider ${DIFF_BADGES[test.difficulty] || 'bg-gray-100 text-gray-600'}`}>
              {test.difficulty}
            </span>
          </div>
        </div>

        {/* Test header */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-5"
        >
          <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight mb-1">
            {test.name}
          </h1>
          <p className="text-gray-500 text-sm leading-relaxed">{test.description}</p>
        </motion.div>

        {/* Typing area */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.08, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <TypingArea
            key={testId}
            text={test.text}
            onComplete={handleComplete}
            onStats={handleStats}
          />
        </motion.div>

        {/* Keyboard visualizer */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.16, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="mt-6"
        >
          <div className="flex items-center gap-1.5 mb-2.5">
            <span className="w-1.5 h-1.5 rounded-full bg-peach-500 animate-pulse" />
            <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Active Visualizer</p>
          </div>
          <KeyboardVisualizer
            pressedKey={liveStats.pressedKey}
            nextKey={liveStats.nextKey}
          />
        </motion.div>
      </div>

      {/* ── Completion Modal ── */}
      <AnimatePresence>
        {result && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.16, ease: 'easeOut' }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/25 backdrop-blur-md"
            onClick={(e) => e.target === e.currentTarget && setResult(null)}
          >
            <motion.div
              initial={{ scale: 0.92, opacity: 0, y: 15 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.94, opacity: 0 }}
              transition={{ type: 'spring', damping: 22, stiffness: 320 }}
              className="bg-white/80 backdrop-blur-3xl rounded-4xl shadow-[0_25px_60px_rgba(0,0,0,0.18),inset_0_1.5px_0_rgba(255,255,255,1)] p-8 md:p-10 max-w-md w-full text-center border border-white relative overflow-hidden"
            >
              {/* Modal decorative glow */}
              <div className="absolute -top-12 -right-12 w-32 h-32 bg-peach-100/40 rounded-full blur-2xl pointer-events-none" />

              <motion.div
                initial={{ scale: 0, rotate: -15 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ delay: 0.04, type: 'spring', stiffness: 300 }}
                className="w-16 h-16 bg-gradient-to-br from-peach-100 to-amber-100 rounded-2xl flex items-center justify-center mx-auto mb-5 shadow-soft border border-peach-200/50"
              >
                <MdEmojiEvents className="w-9 h-9 text-peach-600" />
              </motion.div>

              <h2 className="text-2xl font-black text-gray-900 tracking-tight mb-0.5">Test Complete! 🎉</h2>
              <p className="text-sm font-semibold text-peach-600 mb-6">{test.name} — Level {testId}</p>

              {/* Dynamic Stats Grid */}
              <div className="grid grid-cols-2 gap-3 mb-6">
                {[
                  {
                    label: 'Speed',
                    value: result.wpm,
                    unit: 'WPM',
                    icon: <BsLightningChargeFill className="w-3.5 h-3.5 text-peach-500" />,
                    bg: 'bg-peach-50/20 border-peach-100/50',
                    color: 'text-peach-600'
                  },
                  {
                    label: 'Accuracy',
                    value: `${result.accuracy}%`,
                    unit: '',
                    icon: <FiCheckCircle className="w-3.5 h-3.5 text-emerald-500" />,
                    bg: 'bg-emerald-50/20 border-emerald-100/50',
                    color: 'text-emerald-600'
                  },
                  {
                    label: 'Mistakes',
                    value: result.mistakes,
                    unit: 'errors',
                    icon: <span className="text-red-500 font-bold text-xs">✗</span>,
                    bg: 'bg-red-50/20 border-red-100/50',
                    color: 'text-red-600'
                  },
                  {
                    label: 'Time Taken',
                    value: formatTime(result.time),
                    unit: '',
                    icon: <span className="text-amber-600 text-xs">⏱</span>,
                    bg: 'bg-amber-50/20 border-amber-100/50',
                    color: 'text-amber-700'
                  },
                ].map((stat) => (
                  <div key={stat.label} className={`border rounded-2xl p-4 text-center ${stat.bg} backdrop-blur-md`}>
                    <div className="flex items-center gap-1.5 mb-1 justify-center">
                      {stat.icon}
                      <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">{stat.label}</span>
                    </div>
                    <p className={`text-xl font-black ${stat.color}`}>{stat.value}</p>
                  </div>
                ))}
              </div>

              {/* Action buttons */}
              <div className="flex flex-col gap-2.5">
                {nextTest && (
                  <motion.button
                    whileHover={{ scale: 1.03, y: -0.5 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => { setResult(null); navigate(`/test/${testId + 1}`) }}
                    className="btn-primary w-full flex items-center justify-center gap-2 py-3.5 shadow-[0_6px_20px_rgba(212,105,58,0.25)]"
                  >
                    Next: {nextTest.name} <FiArrowRight />
                  </motion.button>
                )}
                <button
                  onClick={() => setResult(null)}
                  className="btn-secondary w-full py-3.5"
                >
                  Try Again
                </button>
                <Link to="/tests">
                  <button className="w-full text-xs font-bold text-gray-400 hover:text-gray-600 py-1.5 uppercase tracking-wider transition-colors mt-1">
                    Back to All Tests
                  </button>
                </Link>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
