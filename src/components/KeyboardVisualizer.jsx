import { useMemo } from 'react'

const KEYBOARD_ROWS = [
  [
    { key: '`', label: '`' }, { key: '1', label: '1' }, { key: '2', label: '2' },
    { key: '3', label: '3' }, { key: '4', label: '4' }, { key: '5', label: '5' },
    { key: '6', label: '6' }, { key: '7', label: '7' }, { key: '8', label: '8' },
    { key: '9', label: '9' }, { key: '0', label: '0' }, { key: '-', label: '-' },
    { key: '=', label: '=' }, { key: 'Backspace', label: '⌫', wide: true },
  ],
  [
    { key: 'Tab', label: 'Tab', wide: true }, { key: 'q', label: 'Q' }, { key: 'w', label: 'W' },
    { key: 'e', label: 'E' }, { key: 'r', label: 'R' }, { key: 't', label: 'T' },
    { key: 'y', label: 'Y' }, { key: 'u', label: 'U' }, { key: 'i', label: 'I' },
    { key: 'o', label: 'O' }, { key: 'p', label: 'P' }, { key: '[', label: '[' },
    { key: ']', label: ']' }, { key: '\\', label: '\\' },
  ],
  [
    { key: 'CapsLock', label: 'Caps', wide: true }, { key: 'a', label: 'A' }, { key: 's', label: 'S' },
    { key: 'd', label: 'D' }, { key: 'f', label: 'F' }, { key: 'g', label: 'G' },
    { key: 'h', label: 'H' }, { key: 'j', label: 'J' }, { key: 'k', label: 'K' },
    { key: 'l', label: 'L' }, { key: ';', label: ';' }, { key: "'", label: "'" },
    { key: 'Enter', label: 'Enter', wide: true },
  ],
  [
    { key: 'Shift', label: 'Shift', wide: true }, { key: 'z', label: 'Z' }, { key: 'x', label: 'X' },
    { key: 'c', label: 'C' }, { key: 'v', label: 'V' }, { key: 'b', label: 'B' },
    { key: 'n', label: 'N' }, { key: 'm', label: 'M' }, { key: ',', label: ',' },
    { key: '.', label: '.' }, { key: '/', label: '/' }, { key: 'ShiftR', label: 'Shift', wide: true },
  ],
  [
    { key: 'Ctrl', label: 'Ctrl', wide: true }, { key: 'Win', label: '⊞' },
    { key: 'Alt', label: 'Alt', wide: true },
    { key: ' ', label: 'Space', extraWide: true },
    { key: 'AltR', label: 'Alt', wide: true }, { key: 'WinR', label: '⊞' },
    { key: 'CtrlR', label: 'Ctrl', wide: true },
  ],
]

export default function KeyboardVisualizer({ pressedKey = '', nextKey = '' }) {
  const normalizedNext = useMemo(() => {
    if (!nextKey) return ''
    if (nextKey === ' ') return ' '
    return nextKey.toLowerCase()
  }, [nextKey])

  const normalizedPressed = useMemo(() => {
    if (!pressedKey) return ''
    if (pressedKey === ' ') return ' '
    return pressedKey.toLowerCase()
  }, [pressedKey])

  const getKeyClass = (key) => {
    const k = key.toLowerCase()
    const isPrimary = k === normalizedPressed
    const isNext = k === normalizedNext && !isPrimary
    if (isPrimary) return 'key active'
    if (isNext) return 'key next-key'
    return 'key'
  }

  const getSizeClass = (item) => {
    if (item.extraWide) return 'col-span-5 min-w-[8rem]'
    if (item.wide) return 'col-span-2 min-w-[3.5rem]'
    return 'min-w-[2.5rem]'
  }

  return (
    <div className="w-full overflow-x-auto scrollbar-hide">
      <div className="min-w-[560px] bg-white rounded-3xl border border-gray-100 shadow-soft p-5 space-y-1.5">
        {KEYBOARD_ROWS.map((row, rowIdx) => (
          <div key={rowIdx} className="flex gap-1 justify-center">
            {row.map((item) => (
              <div
                key={item.key}
                className={`key h-9 px-2 ${getSizeClass(item)} ${getKeyClass(item.key)}`}
                style={{ flex: item.extraWide ? '0 0 auto' : item.wide ? '0 0 auto' : '0 0 auto' }}
              >
                <span className="leading-none">{item.label}</span>
              </div>
            ))}
          </div>
        ))}

        {/* Legend */}
        <div className="flex gap-4 justify-center pt-2">
          <div className="flex items-center gap-1.5">
            <div className="w-4 h-4 rounded bg-peach-500 border border-peach-600" />
            <span className="text-xs text-gray-500">Pressed</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-4 h-4 rounded bg-peach-50 border border-peach-300" />
            <span className="text-xs text-gray-500">Next key</span>
          </div>
        </div>
      </div>
    </div>
  )
}
