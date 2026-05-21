import { useState, useEffect, useCallback, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { BsLightningChargeFill } from 'react-icons/bs'
import { FiTarget } from 'react-icons/fi'
import { HiOutlineClock } from 'react-icons/hi'

const ROWS = [
  [
    { id: 'q', label: 'Q', w: 1 },
    { id: 'w', label: 'W', w: 1 },
    { id: 'e', label: 'E', w: 1 },
    { id: 'r', label: 'R', w: 1 },
    { id: 't', label: 'T', w: 1 },
    { id: 'y', label: 'Y', w: 1 },
    { id: 'u', label: 'U', w: 1 },
    { id: 'i', label: 'I', w: 1 },
    { id: 'o', label: 'O', w: 1 },
    { id: 'p', label: 'P', w: 1 },
  ],
  [
    { id: 'a', label: 'A', w: 1, homeRow: true },
    { id: 's', label: 'S', w: 1, homeRow: true },
    { id: 'd', label: 'D', w: 1, homeRow: true },
    { id: 'f', label: 'F', w: 1, homeRow: true, bump: true },
    { id: 'g', label: 'G', w: 1 },
    { id: 'h', label: 'H', w: 1 },
    { id: 'j', label: 'J', w: 1, homeRow: true, bump: true },
    { id: 'k', label: 'K', w: 1, homeRow: true },
    { id: 'l', label: 'L', w: 1, homeRow: true },
  ],
  [
    { id: 'z', label: 'Z', w: 1 },
    { id: 'x', label: 'X', w: 1 },
    { id: 'c', label: 'C', w: 1 },
    { id: 'v', label: 'V', w: 1 },
    { id: 'b', label: 'B', w: 1 },
    { id: 'n', label: 'N', w: 1 },
    { id: 'm', label: 'M', w: 1 },
  ],
]

const HOME_SEQUENCE = ['a', 's', 'd', 'f', 'j', 'k', 'l']

function normalizeKey(key) {
  if (key === ' ') return ' '
  return key.length === 1 ? key.toLowerCase() : key
}

const UNIT = 44
const KEY_H = 44
const GAP = 5

function Key({ keyData, isPressed, isHomeRow, isNext, isCorrect, isWrong }) {
  const width = keyData.w * UNIT

  // Default state: soft layered shadow for a physical keycap feel
  let style = 'bg-white border-gray-200/70 text-gray-500 shadow-[0_2.5px_0_#c8c8cc,0_6px_14px_rgba(0,0,0,0.04)]'

  if (isPressed) {
    style = 'bg-gradient-to-b from-peach-400 to-peach-500 border-peach-600 text-white shadow-[0_0px_0_#b84f2a,0_4px_20px_rgba(212,105,58,0.5)]'
  } else if (isCorrect) {
    style = 'bg-gradient-to-b from-emerald-50 to-emerald-100 border-emerald-300 text-emerald-600 shadow-[0_2.5px_0_#6ee7b7,0_6px_14px_rgba(16,185,129,0.12)]'
  } else if (isNext) {
    style = 'bg-gradient-to-b from-peach-50 to-peach-100 border-peach-300 text-peach-600 shadow-[0_2.5px_0_#e8a070,0_0_18px_rgba(212,105,58,0.28)]'
  } else if (isHomeRow) {
    style = 'bg-gradient-to-b from-[#fdf9f5] to-[#faf0e6] border-peach-200/80 text-gray-600 shadow-[0_2.5px_0_#ddb890,0_5px_12px_rgba(212,105,58,0.06)]'
  }

  return (
    <motion.div
      whileHover={!isPressed && !isWrong ? {
        y: -2,
        scale: 1.04,
        boxShadow: isHomeRow
          ? '0 10px 20px rgba(212,105,58,0.12), 0 0 0 1px rgba(212,105,58,0.15)'
          : '0 10px 20px rgba(0,0,0,0.06), 0 2.5px 0 #c8c8cc'
      } : {}}
      animate={
        isPressed ? { y: 3, scale: 0.91 }
        : isWrong ? { x: [-4, 4, -3, 3, 0] }
        : { y: 0, scale: 1 }
      }
      transition={
        isWrong
          ? { duration: 0.22 }
          : { type: 'spring', stiffness: 520, damping: 26, mass: 0.75 }
      }
      style={{ width, height: KEY_H, flexShrink: 0 }}
      className={`relative flex items-center justify-center rounded-xl select-none cursor-default border text-[13px] font-semibold transition-colors duration-200 ${style}`}
    >
      <AnimatePresence>
        {isPressed && (
          <motion.span
            initial={{ opacity: 0.6, scale: 0.6 }}
            animate={{ opacity: 0, scale: 1.8 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="absolute inset-0 rounded-xl bg-peach-300 pointer-events-none"
          />
        )}
      </AnimatePresence>

      {keyData.bump && (
        <span className="absolute bottom-[5px] left-1/2 -translate-x-1/2 w-3.5 h-[2px] rounded-full bg-current opacity-40" />
      )}

      <span className="relative z-10 leading-none">{keyData.label}</span>
    </motion.div>
  )
}

export default function InteractiveKeyboard() {
  const [pressedKeys,  setPressedKeys]  = useState(new Set())
  const [wrongKeys,    setWrongKeys]    = useState(new Set())
  const [correctKeys,  setCorrectKeys]  = useState(new Set())
  const [seqIdx,       setSeqIdx]       = useState(0)
  const [completedSet, setCompletedSet] = useState(new Set())
  const [trainingDone, setTrainingDone] = useState(false)
  const [keyCount,     setKeyCount]     = useState(0)
  const [errorCount,   setErrorCount]   = useState(0)
  const [elapsed,      setElapsed]      = useState(0)
  const [started,      setStarted]      = useState(false)
  const startRef = useRef(null)
  const timerRef = useRef(null)

  useEffect(() => {
    if (started) {
      timerRef.current = setInterval(() => setElapsed((Date.now() - startRef.current) / 1000), 500)
    }
    return () => clearInterval(timerRef.current)
  }, [started])

  const wpm = elapsed > 4 ? Math.round((keyCount / 5) / (elapsed / 60)) : 0
  const accuracy = keyCount + errorCount > 0 ? Math.round((keyCount / (keyCount + errorCount)) * 100) : 100
  const mm = String(Math.floor(elapsed / 60)).padStart(2, '0')
  const ss = String(Math.floor(elapsed % 60)).padStart(2, '0')

  const handleKeyDown = useCallback((e) => {
    if (e.ctrlKey || e.metaKey || e.altKey) return
    if (/^F\d+$/.test(e.key)) return
    e.preventDefault()
    const k = normalizeKey(e.key)

    if (!started && e.key.length === 1) { setStarted(true); startRef.current = Date.now() }
    setPressedKeys(prev => new Set([...prev, k]))

    if (!trainingDone && e.key.length === 1) {
      const expected = HOME_SEQUENCE[seqIdx]
      if (e.key.toLowerCase() === expected) {
        setKeyCount(c => c + 1)
        setCorrectKeys(prev => { const n = new Set(prev); n.add(k); return n })
        setCompletedSet(prev => new Set([...prev, seqIdx]))
        const next = seqIdx + 1
        if (next >= HOME_SEQUENCE.length) {
          setTrainingDone(true)
          setTimeout(() => { setCorrectKeys(new Set()); setCompletedSet(new Set()); setSeqIdx(0) }, 1200)
        } else {
          setSeqIdx(next)
        }
      } else {
        setErrorCount(c => c + 1)
        setWrongKeys(prev => new Set([...prev, k]))
        setTimeout(() => setWrongKeys(prev => { const n = new Set(prev); n.delete(k); return n }), 300)
      }
    } else if (e.key.length === 1) {
      setKeyCount(c => c + 1)
    }
  }, [started, trainingDone, seqIdx])

  const handleKeyUp = useCallback((e) => {
    const k = normalizeKey(e.key)
    setPressedKeys(prev => { const n = new Set(prev); n.delete(k); return n })
    setCorrectKeys(prev => { const n = new Set(prev); n.delete(k); return n })
  }, [])

  useEffect(() => {
    if (trainingDone) { const t = setTimeout(() => setTrainingDone(false), 1400); return () => clearTimeout(t) }
  }, [trainingDone])

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown)
    window.addEventListener('keyup', handleKeyUp)
    return () => { window.removeEventListener('keydown', handleKeyDown); window.removeEventListener('keyup', handleKeyUp) }
  }, [handleKeyDown, handleKeyUp])

  const nextKey = !trainingDone ? HOME_SEQUENCE[seqIdx] : null

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.9, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
      className="select-none w-full relative group"
    >
      {/* Premium ambient radial glow strictly behind the card */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-peach-200/40 via-peach-100/10 to-transparent blur-3xl opacity-80 pointer-events-none -z-10 transition-opacity duration-1000 group-hover:opacity-100" />
      
      {/* Floating animation wrapper for the whole card */}
      <motion.div
        animate={{ y: [-3, 3, -3] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
      >
        {/* Layered Glassmorphism Card */}
        <div className="relative bg-white/65 backdrop-blur-3xl border border-white/90 rounded-[2.5rem] shadow-[0_28px_72px_-12px_rgba(212,105,58,0.14),0_8px_24px_-4px_rgba(0,0,0,0.04),inset_0_2px_4px_rgba(255,255,255,0.95),inset_0_-1px_8px_rgba(255,255,255,0.5)] p-7 flex flex-col gap-6 overflow-hidden">
          
          {/* Soft inner glow reflection inside the card */}
          <div className="absolute -top-24 -left-24 w-64 h-64 bg-white/60 rounded-full blur-[60px] pointer-events-none" />

          {/* ── Stats row ── */}
          <div className="relative flex items-center justify-between gap-4 z-10">
            {[
              { icon: <BsLightningChargeFill className="w-4 h-4 text-peach-500" />, val: wpm, lbl: 'WPM' },
              { icon: <FiTarget className="w-4 h-4 text-emerald-500" />, val: `${accuracy}%`, lbl: 'Accuracy' },
              { icon: <HiOutlineClock className="w-4 h-4 text-amber-500" />, val: `${mm}:${ss}`, lbl: 'Time' },
            ].map(({ icon, val, lbl }) => (
              <motion.div 
                key={lbl} 
                whileHover={{ y: -2, scale: 1.02 }}
                transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                className="flex-1 flex flex-col items-center gap-1.5 py-3.5 bg-white/70 backdrop-blur-lg rounded-2xl border border-white shadow-[0_6px_16px_rgba(0,0,0,0.03),inset_0_1px_2px_rgba(255,255,255,1)]"
              >
                {icon}
                <motion.span
                  key={val}
                  initial={{ y: -4, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  className="text-[1.7rem] font-bold text-gray-900 leading-none tabular-nums tracking-tight"
                >
                  {val}
                </motion.span>
                <span className="text-[9.5px] text-gray-400 uppercase tracking-[0.15em] font-bold">{lbl}</span>
              </motion.div>
            ))}
          </div>

          {/* ── Keyboard ── */}
          <div className="relative space-y-[5px] z-10">
            {ROWS.map((row, ri) => (
              <div key={ri} className="flex gap-[5px] justify-center">
                {row.map((keyData) => (
                  <Key
                    key={keyData.id}
                    keyData={keyData}
                    isPressed={pressedKeys.has(keyData.id)}
                    isHomeRow={!!keyData.homeRow && !pressedKeys.has(keyData.id) && !correctKeys.has(keyData.id)}
                    isNext={!!nextKey && keyData.id === nextKey && !pressedKeys.has(keyData.id) && !correctKeys.has(keyData.id)}
                    isCorrect={correctKeys.has(keyData.id)}
                    isWrong={wrongKeys.has(keyData.id)}
                  />
                ))}
              </div>
            ))}

            {/* Spacebar */}
            <div className="flex justify-center pt-1.5">
              <motion.div
                whileHover={!pressedKeys.has(' ') ? { y: -1.5, scale: 1.02, boxShadow: '0 8px 16px rgba(0,0,0,0.04)' } : {}}
                animate={pressedKeys.has(' ') ? { y: 2.5, scale: 0.95, boxShadow: 'inset 0 4px 10px rgba(0,0,0,0.15)' } : { y: 0, scale: 1 }}
                transition={{ type: 'spring', stiffness: 500, damping: 25, mass: 0.8 }}
                className={`h-[42px] rounded-xl border text-[12px] font-bold tracking-wide flex items-center justify-center transition-colors duration-200 ${
                  pressedKeys.has(' ')
                    ? 'bg-gradient-to-b from-peach-400 to-peach-500 border-peach-600 text-white shadow-[0_0_16px_rgba(212,105,58,0.45)]'
                    : 'bg-white border-gray-200/60 text-gray-400 shadow-[0_2px_0_#d4d4d8,0_6px_12px_rgba(0,0,0,0.02)]'
                }`}
                style={{ width: UNIT * 5 + GAP * 4 }}
              >
                SPACE
              </motion.div>
            </div>
          </div>

          {/* ── Sequence hint ── */}
          <div className="relative flex flex-col items-center gap-3 pt-3 z-10">
            <div className="flex items-center gap-1.5">
              {HOME_SEQUENCE.map((k, i) => {
                const done = completedSet.has(i)
                const cur = i === seqIdx && !trainingDone
                return (
                  <motion.span
                    key={k}
                    animate={cur ? { scale: [1, 1.15, 1], rotate: [0, 3, -3, 0] } : {}}
                    transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
                    className={`w-[30px] h-[30px] rounded-[10px] flex items-center justify-center text-[11px] font-bold border transition-all duration-300 ${
                      done  ? 'bg-gradient-to-br from-emerald-50 to-emerald-100 border-emerald-300 text-emerald-600 shadow-[0_2px_8px_rgba(16,185,129,0.15)]'
                      : cur ? 'bg-gradient-to-br from-peach-50 to-peach-100 border-peach-300 text-peach-600 shadow-[0_4px_12px_rgba(212,105,58,0.3)]'
                      :       'bg-gray-50/60 border-gray-200/60 text-gray-400'
                    }`}
                  >
                    {k.toUpperCase()}
                  </motion.span>
                )
              })}
            </div>
            <AnimatePresence mode="wait">
              <motion.p 
                key={trainingDone ? 'done' : seqIdx}
                initial={{ opacity: 0, y: 3 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -3 }}
                transition={{ duration: 0.3 }}
                className="text-[11.5px] text-gray-400 font-semibold tracking-wide"
              >
                {trainingDone ? '✓ Sequence complete! Free typing unlocked' : `Press ${HOME_SEQUENCE[seqIdx]?.toUpperCase()} to continue`}
              </motion.p>
            </AnimatePresence>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}
