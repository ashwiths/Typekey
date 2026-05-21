import { motion } from 'framer-motion'
import { MdKeyboard } from 'react-icons/md'

export default function Loader() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[50vh] gap-4">
      <motion.div
        animate={{ rotate: [0, 10, -10, 0], scale: [1, 1.05, 1] }}
        transition={{ repeat: Infinity, duration: 1.5, ease: 'easeInOut' }}
        className="w-14 h-14 bg-peach-100 rounded-2xl flex items-center justify-center"
      >
        <MdKeyboard className="w-7 h-7 text-peach-600" />
      </motion.div>
      <p className="text-sm text-gray-400 font-medium">Loading…</p>
    </div>
  )
}
