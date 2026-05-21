import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { BsLightningChargeFill, BsStarFill } from 'react-icons/bs'
import { FiArrowRight, FiGrid, FiActivity } from 'react-icons/fi'
import InteractiveKeyboard from './InteractiveKeyboard'

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] },
})

export default function HeroSection() {
  const navigate = useNavigate()

  return (
    <section className="relative min-h-[78vh] flex items-center pt-14 pb-20 overflow-hidden">
      
      {/* ── Premium Background Lighting ── */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-white via-[#fcfbf9] to-[#f7f7f5] -z-20" />
      
      {/* ── Animated Ambient Blobs ── */}
      <motion.div 
        animate={{ scale: [1, 1.08, 1], rotate: [0, 8, 0], opacity: [0.4, 0.6, 0.4] }} 
        transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute top-[-15%] right-[-5%] w-[700px] h-[700px] bg-gradient-to-br from-peach-100/60 to-amber-50/20 rounded-full blur-[140px] pointer-events-none -z-10" 
      />
      <motion.div 
        animate={{ scale: [1, 1.15, 1], rotate: [0, -10, 0], opacity: [0.3, 0.5, 0.3] }} 
        transition={{ duration: 22, repeat: Infinity, ease: 'easeInOut', delay: 3 }}
        className="absolute bottom-[-20%] left-[-15%] w-[600px] h-[600px] bg-gradient-to-tr from-amber-100/40 to-peach-50/20 rounded-full blur-[120px] pointer-events-none -z-10" 
      />
      
      {/* Subtle pure white highlight behind text */}
      <div className="absolute top-[20%] left-[10%] w-[500px] h-[500px] bg-white/70 rounded-full blur-[100px] pointer-events-none -z-10" />

      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 w-full relative z-10">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-14 lg:gap-8">

          {/* ─────────── LEFT: Copy ─────────── */}
          <div className="w-full lg:w-[55%] xl:w-[50%] flex flex-col justify-center">
            
            <motion.div {...fadeUp(0)} className="inline-flex items-center gap-2.5 bg-white/70 backdrop-blur-xl border border-white shadow-[0_4px_12px_rgba(0,0,0,0.03),inset_0_1px_0_rgba(255,255,255,0.8)] rounded-full px-5 py-2 mb-8 self-start group cursor-default transition-all duration-300 hover:bg-white hover:shadow-[0_8px_20px_rgba(0,0,0,0.04)]">
              <span className="flex items-center justify-center w-5 h-5 rounded-full bg-peach-50 border border-peach-100 group-hover:scale-110 transition-transform duration-300">
                <BsLightningChargeFill className="w-2.5 h-2.5 text-peach-500" />
              </span>
              <span className="text-[13.5px] text-gray-700 font-bold tracking-wide uppercase">The New Standard in Typing</span>
            </motion.div>

            <motion.h1 {...fadeUp(0.1)} className="text-[3.2rem] md:text-[4.2rem] xl:text-[4.75rem] font-bold leading-[1.1] mb-6 tracking-tight text-gray-900 drop-shadow-sm">
              Type{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-peach-500 via-peach-400 to-amber-400">Better.</span>
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-peach-500 via-peach-400 to-amber-400">Faster.</span>{' '}
              Smarter.
            </motion.h1>

            <motion.p {...fadeUp(0.2)} className="text-[1.15rem] md:text-[1.25rem] text-gray-500 leading-[1.65] mb-10 max-w-[480px] font-medium">
              Take our 15 progressive typing tests and improve your speed, accuracy and keyboard confidence step by step.
            </motion.p>

            <motion.div {...fadeUp(0.3)} className="flex flex-wrap gap-4 mb-10">
              <motion.button
                onClick={() => navigate('/test/1')}
                whileHover={{ y: -2, scale: 1.02, boxShadow: '0 12px 30px -4px rgba(212,105,58,0.4), inset 0 1px 0 rgba(255,255,255,0.3)' }}
                whileTap={{ scale: 0.97 }}
                transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                className="flex items-center justify-center gap-2.5 text-[16px] px-9 py-4 w-full sm:w-auto font-bold text-white bg-gradient-to-b from-peach-400 to-peach-500 border border-peach-500 rounded-2xl shadow-[0_4px_12px_rgba(212,105,58,0.25)]"
              >
                Start Your First Test <FiArrowRight className="w-4.5 h-4.5 ml-0.5" />
              </motion.button>
              
              <motion.button
                onClick={() => navigate('/tests')}
                whileHover={{ y: -2, scale: 1.02, boxShadow: '0 12px 30px -4px rgba(0,0,0,0.06)' }}
                whileTap={{ scale: 0.97 }}
                transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                className="flex items-center justify-center gap-2.5 text-[16px] px-9 py-4 w-full sm:w-auto font-bold text-gray-700 bg-white/70 backdrop-blur-md border border-white rounded-2xl shadow-[0_4px_12px_rgba(0,0,0,0.03),inset_0_1px_0_rgba(255,255,255,0.9)] hover:bg-white"
              >
                View All Tests <FiGrid className="w-4.5 h-4.5 text-gray-400" />
              </motion.button>
            </motion.div>

            {/* Premium Trust Indicators */}
            <motion.div {...fadeUp(0.4)} className="flex flex-col sm:flex-row items-start sm:items-center gap-6 sm:gap-8 pt-3 border-t border-gray-200/50">
              <div className="flex items-center gap-3 mt-4 sm:mt-0">
                <div className="flex -space-x-2.5">
                  {[
                    { bg: 'bg-gradient-to-br from-[#f4a261] to-[#e76f51]', l: 'A' },
                    { bg: 'bg-gradient-to-br from-[#e76f51] to-[#d45d3e]', l: 'R' },
                    { bg: 'bg-gradient-to-br from-[#457b9d] to-[#1d3557]', l: 'S' },
                    { bg: 'bg-gradient-to-br from-[#2a9d8f] to-[#21867a]', l: 'T' },
                  ].map(({ bg, l }, i) => (
                    <motion.div 
                      key={l}
                      whileHover={{ y: -4, zIndex: 10 }}
                      className={`w-[38px] h-[38px] rounded-full border-[2.5px] border-[#fcfbf9] flex items-center justify-center text-[11px] text-white font-bold shadow-md relative ${bg}`}
                      style={{ zIndex: 4 - i }}
                    >
                      {l}
                    </motion.div>
                  ))}
                </div>
                <div className="flex flex-col ml-1">
                  <div className="flex items-center gap-1">
                    {[1, 2, 3, 4, 5].map((i) => <BsStarFill key={i} className="w-3.5 h-3.5 text-amber-400 drop-shadow-sm" />)}
                  </div>
                  <p className="text-[13px] text-gray-500 font-medium mt-0.5 tracking-tight">
                    <span className="text-gray-800 font-bold">10,000+</span> active learners
                  </p>
                </div>
              </div>
              
              <div className="hidden sm:block w-[1px] h-10 bg-gradient-to-b from-transparent via-gray-300 to-transparent mt-4 sm:mt-0"></div>
              
              <div className="flex items-center gap-3.5 mt-4 sm:mt-0">
                <div className="w-[42px] h-[42px] rounded-full bg-gradient-to-br from-emerald-50 to-emerald-100 border border-emerald-200 shadow-sm flex items-center justify-center">
                  <FiActivity className="w-5 h-5 text-emerald-500" />
                </div>
                <div className="flex flex-col">
                  <span className="text-[16px] font-extrabold text-gray-800 leading-none tracking-tight">+24 WPM</span>
                  <span className="text-[12.5px] text-gray-500 font-medium tracking-tight mt-0.5">Average improvement</span>
                </div>
              </div>
            </motion.div>
          </div>

          {/* ─────────── RIGHT: Interactive card ─────────── */}
          <div className="w-full lg:w-[45%] xl:w-[50%] flex flex-col justify-center items-center lg:items-start z-20">
            <div className="w-full max-w-[560px] relative">
              
              {/* Premium Nudge — floating badge */}
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: [0, -5, 0] }}
                transition={{ opacity: { delay: 1.4, duration: 0.8 }, y: { delay: 1.4, duration: 3.5, repeat: Infinity, ease: 'easeInOut' } }}
                className="absolute -top-14 left-6 flex items-center gap-2.5 bg-white/80 backdrop-blur-2xl px-4 py-2 rounded-full border border-white/90 shadow-[0_8px_24px_rgba(0,0,0,0.06),0_2px_6px_rgba(0,0,0,0.03),inset_0_1px_0_rgba(255,255,255,1)] z-30 pointer-events-none"
              >
                <div className="relative flex items-center justify-center">
                  <span className="absolute w-2 h-2 rounded-full bg-peach-400 animate-ping opacity-60"></span>
                  <span className="relative w-1.5 h-1.5 rounded-full bg-peach-500 shadow-[0_0_6px_rgba(212,105,58,0.9)]"></span>
                </div>
                <span className="text-[12.5px] text-gray-600 font-semibold tracking-tight">Live Interactive</span>
              </motion.div>

              <InteractiveKeyboard />
            </div>
          </div>
        </div>
      </div>
      
      {/* ── Soft blur transition into the next section ── */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#f7f7f5] via-[#f7f7f5]/80 to-transparent z-20 pointer-events-none" />
      
    </section>
  )
}
