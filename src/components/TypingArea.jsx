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

    setTimeout(() => {
      onComplete?.({ wpm, accuracy, mistakes, time: finalElapsed })
    }, 300)
  }, [startTime, words, wordStatuses, mistakes, onComplete])

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
      {/* Stats bar */}
      <div className="flex flex-wrap gap-3 mb-6">
        {[
          { label: 'WPM', value: calcWpm() },
          { label: 'Accuracy', value: `${calcAccuracy()}%` },
          { label: 'Mistakes', value: mistakes },
          { label: 'Time', value: formatTime(elapsed) },
        ].map(({ label, value }) => (
          <div key={label} className="stat-badge min-w-[80px]">
            <span className="text-xl font-bold text-gray-900">{value}</span>
            <span className="text-xs text-gray-400 mt-0.5">{label}</span>
          </div>
        ))}
        <button
          onClick={resetTest}
          className="ml-auto flex items-center gap-1.5 text-sm text-gray-500 hover:text-peach-600 bg-white rounded-2xl px-4 py-2 shadow-soft border border-gray-100 hover:border-peach-200 transition-all duration-200"
        >
          <FiRefreshCw className="w-4 h-4" /> Restart
        </button>
      </div>

      {/* Typing area */}
      <motion.div
        animate={wrongWord ? { x: [-4, 4, -4, 4, 0] } : {}}
        transition={{ duration: 0.3 }}
        className={`relative bg-white rounded-3xl border-2 shadow-soft-md p-8 mb-6 transition-colors duration-200 cursor-text
          ${wrongWord ? 'border-red-300 bg-red-50' : 'border-gray-100 hover:border-peach-200'}`}
        onClick={() => inputRef.current?.focus()}
      >
        {/* Words display */}
        <div className="text-lg md:text-xl leading-relaxed font-medium tracking-wide select-none">
          {words.map((word, wi) => {
            if (wi < currentWordIndex) {
              const status = wordStatuses[wi]
              return (
                <span key={wi} className={`inline-block mr-[0.4em] ${status === 'correct' ? 'text-emerald-500' : 'text-red-400 line-through'}`}>
                  {word}
                </span>
              )
            }
            if (wi === currentWordIndex) {
              return (
                <span key={wi} className="inline-block mr-[0.4em]">
                  {renderCurrentWord()}
                </span>
              )
            }
            return (
              <span key={wi} className="inline-block mr-[0.4em] text-gray-300">
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
          <p className="absolute bottom-4 right-6 text-xs text-gray-400 italic pointer-events-none">
            Click here and start typing…
          </p>
        )}
      </motion.div>

      {/* Wrong word message */}
      <AnimatePresence>
        {wrongWord && (
          <motion.div
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="text-center text-sm text-red-500 font-medium mb-4"
          >
            ✗ Wrong word — restarting test…
          </motion.div>
        )}
      </AnimatePresence>

      {/* Progress bar */}
      <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
        <div
          className="h-full bg-peach-500 rounded-full transition-all duration-300 ease-out"
          style={{ width: `${(currentWordIndex / words.length) * 100}%` }}
        />
      </div>
      <p className="text-xs text-gray-400 mt-2 text-right">
        {currentWordIndex} / {words.length} words
      </p>
    </div>
  )
}
