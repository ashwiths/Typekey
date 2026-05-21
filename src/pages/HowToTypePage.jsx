import { motion } from 'framer-motion'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

const FINGER_GUIDE = [
  {
    finger: 'Left Pinky',
    keys: ['Q', 'A', 'Z', '1', '~'],
    color: 'bg-red-100 text-red-700 border-red-200',
    dot: 'bg-red-400',
  },
  {
    finger: 'Left Ring',
    keys: ['W', 'S', 'X', '2'],
    color: 'bg-orange-100 text-orange-700 border-orange-200',
    dot: 'bg-orange-400',
  },
  {
    finger: 'Left Middle',
    keys: ['E', 'D', 'C', '3'],
    color: 'bg-amber-100 text-amber-700 border-amber-200',
    dot: 'bg-amber-400',
  },
  {
    finger: 'Left Index',
    keys: ['R', 'F', 'V', 'T', 'G', 'B', '4', '5'],
    color: 'bg-yellow-100 text-yellow-700 border-yellow-200',
    dot: 'bg-yellow-400',
  },
  {
    finger: 'Right Index',
    keys: ['Y', 'H', 'N', 'U', 'J', 'M', '6', '7'],
    color: 'bg-green-100 text-green-700 border-green-200',
    dot: 'bg-green-400',
  },
  {
    finger: 'Right Middle',
    keys: ['I', 'K', ',', '8'],
    color: 'bg-teal-100 text-teal-700 border-teal-200',
    dot: 'bg-teal-400',
  },
  {
    finger: 'Right Ring',
    keys: ['O', 'L', '.', '9'],
    color: 'bg-cyan-100 text-cyan-700 border-cyan-200',
    dot: 'bg-cyan-400',
  },
  {
    finger: 'Right Pinky',
    keys: ['P', ';', '/', '0'],
    color: 'bg-purple-100 text-purple-700 border-purple-200',
    dot: 'bg-purple-400',
  },
]

const TIPS = [
  {
    step: '01',
    title: 'Start with the Home Row',
    body: 'Place your left fingers on A, S, D, F and right fingers on J, K, L, ;. Your index fingers should rest on F and J — feel the tactile bumps.',
  },
  {
    step: '02',
    title: 'Never look at the keyboard',
    body: 'Looking down builds bad habits. Trust your muscle memory. It feels hard at first, but your brain will adapt faster than you think.',
  },
  {
    step: '03',
    title: 'Always return to home row',
    body: 'After pressing any key, immediately return your fingers to the home row. This is the single most important rule in touch typing.',
  },
  {
    step: '04',
    title: 'Accuracy before speed',
    body: 'Focus on typing correctly, not fast. Speed comes naturally with consistent practice. Rushing causes mistakes that slow you down.',
  },
  {
    step: '05',
    title: 'Use proper posture',
    body: 'Sit upright, elbows at 90°, wrists slightly elevated. Keep your screen at eye level. Good ergonomics prevent fatigue and injury.',
  },
  {
    step: '06',
    title: 'Practice daily — 15 minutes',
    body: 'Short consistent sessions beat long sporadic ones. Even 15 minutes a day will show measurable improvement within a week.',
  },
]

const POSTURE_POINTS = [
  '🖥️ Screen at eye level, 50–70 cm away',
  '💺 Back straight, feet flat on the floor',
  '💪 Elbows bent at 90°, close to your body',
  '🤲 Wrists floating lightly, not resting on desk',
  '👆 Light, relaxed keystrokes — don\'t pound the keys',
]

export default function HowToTypePage() {
  return (
    <div className="page-wrapper">
      <Navbar />

      <div className="max-w-5xl mx-auto px-6 lg:px-8 pt-28 pb-20">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <span className="text-5xl mb-4 block">✍️</span>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">How to Type Correctly</h1>
          <p className="text-lg text-gray-500 max-w-xl mx-auto leading-relaxed">
            Master the fundamentals of touch typing. Go from hunt-and-peck to confident, fast, accurate typing.
          </p>
        </motion.div>

        {/* Finger placement */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Finger Assignment</h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {FINGER_GUIDE.map((f, i) => (
              <motion.div
                key={f.finger}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className={`rounded-2xl border p-4 ${f.color}`}
              >
                <div className={`w-3 h-3 rounded-full mb-3 ${f.dot}`} />
                <p className="text-xs font-semibold mb-2">{f.finger}</p>
                <div className="flex flex-wrap gap-1">
                  {f.keys.map((k) => (
                    <span key={k} className="bg-white/70 text-xs px-1.5 py-0.5 rounded-md font-mono font-bold border border-current/20">
                      {k}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Home row diagram */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16 bg-white rounded-3xl shadow-soft border border-gray-100 p-8"
        >
          <h2 className="text-xl font-bold text-gray-900 mb-2">The Home Row</h2>
          <p className="text-gray-500 text-sm mb-6">
            This is where your fingers rest. F and J have bumps so you can find them without looking.
          </p>
          <div className="flex flex-wrap gap-2 justify-center mb-4">
            {['A', 'S', 'D', 'F', '·', 'J', 'K', 'L', ';'].map((k, i) => (
              <div
                key={i}
                className={`w-12 h-12 rounded-xl flex items-center justify-center text-sm font-bold border-2 transition-all
                  ${k === '·' ? 'bg-transparent border-transparent text-gray-200 w-4' : ''}
                  ${['F', 'J'].includes(k)
                    ? 'bg-peach-100 border-peach-400 text-peach-700 shadow-peach/30 shadow-md'
                    : k !== '·' ? 'bg-gray-50 border-gray-200 text-gray-600' : ''
                  }`}
              >
                {k !== '·' && k}
                {k === 'F' && <span className="absolute -bottom-1 text-[8px] text-peach-400">▼</span>}
                {k === 'J' && <span className="absolute -bottom-1 text-[8px] text-peach-400">▼</span>}
              </div>
            ))}
          </div>
          <p className="text-center text-xs text-gray-400">← Left hand · Right hand →</p>
        </motion.section>

        {/* Tips */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">6 Essential Typing Rules</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {TIPS.map((tip, i) => (
              <motion.div
                key={tip.step}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.07 }}
                className="bg-white rounded-3xl p-6 shadow-soft border border-gray-100 hover:shadow-soft-md transition-shadow"
              >
                <span className="text-3xl font-black text-peach-100 block mb-2">{tip.step}</span>
                <h3 className="font-semibold text-gray-900 mb-2">{tip.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{tip.body}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Posture */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-gradient-to-br from-peach-50 to-amber-50 rounded-3xl border border-peach-100 p-8 mb-16"
        >
          <h2 className="text-xl font-bold text-gray-900 mb-6">Correct Posture</h2>
          <ul className="space-y-3">
            {POSTURE_POINTS.map((p) => (
              <li key={p} className="flex items-start gap-3 text-sm text-gray-700">
                <span className="text-base flex-shrink-0">{p.substring(0, 2)}</span>
                <span>{p.substring(3)}</span>
              </li>
            ))}
          </ul>
        </motion.section>

        {/* CTA */}
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Ready to Practice?</h2>
          <p className="text-gray-500 mb-8">Start with Test 1 — Home Row — and build from there.</p>
          <a href="/test/1">
            <motion.button
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              className="btn-primary text-base px-10 py-4"
            >
              Start Home Row Test →
            </motion.button>
          </a>
        </div>
      </div>

      <Footer />
    </div>
  )
}
