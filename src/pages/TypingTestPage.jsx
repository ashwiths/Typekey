import { useState, useCallback } from 'react'
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

export default function TypingTestPage() {
  const { id } = useParams()
  const testId = parseInt(id, 10)
  const navigate = useNavigate()
  const { completeTest, isTestLocked } = useProgress()

  const test = TESTS.find((t) => t.id === testId)
  const [liveStats, setLiveStats] = useState({ wpm: 0, accuracy: 100, mistakes: 0, elapsed: 0, pressedKey: '', nextKey: '' })
  const [result, setResult] = useState(null)

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
        <div className="flex items-center justify-center min-h-[60vh] flex-col gap-4 px-6 text-center">
          <div className="text-5xl">🔒</div>
          <p className="text-2xl font-bold text-gray-900">Test Locked</p>
          <p className="text-gray-500">Complete Test {testId - 1} first to unlock this test.</p>
          <Link to={`/test/${testId - 1}`} className="btn-primary flex items-center gap-2">
            Go to Test {testId - 1} <FiArrowRight />
          </Link>
        </div>
      </div>
    )
  }

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

  return (
    <div className="page-wrapper">
      <Navbar />

      <div className="max-w-4xl mx-auto px-6 lg:px-8 pt-24 pb-16">
        {/* Back + Test info */}
        <div className="flex items-center justify-between mb-8">
          <Link to="/tests" className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-900 transition-colors">
            <FiArrowLeft className="w-4 h-4" /> All Tests
          </Link>
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-500">Test {testId} of {TESTS.length}</span>
            <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${DIFFICULTY_COLORS[test.difficulty]}`}>
              {test.difficulty}
            </span>
          </div>
        </div>

        {/* Test header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
            {test.name}
          </h1>
          <p className="text-gray-500">{test.description}</p>
        </motion.div>

        {/* Typing area */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
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
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mt-8"
        >
          <p className="text-xs text-gray-400 font-medium mb-3 uppercase tracking-wider">Keyboard</p>
          <KeyboardVisualizer
            pressedKey={liveStats.pressedKey}
            nextKey={liveStats.nextKey}
          />
        </motion.div>
      </div>

      {/* Completion Modal */}
      <AnimatePresence>
        {result && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/20 backdrop-blur-sm"
            onClick={(e) => e.target === e.currentTarget && setResult(null)}
          >
            <motion.div
              initial={{ scale: 0.85, opacity: 0, y: 40 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: 'spring', damping: 20, stiffness: 200 }}
              className="bg-white rounded-4xl shadow-soft-xl p-10 max-w-md w-full text-center"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: 'spring', stiffness: 250 }}
                className="w-16 h-16 bg-peach-100 rounded-full flex items-center justify-center mx-auto mb-6"
              >
                <MdEmojiEvents className="w-8 h-8 text-peach-600" />
              </motion.div>

              <h2 className="text-2xl font-bold text-gray-900 mb-1">Test Complete! 🎉</h2>
              <p className="text-gray-500 mb-8">{test.name} — Level {testId}</p>

              <div className="grid grid-cols-2 gap-4 mb-8">
                {[
                  { label: 'WPM', value: result.wpm, icon: <BsLightningChargeFill className="w-4 h-4 text-peach-500" /> },
                  { label: 'Accuracy', value: `${result.accuracy}%`, icon: <FiCheckCircle className="w-4 h-4 text-emerald-500" /> },
                  { label: 'Mistakes', value: result.mistakes, icon: '✗' },
                  { label: 'Time', value: formatTime(result.time), icon: '⏱' },
                ].map(({ label, value, icon }) => (
                  <div key={label} className="bg-gray-50 rounded-2xl p-4">
                    <div className="flex items-center gap-1.5 mb-1 justify-center">{icon}
                      <span className="text-xs text-gray-500">{label}</span>
                    </div>
                    <p className="text-2xl font-bold text-gray-900">{value}</p>
                  </div>
                ))}
              </div>

              <div className="flex flex-col gap-3">
                {nextTest && (
                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => { setResult(null); navigate(`/test/${testId + 1}`) }}
                    className="btn-primary w-full flex items-center justify-center gap-2 py-3.5"
                  >
                    Next: {nextTest.name} <FiArrowRight />
                  </motion.button>
                )}
                <button
                  onClick={() => setResult(null)}
                  className="btn-secondary w-full py-3"
                >
                  Try Again
                </button>
                <Link to="/tests">
                  <button className="w-full text-sm text-gray-500 hover:text-gray-700 py-2 transition-colors">
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
