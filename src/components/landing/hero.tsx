"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"

interface HeroProps {
  onEnquireClick: () => void
}

export function Hero({ onEnquireClick }: HeroProps) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8 },
    },
  }

  return (
    <motion.section
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="min-h-screen pt-20 pb-12 bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-950 dark:to-chirayu-dark flex items-center"
    >
      <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          {/* Text Content */}
          <motion.div className="space-y-6" variants={containerVariants}>
            <motion.div variants={itemVariants} className="space-y-2">
              <motion.span
                className="inline-block px-4 py-2 bg-chirayu-teal/10 text-chirayu-teal rounded-full text-sm font-semibold"
                whileHover={{ scale: 1.05 }}
              >
                🎓 Admission Open 2026
              </motion.span>
              <motion.h1
                variants={itemVariants}
                className="text-4xl sm:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-chirayu-blue to-chirayu-teal bg-clip-text text-transparent"
              >
                Welcome to Chirayu Boys Hostel
              </motion.h1>
            </motion.div>

            <motion.p
              variants={itemVariants}
              className="text-lg text-slate-600 dark:text-slate-300 max-w-lg"
            >
              Your home away from home with modern amenities, delicious meals,
              and a supportive community for students in Kathmandu.
            </motion.p>

            <motion.div
              variants={itemVariants}
              className="flex flex-col sm:flex-row gap-4 pt-4"
            >
              <Button
                size="lg"
                onClick={onEnquireClick}
                className="text-base"
              >
                Enquire Now
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="text-base"
              >
                Learn More
              </Button>
            </motion.div>

            {/* Stats */}
            <motion.div
              variants={itemVariants}
              className="grid grid-cols-3 gap-4 pt-8 border-t border-slate-200 dark:border-slate-800"
            >
              {[
                { number: "50+", label: "Students" },
                { number: "24/7", label: "Security" },
                { number: "5⭐", label: "Rating" },
              ].map((stat, index) => (
                <motion.div
                  key={index}
                  whileHover={{ scale: 1.05 }}
                  className="text-center"
                >
                  <p className="text-2xl font-bold text-chirayu-blue dark:text-chirayu-teal">
                    {stat.number}
                  </p>
                  <p className="text-sm text-slate-600 dark:text-slate-400">
                    {stat.label}
                  </p>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* Image */}
          <motion.div
            variants={itemVariants}
            className="relative h-96 md:h-full min-h-[500px] rounded-2xl overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-chirayu-blue/20 to-chirayu-teal/20"></div>
            <div className="absolute inset-0 bg-gradient-to-t from-chirayu-dark/30 to-transparent"></div>
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 3, repeat: Infinity }}
              className="absolute inset-0 bg-cover bg-center"
              style={{
                backgroundImage:
                  "linear-gradient(135deg, #002D62 0%, #00C4B4 100%)",
              }}
            />
            <div className="absolute inset-0 flex items-center justify-center text-white">
              <div className="text-center">
                <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-4xl">🏢</span>
                </div>
                <p className="text-lg font-semibold">Hostel Building</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.section>
  )
}
