import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import StatsCard from '../components/StatsCard'
import ProgressBar from '../components/ProgressBar'
import { useProgress } from '../hooks/useProgress'
import { TESTS, DIFFICULTY_COLORS } from '../data/tests'
import { FiZap, FiTarget, FiClock, FiCheckCircle, FiArrowRight, FiTrash2 } from 'react-icons/fi'
import { BiBarChartAlt2 } from 'react-icons/bi'
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar
} from 'recharts'

export default function StatisticsPage() {
  const { progress, getStats, getTestResult, isTestCompleted, resetProgress } = useProgress()
  const stats = getStats()

  const completedTests = TESTS.filter((t) => isTestCompleted(t.id))

  // Chart data: WPM per completed test
  const chartData = completedTests.map((t) => {
    const result = getTestResult(t.id)
    return {
      name: `T${t.id}`,
      fullName: t.name,
      wpm: result?.wpm || 0,
      accuracy: result?.accuracy || 0,
    }
  })

  const formatTime = (s) => {
    if (s < 60) return `${Math.round(s)}s`
    const m = Math.floor(s / 60)
    return `${m}m ${Math.round(s % 60)}s`
  }

  return (
    <div className="page-wrapper">
      <Navbar />

      <div className="max-w-7xl mx-auto px-6 lg:px-8 pt-28 pb-20">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-10"
        >
          <div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-2">Your Statistics</h1>
            <p className="text-gray-500">Track every improvement. Celebrate every milestone.</p>
          </div>
          {completedTests.length > 0 && (
            <button
              onClick={() => {
                if (window.confirm('Reset all progress? This cannot be undone.')) resetProgress()
              }}
              className="flex items-center gap-1.5 text-sm text-red-400 hover:text-red-600 bg-red-50 hover:bg-red-100 px-4 py-2 rounded-xl transition-all"
            >
              <FiTrash2 className="w-4 h-4" /> Reset Progress
            </button>
          )}
        </motion.div>

        {completedTests.length === 0 ? (
          /* Empty state */
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-24"
          >
            <div className="text-6xl mb-4">📊</div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">No stats yet</h2>
            <p className="text-gray-500 mb-8">Complete your first test to see statistics here.</p>
            <Link to="/test/1" className="btn-primary inline-flex items-center gap-2">
              Start Test 1 <FiArrowRight />
            </Link>
          </motion.div>
        ) : (
          <>
            {/* Stat cards */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 mb-10">
              <StatsCard
                label="Tests Completed"
                value={stats.completedCount}
                unit={`/ ${TESTS.length}`}
                icon={<FiCheckCircle className="w-5 h-5" />}
                color="green"
                delay={0}
              />
              <StatsCard
                label="Average WPM"
                value={stats.avgWpm}
                unit="wpm"
                icon={<FiZap className="w-5 h-5" />}
                color="peach"
                delay={0.1}
              />
              <StatsCard
                label="Best WPM"
                value={stats.bestWpm}
                unit="wpm"
                icon={<BiBarChartAlt2 className="w-5 h-5" />}
                color="amber"
                delay={0.2}
              />
              <StatsCard
                label="Avg. Accuracy"
                value={`${stats.avgAccuracy}%`}
                icon={<FiTarget className="w-5 h-5" />}
                color="purple"
                delay={0.3}
              />
            </div>

            {/* Practice time */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white rounded-3xl shadow-soft border border-gray-100 p-6 mb-8 flex items-center gap-5"
            >
              <div className="w-12 h-12 bg-amber-50 rounded-2xl flex items-center justify-center">
                <FiClock className="w-5 h-5 text-amber-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Total Practice Time</p>
                <p className="text-2xl font-bold text-gray-900">{formatTime(stats.totalTime)}</p>
              </div>
            </motion.div>

            {/* WPM Chart */}
            {chartData.length > 1 && (
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.25 }}
                className="bg-white rounded-3xl shadow-soft border border-gray-100 p-6 mb-8"
              >
                <h3 className="font-semibold text-gray-900 mb-6">WPM Progress</h3>
                <ResponsiveContainer width="100%" height={220}>
                  <AreaChart data={chartData} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
                    <defs>
                      <linearGradient id="wpmGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#d4693a" stopOpacity={0.18} />
                        <stop offset="100%" stopColor="#d4693a" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0ede8" vertical={false} />
                    <XAxis dataKey="name" tick={{ fontSize: 12, fill: '#9ca3af' }} axisLine={false} tickLine={false} />
                    <YAxis tick={{ fontSize: 12, fill: '#9ca3af' }} axisLine={false} tickLine={false} />
                    <Tooltip
                      contentStyle={{ background: '#fff', border: '1px solid #f0ede8', borderRadius: 12, fontSize: 12 }}
                      formatter={(v, n, p) => [v + ' WPM', p.payload.fullName]}
                    />
                    <Area type="monotone" dataKey="wpm" stroke="#d4693a" strokeWidth={2} fill="url(#wpmGrad)" dot={{ r: 4, fill: '#d4693a', strokeWidth: 0 }} />
                  </AreaChart>
                </ResponsiveContainer>
              </motion.div>
            )}

            {/* Accuracy chart */}
            {chartData.length > 1 && (
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="bg-white rounded-3xl shadow-soft border border-gray-100 p-6 mb-8"
              >
                <h3 className="font-semibold text-gray-900 mb-6">Accuracy per Test</h3>
                <ResponsiveContainer width="100%" height={180}>
                  <BarChart data={chartData} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0ede8" vertical={false} />
                    <XAxis dataKey="name" tick={{ fontSize: 12, fill: '#9ca3af' }} axisLine={false} tickLine={false} />
                    <YAxis domain={[0, 100]} tick={{ fontSize: 12, fill: '#9ca3af' }} axisLine={false} tickLine={false} />
                    <Tooltip
                      contentStyle={{ background: '#fff', border: '1px solid #f0ede8', borderRadius: 12, fontSize: 12 }}
                      formatter={(v, n, p) => [v + '%', 'Accuracy']}
                    />
                    <Bar dataKey="accuracy" fill="#d4693a" radius={[6, 6, 0, 0]} maxBarSize={32} />
                  </BarChart>
                </ResponsiveContainer>
              </motion.div>
            )}

            {/* Per-test breakdown */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35 }}
              className="bg-white rounded-3xl shadow-soft border border-gray-100 overflow-hidden"
            >
              <div className="px-6 py-4 border-b border-gray-50">
                <h3 className="font-semibold text-gray-900">Completed Tests</h3>
              </div>
              <div className="divide-y divide-gray-50">
                {completedTests.map((test) => {
                  const result = getTestResult(test.id)
                  return (
                    <div key={test.id} className="px-6 py-4 flex items-center gap-4 hover:bg-gray-50 transition-colors">
                      <span className="w-8 h-8 rounded-xl bg-peach-50 text-peach-600 text-sm font-bold flex items-center justify-center flex-shrink-0">
                        {test.id}
                      </span>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-gray-900 text-sm truncate">{test.name}</p>
                        <div className="flex items-center gap-2 mt-0.5">
                          <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${DIFFICULTY_COLORS[test.difficulty]}`}>
                            {test.difficulty}
                          </span>
                          <ProgressBar value={result?.accuracy || 0} max={100} color="peach" className="w-20" />
                        </div>
                      </div>
                      <div className="text-right flex-shrink-0">
                        <p className="text-lg font-bold text-gray-900">{result?.wpm} <span className="text-xs text-gray-400 font-normal">wpm</span></p>
                        <p className="text-xs text-gray-400">{result?.accuracy}% acc</p>
                      </div>
                      <Link to={`/test/${test.id}`}>
                        <button className="text-peach-500 hover:text-peach-700 transition-colors ml-2">
                          <FiArrowRight className="w-4 h-4" />
                        </button>
                      </Link>
                    </div>
                  )
                })}
              </div>
            </motion.div>
          </>
        )}
      </div>

      <Footer />
    </div>
  )
}
