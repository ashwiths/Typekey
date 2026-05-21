import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { FiArrowRight, FiTarget, FiZap, FiTrendingUp, FiGrid } from 'react-icons/fi'
import { MdSpeed } from 'react-icons/md'
import { BiBarChartAlt2 } from 'react-icons/bi'
import HeroSection from '../components/HeroSection'
import FeatureCard from '../components/FeatureCard'
import { TESTS, DIFFICULTY_COLORS } from '../data/tests'
import { useProgress } from '../hooks/useProgress'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

const FEATURES = [
  {
    icon: <FiGrid className="w-5 h-5 text-peach-600" />,
    title: '15 Progressive Tests',
    description: 'From basic keys to advanced challenges. Step by step you\'ll get better.',
  },
  {
    icon: <FiTarget className="w-5 h-5 text-emerald-600" />,
    title: 'Improve Accuracy',
    description: 'Focus on correct typing and accuracy to become a confident typist.',
  },
  {
    icon: <MdSpeed className="w-5 h-5 text-amber-600" />,
    title: 'Increase Speed',
    description: 'Track your WPM and beat your personal best every time.',
  },
  {
    icon: <BiBarChartAlt2 className="w-5 h-5 text-purple-600" />,
    title: 'Track Progress',
    description: 'See your improvement, unlock new tests and achieve mastery.',
  },
]

const iconColorMap = {
  peach: 'bg-peach-100 text-peach-700',
  green: 'bg-emerald-100 text-emerald-700',
  purple: 'bg-purple-100 text-purple-700',
  orange: 'bg-orange-100 text-orange-700',
  warm: 'bg-amber-100 text-amber-700',
}

export default function HomePage() {
  const { isTestLocked, isTestCompleted } = useProgress()

  return (
    <div className="page-wrapper">
      <Navbar />
      <HeroSection />

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {FEATURES.map((f, i) => (
              <FeatureCard key={f.title} {...f} delay={i * 0.1} />
            ))}
          </div>
        </div>
      </section>

      {/* Tests Preview Section */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10"
          >
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
                15 Tests. One Goal.
              </h2>
              <p className="text-gray-500">Master your keyboard. One test at a time.</p>
            </div>
            <Link to="/tests">
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="btn-secondary flex items-center gap-2 whitespace-nowrap"
              >
                View All Tests <FiArrowRight />
              </motion.button>
            </Link>
          </motion.div>

          {/* 5-column preview */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {TESTS.slice(0, 5).map((test, i) => {
              const locked = isTestLocked(test.id)
              const completed = isTestCompleted(test.id)
              const iconBg = iconColorMap[test.color] || iconColorMap.peach

              return (
                <motion.div
                  key={test.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.07 }}
                  whileHover={!locked ? { y: -4 } : {}}
                  className={`bg-white rounded-3xl p-5 shadow-soft border transition-all duration-200
                    ${locked ? 'opacity-60 border-gray-100' : 'border-gray-100 hover:shadow-soft-md hover:border-peach-100'}`}
                >
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-base font-bold mb-3 ${iconBg}`}>
                    {test.id}
                  </div>
                  <h3 className="font-semibold text-gray-900 text-sm mb-1">{test.name}</h3>
                  <p className="text-xs text-gray-400 mb-3 leading-relaxed line-clamp-2">{test.description}</p>
                  <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${DIFFICULTY_COLORS[test.difficulty]}`}>
                    {test.difficulty}
                  </span>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-gradient-to-br from-peach-50 via-white to-amber-50 rounded-4xl p-14 border border-peach-100 shadow-soft-lg"
          >
            <span className="text-4xl mb-6 block">⌨️</span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Ready to become a typing master?
            </h2>
            <p className="text-gray-500 mb-8 text-lg max-w-xl mx-auto">
              Start with Test 1 today. Each test builds on the last, leading you to keyboard mastery.
            </p>
            <Link to="/test/1">
              <motion.button
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
                className="btn-primary text-base px-10 py-4 inline-flex items-center gap-2"
              >
                Begin Test 1 <FiArrowRight className="w-4 h-4" />
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
