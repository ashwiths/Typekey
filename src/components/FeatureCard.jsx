import { motion } from 'framer-motion'

export default function FeatureCard({ icon, title, description, delay = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
      whileHover={{ y: -4, boxShadow: '0 8px 40px rgba(0,0,0,0.09)' }}
      className="bg-white rounded-3xl p-6 shadow-soft border border-gray-100 cursor-default"
    >
      <div className="w-12 h-12 rounded-2xl bg-peach-50 flex items-center justify-center mb-4">
        {icon}
      </div>
      <h3 className="font-semibold text-gray-900 text-base mb-2">{title}</h3>
      <p className="text-sm text-gray-500 leading-relaxed">{description}</p>
    </motion.div>
  )
}
