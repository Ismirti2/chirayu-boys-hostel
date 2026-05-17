"use client"

import { motion } from "framer-motion"
import {
  Users,
  UtensilsCrossed,
  Wifi,
  Wind,
  Shield,
  Leaf,
  Check,
  Zap,
} from "lucide-react"
import { facilities } from "@/lib/data"

const iconMap = {
  Users,
  UtensilsCrossed,
  Wifi,
  Wind,
  Shield,
  Leaf,
  Check,
  Zap,
}

export function Facilities() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  }

  return (
    <motion.section
      id="facilities"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={containerVariants}
      className="py-16 sm:py-20 bg-white dark:bg-slate-950"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          variants={itemVariants}
          className="text-center mb-12 sm:mb-16"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 text-chirayu-blue dark:text-chirayu-teal">
            Our Facilities
          </h2>
          <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            Everything you need for a comfortable and productive hostel life
          </p>
        </motion.div>

        {/* Grid */}
        <motion.div
          variants={containerVariants}
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {facilities.map((facility, index) => {
            const Icon =
              iconMap[facility.icon as keyof typeof iconMap] || Users
            return (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ y: -10, scale: 1.02 }}
                className="bg-slate-50 dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 hover:border-chirayu-teal dark:hover:border-chirayu-teal transition-colors"
              >
                <motion.div
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.6 }}
                  className="w-12 h-12 bg-gradient-to-br from-chirayu-blue/10 to-chirayu-teal/10 rounded-lg flex items-center justify-center mb-4"
                >
                  <Icon className="w-6 h-6 text-chirayu-blue dark:text-chirayu-teal" />
                </motion.div>
                <h3 className="font-semibold text-slate-900 dark:text-white mb-2">
                  {facility.title}
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  {facility.description}
                </p>
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </motion.section>
  )
}
