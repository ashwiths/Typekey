import { useState } from 'react'
import { motion } from 'framer-motion'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import TestCard from '../components/TestCard'
import ProgressBar from '../components/ProgressBar'
import { TESTS } from '../data/tests'
import { useProgress } from '../hooks/useProgress'
import { FiSearch } from 'react-icons/fi'

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

  return (
    <div className="page-wrapper">
      <Navbar />

      <div className="max-w-7xl mx-auto px-6 lg:px-8 pt-28 pb-20">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-10"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-3">All 15 Tests</h1>
          <p className="text-gray-500 text-lg max-w-lg">
            Progress through every level — from home row basics to expert paragraphs.
          </p>
        </motion.div>

        {/* Progress summary */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="bg-white rounded-3xl shadow-soft border border-gray-100 p-6 mb-10"
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
            <div>
              <p className="text-sm text-gray-500 mb-0.5">Overall Progress</p>
              <p className="text-2xl font-bold text-gray-900">
                {completedCount} / {TESTS.length}
                <span className="text-base font-medium text-gray-400 ml-2">tests completed</span>
              </p>
            </div>
            <div className="text-right">
              <span className="text-3xl font-bold text-peach-500">
                {Math.round((completedCount / TESTS.length) * 100)}%
              </span>
            </div>
          </div>
          <ProgressBar value={completedCount} max={TESTS.length} color="peach" />
        </motion.div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          {/* Search */}
          <div className="relative flex-1 max-w-xs">
            <FiSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search tests…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-200 rounded-2xl text-sm focus:outline-none focus:border-peach-300 focus:ring-2 focus:ring-peach-100 transition-all"
            />
          </div>

          {/* Difficulty filter chips */}
          <div className="flex flex-wrap gap-2">
            {DIFFICULTIES.map((d) => (
              <button
                key={d}
                onClick={() => setFilter(d)}
                className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200
                  ${filter === d
                    ? 'bg-peach-500 text-white shadow-peach'
                    : 'bg-white text-gray-600 border border-gray-200 hover:border-peach-200 hover:text-peach-600'
                  }`}
              >
                {d}
              </button>
            ))}
          </div>
        </div>

        {/* Grid */}
        {filtered.length === 0 ? (
          <div className="text-center py-16 text-gray-400">No tests found.</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
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
          </div>
        )}
      </div>

      <Footer />
    </div>
  )
}
