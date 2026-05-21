import { useState, useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { HiOutlineMenuAlt3, HiX } from 'react-icons/hi'
import { MdKeyboard } from 'react-icons/md'

const navLinks = [
  { label: 'Home', to: '/' },
  { label: 'Tests', to: '/tests' },
  { label: 'Stats', to: '/stats' },
  { label: 'How to Type', to: '/how-to-type' },
  { label: 'About', to: '/about' },
]

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const location = useLocation()
  const navigate = useNavigate()

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Close mobile menu on route change
  useEffect(() => {
    setMobileOpen(false)
  }, [location.pathname])

  return (
    <>
      <motion.nav
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'bg-white/80 backdrop-blur-xl shadow-soft border-b border-white/60'
            : 'bg-white/60 backdrop-blur-md'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2 group">
              <div className="w-9 h-9 bg-peach-100 rounded-xl flex items-center justify-center group-hover:bg-peach-200 transition-colors duration-200">
                <MdKeyboard className="w-5 h-5 text-peach-600" />
              </div>
              <span className="font-poppins font-bold text-lg">
                Type<span className="text-peach-500">Master</span>
              </span>
            </Link>

            {/* Desktop Nav Links */}
            <div className="hidden md:flex items-center gap-1">
              {navLinks.map((link) => {
                const isActive = link.label === 'Tests'
                  ? (location.pathname === '/tests' || location.pathname.startsWith('/test/'))
                  : location.pathname === link.to || (link.to !== '/' && location.pathname.startsWith(link.to))
                return (
                  <Link
                    key={link.label}
                    to={link.to}
                    className={`relative px-4 py-2 text-sm font-medium rounded-xl transition-colors duration-200 ${
                      isActive
                        ? 'text-peach-600'
                        : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                    }`}
                  >
                    {link.label}
                    {isActive && (
                      <motion.span
                        layoutId="nav-active"
                        className="absolute bottom-0.5 left-1/2 -translate-x-1/2 w-4 h-0.5 bg-peach-500 rounded-full"
                      />
                    )}
                  </Link>
                )
              })}
            </div>

            {/* CTA + Mobile Toggle */}
            <div className="flex items-center gap-3">
              <motion.button
                onClick={() => navigate('/tests')}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="hidden md:flex btn-primary text-sm items-center gap-1.5"
              >
                Start Typing
              </motion.button>

              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className="md:hidden w-10 h-10 flex items-center justify-center rounded-xl bg-gray-100 hover:bg-gray-200 transition-colors"
                aria-label="Toggle menu"
              >
                {mobileOpen ? <HiX className="w-5 h-5" /> : <HiOutlineMenuAlt3 className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="fixed top-16 left-0 right-0 z-40 bg-white/95 backdrop-blur-xl border-b border-gray-100 shadow-soft-md px-6 py-4 md:hidden"
          >
            <div className="flex flex-col gap-1">
              {navLinks.map((link) => {
                const isActive = location.pathname === link.to
                return (
                  <Link
                    key={link.label}
                    to={link.to}
                    className={`px-4 py-3 rounded-xl text-sm font-medium transition-colors ${
                      isActive
                        ? 'bg-peach-50 text-peach-600'
                        : 'text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    {link.label}
                  </Link>
                )
              })}
              <button
                onClick={() => navigate('/tests')}
                className="mt-2 btn-primary text-sm text-center"
              >
                Start Typing
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
