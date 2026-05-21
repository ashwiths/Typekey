import { useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

// Exact layouts and precise key multipliers for a perfect matching keyboard layout
const KEYBOARD_ROWS = [
  [
    { key: '`', label: '`', w: 1 }, { key: '1', label: '1', w: 1 }, { key: '2', label: '2', w: 1 },
    { key: '3', label: '3', w: 1 }, { key: '4', label: '4', w: 1 }, { key: '5', label: '5', w: 1 },
    { key: '6', label: '6', w: 1 }, { key: '7', label: '7', w: 1 }, { key: '8', label: '8', w: 1 },
    { key: '9', label: '9', w: 1 }, { key: '0', label: '0', w: 1 }, { key: '-', label: '-', w: 1 },
    { key: '=', label: '=', w: 1 }, { key: 'Backspace', label: '⌫', w: 1.8 }
  ],
  [
    { key: 'Tab', label: 'Tab', w: 1.4 }, { key: 'q', label: 'Q', w: 1 }, { key: 'w', label: 'W', w: 1 },
    { key: 'e', label: 'E', w: 1 }, { key: 'r', label: 'R', w: 1 }, { key: 't', label: 'T', w: 1 },
    { key: 'y', label: 'Y', w: 1 }, { key: 'u', label: 'U', w: 1 }, { key: 'i', label: 'I', w: 1 },
    { key: 'o', label: 'O', w: 1 }, { key: 'p', label: 'P', w: 1 }, { key: '[', label: '[', w: 1 },
    { key: ']', label: ']', w: 1 }, { key: '\\', label: '\\', w: 1.4 }
  ],
  [
    { key: 'CapsLock', label: 'Caps', w: 1.7 }, { key: 'a', label: 'A', w: 1, home: true }, { key: 's', label: 'S', w: 1, home: true },
    { key: 'd', label: 'D', w: 1, home: true }, { key: 'f', label: 'F', w: 1, home: true, bump: true }, { key: 'g', label: 'G', w: 1 },
    { key: 'h', label: 'H', w: 1 }, { key: 'j', label: 'J', w: 1, home: true, bump: true }, { key: 'k', label: 'K', w: 1, home: true },
    { key: 'l', label: 'L', w: 1, home: true }, { key: ';', label: ';', w: 1, home: true }, { key: "'", label: "'", w: 1 },
    { key: 'Enter', label: 'Enter ↵', w: 2.1 }
  ],
  [
    { key: 'Shift', label: 'Shift', w: 2.15 }, { key: 'z', label: 'Z', w: 1 }, { key: 'x', label: 'X', w: 1 },
    { key: 'c', label: 'C', w: 1 }, { key: 'v', label: 'V', w: 1 }, { key: 'b', label: 'B', w: 1 },
    { key: 'n', label: 'N', w: 1 }, { key: 'm', label: 'M', w: 1 }, { key: ',', label: ',', w: 1 },
    { key: '.', label: '.', w: 1 }, { key: '/', label: '/', w: 1 }, { key: 'ShiftR', label: 'Shift', w: 2.25 }
  ],
  [
    { key: 'Ctrl', label: 'Ctrl', w: 1.35 }, { key: 'Win', label: '⊞', w: 1 }, { key: 'Alt', label: 'Alt', w: 1.25 },
    { key: ' ', label: 'Space', w: 6.45, isSpace: true },
    { key: 'AltR', label: 'Alt', w: 1.25 }, { key: 'WinR', label: '⊞', w: 1 }, { key: 'CtrlR', label: 'Ctrl', w: 1.35 }
  ]
]

const KEY_UNIT = 44
const KEY_H = 40

export default function KeyboardVisualizer({ pressedKey = '', nextKey = '' }) {
  const normalizedNext = useMemo(() => {
    if (!nextKey) return ''
    if (nextKey === ' ') return ' '
    return nextKey.toLowerCase()
  }, [nextKey])

  const normalizedPressed = useMemo(() => {
    if (!pressedKey) return ''
    if (pressedKey === ' ') return ' '
    // Standardize shifts / backspaces
    const pk = pressedKey.toLowerCase()
    if (pk === 'shift') return 'shift'
    if (pk === 'backspace') return 'backspace'
    if (pk === 'enter') return 'enter'
    return pk
  }, [pressedKey])

  const getKeyStyles = (keyItem) => {
    const k = keyItem.key.toLowerCase()
    const isPressed = k === normalizedPressed || (keyItem.key === 'ShiftR' && normalizedPressed === 'shift')
    const isNext = k === normalizedNext || (keyItem.isSpace && normalizedNext === ' ')

    if (isPressed) {
      return {
        cls: 'bg-gradient-to-b from-peach-400 to-peach-500 border-peach-600 text-white shadow-[0_0px_0_#c2410c,0_4px_16px_rgba(212,105,58,0.45)]',
        isPressed: true,
        isNext: false
      }
    }
    if (isNext) {
      return {
        cls: 'bg-gradient-to-b from-peach-50 to-peach-100 border-peach-300 text-peach-700 shadow-[0_2.5px_0_#ea580c,0_0_14px_rgba(212,105,58,0.22)]',
        isPressed: false,
        isNext: true
      }
    }
    if (keyItem.home) {
      return {
        cls: 'bg-gradient-to-b from-gray-50 to-gray-100/50 border-gray-200 text-gray-700 shadow-[0_2.5px_0_#d1d5db,0_4px_10px_rgba(0,0,0,0.02)]',
        isPressed: false,
        isNext: false
      }
    }
    return {
      cls: 'bg-white border-gray-200/90 text-gray-500 shadow-[0_2.5px_0_#e5e7eb,0_4px_8px_rgba(0,0,0,0.015)]',
      isPressed: false,
      isNext: false
    }
  }

  return (
    <div className="w-full overflow-x-auto scrollbar-hide py-1">
      <div className="min-w-[680px] max-w-[760px] mx-auto bg-gradient-to-b from-white/90 to-gray-50/50 backdrop-blur-2xl rounded-4xl border border-gray-100/80 shadow-[0_12px_45px_rgba(0,0,0,0.04),inset_0_1.5px_0_rgba(255,255,255,1)] p-5 space-y-[4.5px]">
        
        {KEYBOARD_ROWS.map((row, rowIdx) => (
          <div key={rowIdx} className="flex gap-[4.5px] justify-center">
            {row.map((item) => {
              const { cls, isPressed, isNext } = getKeyStyles(item)
              const width = item.w * KEY_UNIT

              return (
                <motion.div
                  key={item.key}
                  animate={
                    isPressed
                      ? { y: 2.5, scale: 0.95 }
                      : isNext
                      ? { y: [0, -1.5, 0], transition: { repeat: Infinity, duration: 1.6, ease: 'easeInOut' } }
                      : { y: 0, scale: 1 }
                  }
                  transition={{ type: 'spring', stiffness: 500, damping: 24 }}
                  style={{ width, height: KEY_H }}
                  className={`relative flex items-center justify-center rounded-xl border select-none cursor-default text-[13px] font-bold transition-colors duration-150 ${cls}`}
                >
                  <span className="leading-none">{item.label}</span>

                  {/* F and J Home Row bumps */}
                  {item.bump && (
                    <span className="absolute bottom-[7px] left-1/2 -translate-x-1/2 w-3.5 h-[2px] rounded-full bg-current opacity-40" />
                  )}

                  {/* Pressed ring burst effect */}
                  <AnimatePresence>
                    {isPressed && (
                      <motion.span
                        initial={{ opacity: 0.5, scale: 0.7 }}
                        animate={{ opacity: 0, scale: 1.6 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.35 }}
                        className="absolute inset-0 rounded-xl bg-peach-300/40 pointer-events-none"
                      />
                    )}
                  </AnimatePresence>
                </motion.div>
              )
            })}
          </div>
        ))}

        {/* Premium Legend */}
        <div className="flex gap-6 justify-center pt-2.5 border-t border-gray-100/50 mt-0.5">
          <div className="flex items-center gap-2">
            <span className="w-5 h-5 rounded-lg bg-gradient-to-b from-peach-400 to-peach-500 border border-peach-600 shadow-sm flex items-center justify-center text-[10px] text-white font-bold">↵</span>
            <span className="text-[11px] font-bold text-gray-500 uppercase tracking-wider">Pressed key</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-5 h-5 rounded-lg bg-gradient-to-b from-peach-50 to-peach-100 border border-peach-300 shadow-sm flex items-center justify-center text-[10px] text-peach-600 font-bold">⇄</span>
            <span className="text-[11px] font-bold text-gray-500 uppercase tracking-wider">Next Key Hint</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-5 h-5 rounded-lg bg-gray-50 border border-gray-200 shadow-xs flex items-center justify-center text-[10px] text-gray-400 font-bold">•</span>
            <span className="text-[11px] font-bold text-gray-500 uppercase tracking-wider">Home row</span>
          </div>
        </div>

      </div>
    </div>
  )
}
