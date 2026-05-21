import { motion } from 'framer-motion'
import { FiGithub, FiLinkedin, FiMail } from 'react-icons/fi'

export default function Footer() {
  return (
    <footer className="w-full bg-[#f6f3fc]/90 border-t border-[#ebdffc]/50 py-10 relative overflow-hidden">
      {/* Decorative subtle ambient lights */}
      <div className="absolute -bottom-10 left-1/4 w-[250px] h-[100px] bg-purple-200/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -top-10 right-1/4 w-[200px] h-[80px] bg-indigo-200/20 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          
          {/* Left Column: Signature & Greeting */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            <a
              href="https://ashil.space"
              target="_blank"
              rel="noopener noreferrer"
              className="font-['Caveat'] text-[30px] font-bold text-[#c03473] leading-none mb-1 cursor-pointer block hover:scale-105 hover:opacity-90 transition-all duration-300"
            >
              Infant Ashil A
            </a>
            <p className="text-[11.5px] text-gray-500 font-medium tracking-wide flex items-center gap-1">
              Made with <span className="text-[#c03473]">♡</span> and a lot of <span className="text-sm">☕</span>
            </p>
          </div>

          {/* Center Column: Interactive Circular Social Buttons */}
          <div className="flex items-center gap-4">
            {[
              {
                icon: <FiGithub className="w-[18px] h-[18px]" />,
                href: 'https://github.com/ashwiths',
                label: 'GitHub',
                color: 'hover:text-gray-900 hover:border-gray-300 hover:bg-gray-50'
              },
              {
                icon: <FiLinkedin className="w-[18px] h-[18px]" />,
                href: 'https://www.linkedin.com/in/infant-ashil-a-b88a39361/',
                label: 'LinkedIn',
                color: 'hover:text-[#0077b5] hover:border-[#0077b5]/30 hover:bg-[#0077b5]/5'
              },
              {
                icon: <FiMail className="w-[18px] h-[18px]" />,
                href: 'mailto:infantashil55@gmail.com',
                label: 'Email',
                color: 'hover:text-[#c03473] hover:border-[#c03473]/30 hover:bg-[#c03473]/5'
              }
            ].map(({ icon, href, label, color }) => (
              <motion.a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                whileHover={{ y: -3, scale: 1.08 }}
                whileTap={{ scale: 0.95 }}
                className={`w-11 h-11 rounded-full bg-white border border-[#e8dffc] shadow-[0_4px_12px_rgba(156,117,240,0.08)] flex items-center justify-center text-gray-500 transition-all duration-300 ${color}`}
              >
                {icon}
              </motion.a>
            ))}
          </div>

          {/* Right Column: Dynamic Copyright */}
          <div className="text-[11.5px] text-gray-400 font-bold tracking-wide text-center md:text-right cursor-default">
            © {new Date().getFullYear()} Infant Ashil A
          </div>

        </div>
      </div>
    </footer>
  )
}
