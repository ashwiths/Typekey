import { useState, useEffect, useRef, useCallback, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FiRefreshCw } from 'react-icons/fi'

// Split text into words array
function splitWords(text) {
  return text.trim().split(' ')
}

export default function TypingArea({ text, onComplete, onStats }) {
  const words = useMemo(() => splitWords(text), [text])

  const [typedWords, setTypedWords] = useState([]) // array of typed word strings
  const [currentInput, setCurrentInput] = useState('')
  const [wordStatuses, setWordStatuses] = useState([]) // 'correct' | 'wrong' | 'pending'
  const [currentWordIndex, setCurrentWordIndex] = useState(0)
  const [isStarted, setIsStarted] = useState(false)
  const [isFinished, setIsFinished] = useState(false)
  const [mistakes, setMistakes] = useState(0)
  const [startTime, setStartTime] = useState(null)
  const [elapsed, setElapsed] = useState(0)
  const [pressedKey, setPressedKey] = useState('')
  const [wrongWord, setWrongWord] = useState(false)

  const inputRef = useRef(null)
  const timerRef = useRef(null)
  const pressedKeyTimeout = useRef(null)

  // Focus on mount
  useEffect(() => {
    inputRef.current?.focus()
  }, [])

  // Timer
  useEffect(() => {
    if (isStarted && !isFinished) {
      timerRef.current = setInterval(() => {
        setElapsed((Date.now() - startTime) / 1000)
      }, 200)
    }
    return () => clearInterval(timerRef.current)
  }, [isStarted, isFinished, startTime])

  // Stats callback
  const calcWpm = useCallback(() => {
    if (!startTime || elapsed < 1) return 0
    const minutes = elapsed / 60
    return Math.round((currentWordIndex / minutes))
  }, [startTime, elapsed, currentWordIndex])

  const calcAccuracy = useCallback(() => {
    const total = typedWords.length
    if (total === 0) return 100
    const correct = wordStatuses.filter((s) => s === 'correct').length
    return Math.round((correct / total) * 100)
  }, [typedWords, wordStatuses])

  // Emit stats every second
  useEffect(() => {
    if (isStarted && !isFinished && onStats) {
      onStats({
        wpm: calcWpm(),
        accuracy: calcAccuracy(),
        mistakes,
        elapsed,
        pressedKey,
        nextKey: words[currentWordIndex]?.[currentInput.length] || '',
      })
    }
  }, [elapsed])

  const formatTime = (s) => {
    const m = Math.floor(s / 60)
    const sec = Math.floor(s % 60)
    return `${String(m).padStart(2, '0')}:${String(sec).padStart(2, '0')}`
  }

  const resetTest = useCallback(() => {
    setTypedWords([])
    setCurrentInput('')
    setWordStatuses([])
    setCurrentWordIndex(0)
    setIsStarted(false)
    setIsFinished(false)
    setMistakes(0)
    setStartTime(null)
    setElapsed(0)
    setWrongWord(false)
    clearInterval(timerRef.current)
    setTimeout(() => inputRef.current?.focus(), 50)
  }, [])

  const finishTest = useCallback(() => {
    clearInterval(timerRef.current)
    setIsFinished(true)
    const finalElapsed = (Date.now() - startTime) / 1000
    const mins = finalElapsed / 60
    const wpm = Math.round(words.length / mins)
    const correct = wordStatuses.filter((s) => s === 'correct').length + 1 // +1 for last word
    const accuracy = Math.round(((correct) / words.length) * 100)

    onComplete?.({ wpm, accuracy, mistakes, time: finalElapsed })
  }, [startTime, words, wordStatuses, mistakes, onComplete])

  const handleInput = useCallback((e) => {
    const val = e.target.value

    if (!isStarted && val.length > 0) {
      setIsStarted(true)
      setStartTime(Date.now())
    }

    const expected = words[currentWordIndex] || ''

    // Space pressed — submit current word
    if (val.endsWith(' ')) {
      const typed = val.trim()

      if (typed !== expected) {
        // Wrong word → reset current test
        setMistakes((m) => m + 1)
        setWrongWord(true)
        setTimeout(() => {
          resetTest()
        }, 600)
        return
      }

      // Correct — advance
      setWordStatuses((prev) => {
        const next = [...prev]
        next[currentWordIndex] = 'correct'
        return next
      })
      setTypedWords((prev) => [...prev, typed])
      const nextIndex = currentWordIndex + 1

      if (nextIndex >= words.length) {
        // Test complete
        finishTest()
      } else {
        setCurrentWordIndex(nextIndex)
        setCurrentInput('')
      }
      return
    }

    // Character-level mistake check:
    // If the typed input doesn't match the prefix of the expected word, it's a mistake!
    if (!expected.startsWith(val)) {
      setMistakes((m) => m + 1)
      setWrongWord(true)
      setCurrentInput(val)
      setTimeout(() => {
        resetTest()
      }, 600)
      return
    }

    setCurrentInput(val)
  }, [isStarted, currentWordIndex, words, resetTest, finishTest])

  // Keyboard pressed key tracking for visualizer
  const handleKeyDown = useCallback((e) => {
    const k = e.key
    setPressedKey(k)
    clearTimeout(pressedKeyTimeout.current)
    pressedKeyTimeout.current = setTimeout(() => setPressedKey(''), 200)
  }, [])

  // Current word char-level rendering
  const renderCurrentWord = () => {
    const expected = words[currentWordIndex] || ''
    return expected.split('').map((ch, i) => {
      let cls = 'char-pending'
      if (i < currentInput.length) {
        cls = currentInput[i] === ch ? 'char-correct' : 'char-wrong'
      } else if (i === currentInput.length) {
        cls = 'char-cursor'
      }
      return (
        <span key={i} className={`inline ${cls}`}>
          {ch}
        </span>
      )
    })
  }

  return (
    <div className="w-full">
      {/* ── Stats Bar ── */}
      <div className="flex flex-wrap items-center gap-4 mb-6">
        {[
          {
            label: 'Speed',
            value: calcWpm(),
            unit: 'WPM',
            color: 'from-peach-500 to-amber-500 bg-clip-text text-transparent',
            border: 'border-peach-100/80 shadow-[0_6px_20px_rgba(212,105,58,0.07)]',
            bg: 'bg-peach-50/20'
          },
          {
            label: 'Accuracy',
            value: calcAccuracy(),
            unit: '%',
            color: 'text-emerald-600',
            border: 'border-emerald-100 shadow-[0_6px_20px_rgba(16,185,129,0.05)]',
            bg: 'bg-emerald-50/10'
          },
          {
            label: 'Mistakes',
            value: mistakes,
            unit: 'errors',
            color: 'text-red-500',
            border: 'border-red-100 shadow-[0_6px_20px_rgba(239,68,68,0.05)]',
            bg: 'bg-red-50/10'
          },
          {
            label: 'Time',
            value: formatTime(elapsed),
            unit: '',
            color: 'text-amber-700',
            border: 'border-amber-100 shadow-[0_6px_20px_rgba(245,158,11,0.05)]',
            bg: 'bg-amber-50/10'
          },
        ].map((s) => (
          <div
            key={s.label}
            className={`flex flex-col items-center bg-white/70 backdrop-blur-md rounded-2xl border ${s.border} ${s.bg} px-6 py-3 min-w-[100px] hover:scale-102 transition-transform duration-200`}
          >
            <div className="flex items-baseline gap-0.5">
              <span className={`text-2xl font-black tracking-tight ${s.color}`}>
                {s.value}
              </span>
              {s.unit && (
                <span className="text-[10px] font-bold text-gray-400 ml-0.5 uppercase tracking-wide">
                  {s.unit}
                </span>
              )}
            </div>
            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-1">
              {s.label}
            </span>
          </div>
        ))}

        {/* Premium Restart Button */}
        <motion.button
          onClick={resetTest}
          whileHover={{ scale: 1.04, y: -1 }}
          whileTap={{ scale: 0.96 }}
          className="ml-auto flex items-center gap-2 text-sm font-bold text-gray-600 hover:text-peach-600 bg-white/80 backdrop-blur-md rounded-2xl px-5 py-3.5 shadow-[0_4px_16px_rgba(0,0,0,0.03)] border border-gray-200/80 hover:border-peach-200 transition-all duration-200 cursor-pointer"
        >
          <FiRefreshCw className="w-4 h-4 animate-spin-hover" /> Restart
        </motion.button>
      </div>

      {/* ── Typing Area ── */}
      <motion.div
        animate={wrongWord ? { x: [-4, 4, -4, 4, 0] } : {}}
        transition={{ duration: 0.3 }}
        className={`relative rounded-4xl border backdrop-blur-3xl p-9 md:p-11 mb-6 transition-all duration-300 cursor-text select-none overflow-hidden
          ${
            wrongWord
              ? 'border-red-300 bg-red-50/20 shadow-[0_20px_50px_rgba(239,68,68,0.1),inset_0_1px_0_rgba(255,255,255,0.4)]'
              : 'border-white/60 bg-white/80 shadow-[0_20px_50px_rgba(212,105,58,0.05),inset_0_1.5px_0_rgba(255,255,255,1)] hover:border-peach-200/60'
          }`}
        onClick={() => inputRef.current?.focus()}
      >
        {/* Decorative dynamic ambient glow inside the panel */}
        <div className="absolute top-0 right-0 w-60 h-60 bg-peach-100/20 rounded-full blur-3xl pointer-events-none -z-10" />
        
        {/* Words display */}
        <div className="text-xl md:text-2xl leading-[1.7] font-medium tracking-wide antialiased select-none font-sans">
          {words.map((word, wi) => {
            if (wi < currentWordIndex) {
              const status = wordStatuses[wi]
              return (
                <span
                  key={wi}
                  className={`inline-block mr-[0.45em] transition-colors duration-150 ${
                    status === 'correct'
                      ? 'text-emerald-500 font-medium'
                      : 'text-red-400 line-through opacity-60'
                  }`}
                >
                  {word}
                </span>
              )
            }
            if (wi === currentWordIndex) {
              return (
                <span key={wi} className="inline-block mr-[0.45em] border-b-2 border-peach-200/40 pb-0.5">
                  {renderCurrentWord()}
                </span>
              )
            }
            return (
              <span key={wi} className="inline-block mr-[0.45em] text-gray-300/80 transition-colors duration-150">
                {word}
              </span>
            )
          })}
        </div>

        {/* Hidden input */}
        <input
          ref={inputRef}
          value={currentInput}
          onChange={handleInput}
          onKeyDown={handleKeyDown}
          disabled={isFinished}
          className="absolute inset-0 w-full h-full opacity-0 cursor-text"
          aria-label="Typing input"
          autoComplete="off"
          autoCorrect="off"
          autoCapitalize="off"
          spellCheck="false"
        />

        {/* Not started hint */}
        {!isStarted && !isFinished && (
          <div className="absolute bottom-4 right-6 flex items-center gap-1.5 text-xs text-gray-400 font-semibold uppercase tracking-wider italic pointer-events-none animate-pulse">
            <span className="w-1.5 h-1.5 rounded-full bg-peach-400" />
            Click & start typing to begin…
          </div>
        )}
      </motion.div>

      {/* ── Wrong word alert message ── */}
      <AnimatePresence>
        {wrongWord && (
          <motion.div
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="text-center text-sm text-red-500 font-bold mb-4 tracking-wide uppercase"
          >
            ✗ Mistake Detected — Automatic Resetting…
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Progress Bar ── */}
      <div className="h-2.5 bg-gray-100/80 rounded-full overflow-hidden shadow-inner relative">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${(currentWordIndex / words.length) * 100}%` }}
          transition={{ duration: 0.35, ease: 'easeOut' }}
          className="h-full bg-gradient-to-r from-peach-400 to-amber-400 rounded-full shadow-[0_0_6px_rgba(212,105,58,0.3)]"
        />
      </div>
      <p className="text-[11px] font-bold text-gray-400 mt-2.5 text-right uppercase tracking-wider">
        <span className="text-gray-700">{currentWordIndex}</span> / {words.length} words completed
      </p>
    </div>
  )
}
