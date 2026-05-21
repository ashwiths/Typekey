import { Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import HomePage from './pages/HomePage'
import TestsPage from './pages/TestsPage'
import TypingTestPage from './pages/TypingTestPage'
import StatisticsPage from './pages/StatisticsPage'
import HowToTypePage from './pages/HowToTypePage'
import AboutPage from './pages/AboutPage'

const pageVariants = {
  initial: { opacity: 0, y: 12 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -8 },
}

const pageTransition = { duration: 0.3, ease: 'easeOut' }

function AnimatedPage({ children }) {
  return (
    <motion.div
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={pageTransition}
    >
      {children}
    </motion.div>
  )
}

export default function App() {
  const location = useLocation()

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<AnimatedPage><HomePage /></AnimatedPage>} />
        <Route path="/tests" element={<AnimatedPage><TestsPage /></AnimatedPage>} />
        <Route path="/test/:id" element={<AnimatedPage><TypingTestPage /></AnimatedPage>} />
        <Route path="/stats" element={<AnimatedPage><StatisticsPage /></AnimatedPage>} />
        <Route path="/how-to-type" element={<AnimatedPage><HowToTypePage /></AnimatedPage>} />
        <Route path="/about" element={<AnimatedPage><AboutPage /></AnimatedPage>} />
        {/* 404 fallback */}
        <Route path="*" element={
          <AnimatedPage>
            <div className="min-h-screen flex flex-col items-center justify-center gap-4 bg-background">
              <p className="text-6xl">😵</p>
              <h1 className="text-2xl font-bold text-gray-900">Page not found</h1>
              <a href="/" className="btn-primary">Go Home</a>
            </div>
          </AnimatedPage>
        } />
      </Routes>
    </AnimatePresence>
  )
}
