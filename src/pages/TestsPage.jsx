import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import TestCard from '../components/TestCard'
import ProgressBar from '../components/ProgressBar'
import { TESTS } from '../data/tests'
import { useProgress } from '../hooks/useProgress'
import { FiSearch, FiBookOpen } from 'react-icons/fi'
import { BsLightningChargeFill } from 'react-icons/bs'

const DIFFICULTIES = ['All', 'Beginner', 'Easy', 'Medium', 'Hard', 'Expert']

export default function TestsPage() {
  const { isTestLocked, isTestCompleted, getTestResult, progress } = useProgress()
  const [filter, setFilter] = useState('All')
  const [search, setSearch] = useState('')

  const filtered = TESTS.filter((t) => {
    const matchesDiff = filter === 'All' || t.difficulty === filter
    const matchesSearch = t.name.toLowerCase().includes(search.toLowerCase())
    return matchesDiff && matchesSearch
  })

  const completedCount = progress.completedTests.length
  const pct = Math.round((completedCount / TESTS.length) * 100)

  return (
    <div className="page-wrapper">
      <Navbar />

      {/* ── Ambient background ── */}
      <div className="fixed top-0 right-0 w-[600px] h-[500px] bg-peach-100/30 rounded-full blur-[140px] pointer-events-none -z-10" />
      <div className="fixed bottom-0 left-0 w-[500px] h-[400px] bg-amber-50/40 rounded-full blur-[120px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-6 lg:px-8 pt-20 pb-20">

        {/* ── Header ── */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="mb-7"
        >
          <div className="flex items-center gap-2.5 mb-3">
            <div className="w-8 h-8 rounded-xl bg-peach-100 flex items-center justify-center">
              <FiBookOpen className="w-4 h-4 text-peach-600" />
            </div>
            <span className="text-sm font-bold text-peach-600 uppercase tracking-widest">All Tests</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 tracking-tight mb-2">
            Your Learning Path
          </h1>
          <p className="text-gray-500 text-lg max-w-lg leading-relaxed">
            Progress through every level — from home row basics to expert paragraphs.
          </p>
        </motion.div>

        {/* ── Progress card ── */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="relative bg-white/70 backdrop-blur-2xl rounded-3xl border border-white shadow-[0_8px_40px_rgba(212,105,58,0.08),inset_0_1px_0_rgba(255,255,255,0.9)] p-6 mb-7 overflow-hidden"
        >
          {/* Subtle inner color blob */}
          <div className="absolute -top-12 -right-12 w-40 h-40 bg-peach-100/50 rounded-full blur-3xl pointer-events-none" />

          <div className="relative flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-5">
            <div>
              <p className="text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-1">Overall Progress</p>
              <p className="text-2xl font-bold text-gray-900 tracking-tight">
                {completedCount}
                <span className="text-gray-400 font-medium text-lg"> / {TESTS.length} tests completed</span>
              </p>
            </div>
            <div className="flex items-end gap-3 sm:text-right">
              <motion.span
                key={pct}
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-peach-500 to-amber-400 leading-none tabular-nums"
              >
                {pct}%
              </motion.span>
              {completedCount > 0 && (
                <span className="flex items-center gap-1 text-[11px] font-bold text-emerald-600 bg-emerald-50 border border-emerald-200 px-2.5 py-1 rounded-full mb-1">
                  <BsLightningChargeFill className="w-2.5 h-2.5" />
                  On a roll!
                </span>
              )}
            </div>
          </div>

          {/* Animated progress bar */}
          <div className="h-2.5 bg-gray-100 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${pct}%` }}
              transition={{ duration: 1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="h-full rounded-full bg-gradient-to-r from-peach-400 to-amber-400 shadow-[0_0_8px_rgba(212,105,58,0.4)]"
            />
          </div>

          {/* Micro milestones */}
          <div className="flex items-center gap-4 mt-4">
            {[
              { label: 'Beginner', at: 3 },
              { label: 'Intermediate', at: 8 },
              { label: 'Advanced', at: 12 },
              { label: 'Expert', at: 15 },
            ].map(({ label, at }) => (
              <div key={label} className="flex items-center gap-1.5">
                <span className={`w-2 h-2 rounded-full ${completedCount >= at ? 'bg-peach-400' : 'bg-gray-200'}`} />
                <span className={`text-[11px] font-semibold ${completedCount >= at ? 'text-peach-600' : 'text-gray-400'}`}>
                  {label}
                </span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* ── Filters ── */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.18, duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col sm:flex-row gap-3 mb-7"
        >
          {/* Search */}
          <div className="relative flex-1 max-w-xs">
            <FiSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
            <input
              type="text"
              placeholder="Search tests…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-white/80 backdrop-blur-md border border-gray-200/80 rounded-2xl text-sm text-gray-700 placeholder-gray-400 font-medium focus:outline-none focus:border-peach-300 focus:ring-2 focus:ring-peach-100/60 shadow-[0_2px_8px_rgba(0,0,0,0.03)] transition-all duration-200"
            />
          </div>

          {/* Difficulty pills */}
          <div className="flex flex-wrap gap-2">
            {DIFFICULTIES.map((d) => (
              <motion.button
                key={d}
                onClick={() => setFilter(d)}
                whileHover={{ y: -1 }}
                whileTap={{ scale: 0.96 }}
                transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                className={`px-4 py-2.5 rounded-2xl text-[13px] font-semibold transition-all duration-200 ${
                  filter === d
                    ? 'bg-gradient-to-b from-peach-400 to-peach-500 text-white shadow-[0_4px_12px_rgba(212,105,58,0.3)] border border-peach-500'
                    : 'bg-white/80 backdrop-blur-sm text-gray-600 border border-gray-200/80 hover:border-peach-200 hover:text-peach-600 hover:bg-peach-50/60 shadow-[0_2px_6px_rgba(0,0,0,0.03)]'
                }`}
              >
                {d}
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* ── Count line ── */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.22 }}
          className="text-[13px] text-gray-400 font-medium mb-5"
        >
          Showing <span className="text-gray-700 font-bold">{filtered.length}</span> test{filtered.length !== 1 ? 's' : ''}
          {filter !== 'All' && <span className="ml-1">in <span className="text-peach-600 font-bold">{filter}</span></span>}
        </motion.p>

        {/* ── Grid ── */}
        <AnimatePresence mode="wait">
          {filtered.length === 0 ? (
            <motion.div
              key="empty"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-center py-20 text-gray-400 font-medium"
            >
              No tests match your search.
            </motion.div>
          ) : (
            <motion.div
              key="grid"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
            >
              {filtered.map((test, i) => (
                <TestCard
                  key={test.id}
                  test={test}
                  index={i}
                  isLocked={isTestLocked(test.id)}
                  isCompleted={isTestCompleted(test.id)}
                  result={getTestResult(test.id)}
                />
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <Footer />
    </div>
  )
}
