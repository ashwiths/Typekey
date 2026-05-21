import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { FiTarget, FiHeart, FiZap, FiArrowRight, FiGithub, FiLinkedin, FiMail, FiExternalLink } from 'react-icons/fi'
import { MdKeyboard } from 'react-icons/md'

const MISSION_CARDS = [
  {
    icon: <FiTarget className="w-5 h-5 text-peach-600" />,
    title: 'Our Purpose',
    body: 'TypeMaster was created to make typing education accessible to everyone. We believe keyboard skills are a fundamental literacy in the digital age.',
    bg: 'bg-peach-50',
  },
  {
    icon: <FiZap className="w-5 h-5 text-amber-600" />,
    title: 'Why Typing Matters',
    body: 'The average professional types 40+ hours per week. Improving from 40 to 80 WPM literally gives you back weeks of your life every year.',
    bg: 'bg-amber-50',
  },
  {
    icon: <FiHeart className="w-5 h-5 text-emerald-600" />,
    title: 'Our Mission',
    body: 'To create the most structured, beautiful, and effective typing learning experience — where every lesson builds naturally on the last.',
    bg: 'bg-emerald-50',
  },
]

const STATS = [
  { value: '15',   label: 'Progressive Tests' },
  { value: '10k+', label: 'Learners Helped'   },
  { value: '100%', label: 'Free, Always'       },
  { value: '∞',    label: 'Practice Runs'      },
]

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.65, delay, ease: [0.16, 1, 0.3, 1] },
})

export default function AboutPage() {
  return (
    <div className="page-wrapper">
      <Navbar />

      <div className="max-w-5xl mx-auto px-6 lg:px-8 pt-28 pb-24">

        {/* ── Header ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-20"
        >
          <div className="w-20 h-20 bg-gradient-to-br from-peach-100 to-amber-100 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-soft">
            <MdKeyboard className="w-10 h-10 text-peach-600" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 tracking-tight">
            About TypeMaster
          </h1>
          <p className="text-xl text-gray-500 max-w-2xl mx-auto leading-relaxed">
            A modern, structured typing education platform — built to transform beginners into confident, fast typists.
          </p>
        </motion.div>

        {/* ── Stats band ── */}
        <motion.div {...fadeUp(0)} className="grid grid-cols-2 md:grid-cols-4 gap-5 mb-24">
          {STATS.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.07, duration: 0.55 }}
              whileHover={{ y: -3, scale: 1.02 }}
              className="text-center bg-white rounded-3xl shadow-soft border border-gray-100 py-8 px-4"
            >
              <p className="text-4xl font-black text-peach-500 mb-1 tracking-tight">{s.value}</p>
              <p className="text-sm text-gray-500 font-medium">{s.label}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* ── Mission cards ── */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-24">
          {MISSION_CARDS.map((card, i) => (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.6 }}
              className="bg-white rounded-3xl shadow-soft border border-gray-100 p-7"
            >
              <div className={`w-11 h-11 rounded-2xl flex items-center justify-center mb-5 ${card.bg}`}>
                {card.icon}
              </div>
              <h3 className="font-bold text-gray-900 text-lg mb-3">{card.title}</h3>
              <p className="text-gray-500 text-sm leading-relaxed">{card.body}</p>
            </motion.div>
          ))}
        </div>

        {/* ── Why typing skills matter ── */}
        <motion.section
          {...fadeUp(0.1)}
          className="bg-gradient-to-br from-peach-50 via-white to-amber-50 rounded-3xl border border-peach-100 p-10 mb-24"
        >
          <h2 className="text-2xl font-bold text-gray-900 mb-6 tracking-tight">Why Typing Skills Matter</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              { icon: '⚡', title: 'Double Your Productivity', body: "Going from 40 to 80 WPM means you can write the same content in half the time. That's hours saved every single week." },
              { icon: '🧠', title: 'Reduce Cognitive Load', body: 'When typing is automatic, your brain is free to focus on ideas and creativity rather than the mechanics of the keyboard.' },
              { icon: '💼', title: 'Career Advantage', body: 'Fast, accurate typists are more efficient in every digital role — from developers to writers to business professionals.' },
              { icon: '🎯', title: 'Build Confidence', body: "There's something deeply satisfying about watching your WPM climb. TypeMaster makes the journey structured and rewarding." },
            ].map(({ icon, title, body }) => (
              <div key={title} className="flex gap-4">
                <span className="text-2xl flex-shrink-0 mt-0.5">{icon}</span>
                <div>
                  <p className="font-semibold text-gray-900 mb-1">{title}</p>
                  <p className="text-sm text-gray-500 leading-relaxed">{body}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.section>

        {/* ── Built by card ── */}
        <motion.section {...fadeUp(0.1)} className="mb-24">
          <div className="bg-white rounded-3xl shadow-soft border border-gray-100 p-8 md:p-10">
            <div className="flex items-center gap-3 mb-7">
              <span className="text-2xl">👨‍💻</span>
              <h2 className="text-2xl font-bold text-gray-900 tracking-tight">Built by</h2>
            </div>

            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
              {/* Avatar */}
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-peach-400 to-amber-400 flex items-center justify-center text-white text-2xl font-black shadow-soft flex-shrink-0">
                IA
              </div>

              {/* Name + tagline */}
              <div className="flex-1">
                <h3 className="text-xl font-bold text-gray-900 mb-1">Infant Ashil A</h3>
                <p className="text-gray-500 text-sm leading-relaxed max-w-lg">
                  Full Stack Developer — passionate about building responsive web applications that are fast, beautiful, and scalable.
                </p>
              </div>
            </div>

            {/* Links */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mt-8">
              {[
                {
                  icon: <FiExternalLink className="w-4 h-4" />,
                  label: 'Portfolio',
                  value: 'ashil.space',
                  href: 'https://ashil.space',
                  accent: 'hover:border-peach-300 hover:bg-peach-50 hover:text-peach-700',
                },
                {
                  icon: <FiGithub className="w-4 h-4" />,
                  label: 'GitHub',
                  value: 'github.com/ashwiths',
                  href: 'https://github.com/ashwiths',
                  accent: 'hover:border-gray-400 hover:bg-gray-50 hover:text-gray-900',
                },
                {
                  icon: <FiLinkedin className="w-4 h-4" />,
                  label: 'LinkedIn',
                  value: 'Infant Ashil A',
                  href: 'https://www.linkedin.com/in/infant-ashil-a-b88a39361/',
                  accent: 'hover:border-peach-300 hover:bg-peach-50 hover:text-peach-700',
                },
                {
                  icon: <FiMail className="w-4 h-4" />,
                  label: 'Email',
                  value: 'infantashil55@gmail.com',
                  href: 'mailto:infantashil55@gmail.com',
                  accent: 'hover:border-amber-300 hover:bg-amber-50 hover:text-amber-700',
                },
              ].map((link) => (
                <motion.a
                  key={link.label}
                  href={link.href}
                  target={link.href.startsWith('mailto') ? undefined : '_blank'}
                  rel="noopener noreferrer"
                  whileHover={{ y: -2 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                  className={`group flex items-center gap-3 bg-gray-50 border border-gray-200 rounded-2xl px-4 py-3.5 transition-all duration-200 ${link.accent}`}
                >
                  <span className="text-gray-500 group-hover:scale-110 transition-transform duration-200 flex-shrink-0">
                    {link.icon}
                  </span>
                  <div className="min-w-0">
                    <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider leading-none mb-0.5">{link.label}</p>
                    <p className="text-[13px] font-semibold text-gray-800 truncate">{link.value}</p>
                  </div>
                </motion.a>
              ))}
            </div>
          </div>
        </motion.section>

        {/* ── CTA ── */}
        <motion.div {...fadeUp(0.1)} className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4 tracking-tight">Start your journey today</h2>
          <p className="text-gray-500 mb-8">15 tests. One goal. Your best WPM is just ahead.</p>
          <Link to="/test/1">
            <motion.button
              whileHover={{ scale: 1.04, boxShadow: '0 10px 28px rgba(212,105,58,0.28)' }}
              whileTap={{ scale: 0.97 }}
              className="btn-primary text-base px-10 py-4 inline-flex items-center gap-2"
            >
              Begin Test 1 <FiArrowRight />
            </motion.button>
          </Link>
        </motion.div>

      </div>

      <Footer />
    </div>
  )
}
