"use client"

import { motion } from "framer-motion"
import { nearbyColleges } from "@/lib/data"
import { MapPin } from "lucide-react"

export function Colleges() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.5 },
    },
  }

  return (
    <motion.section
      id="colleges"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={containerVariants}
      className="py-16 sm:py-20 bg-slate-50 dark:bg-slate-900"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          variants={itemVariants}
          className="text-center mb-12 sm:mb-16"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 text-chirayu-blue dark:text-chirayu-teal">
            Nearby Colleges
          </h2>
          <div className="flex items-center justify-center gap-2 text-slate-600 dark:text-slate-400">
            <MapPin className="w-5 h-5" />
            <p className="text-lg">
              Koteshwor, Kathmandu - Opposite Bhat-Bhateni Supermarket
            </p>
          </div>
        </motion.div>

        {/* Colleges Grid */}
        <motion.div
          variants={containerVariants}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-4"
        >
          {nearbyColleges.map((college, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ x: 10, scale: 1.02 }}
              className="bg-white dark:bg-slate-800 p-4 sm:p-6 rounded-xl border border-slate-200 dark:border-slate-700 hover:border-chirayu-teal dark:hover:border-chirayu-teal transition-colors"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h3 className="font-semibold text-slate-900 dark:text-white mb-1">
                    {college.name}
                  </h3>
                  <p className="text-sm text-slate-600 dark:text-slate-400 mb-2">
                    {college.type}
                  </p>
                </div>
              </div>
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="inline-block px-3 py-1 bg-chirayu-teal/10 text-chirayu-teal rounded-full text-sm font-medium"
              >
                {college.distance}
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </motion.section>
  )
}
