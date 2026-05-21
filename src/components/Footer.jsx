import { Link } from 'react-router-dom'
import { MdKeyboard } from 'react-icons/md'
import { FiTwitter, FiGithub, FiInstagram } from 'react-icons/fi'

const footerLinks = {
  Product: [
    { label: 'Tests', to: '/tests' },
    { label: 'Statistics', to: '/stats' },
    { label: 'How to Type', to: '/how-to-type' },
  ],
  Company: [
    { label: 'About', to: '/about' },
    { label: 'Privacy Policy', to: '/' },
    { label: 'Terms', to: '/' },
  ],
}

export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-100 mt-24">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="md:col-span-2">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <div className="w-9 h-9 bg-peach-100 rounded-xl flex items-center justify-center">
                <MdKeyboard className="w-5 h-5 text-peach-600" />
              </div>
              <span className="font-poppins font-bold text-lg">
                Type<span className="text-peach-500">Master</span>
              </span>
            </Link>
            <p className="text-sm text-gray-500 leading-relaxed max-w-xs">
              15 progressive typing tests designed to improve your speed, accuracy and keyboard confidence — step by step.
            </p>
            <div className="flex gap-3 mt-5">
              {[
                { icon: FiTwitter, href: 'https://twitter.com', label: 'Twitter' },
                { icon: FiGithub, href: 'https://github.com', label: 'GitHub' },
                { icon: FiInstagram, href: 'https://instagram.com', label: 'Instagram' },
              ].map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="w-9 h-9 rounded-xl bg-gray-100 hover:bg-peach-100 flex items-center justify-center text-gray-500 hover:text-peach-600 transition-colors duration-200"
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([section, links]) => (
            <div key={section}>
              <h4 className="text-sm font-semibold text-gray-900 mb-4">{section}</h4>
              <ul className="space-y-2.5">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      to={link.to}
                      className="text-sm text-gray-500 hover:text-peach-600 transition-colors duration-200"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 pt-8 border-t border-gray-100 flex flex-col sm:flex-row justify-between items-center gap-3">
          <p className="text-xs text-gray-400">
            © {new Date().getFullYear()} TypeMaster. All rights reserved.
          </p>
          <p className="text-xs text-gray-400">
            Built with ❤️ for keyboard enthusiasts
          </p>
        </div>
      </div>
    </footer>
  )
}
