"use client"

import { motion } from "framer-motion"
import { weeklyMenu } from "@/lib/data"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export function Menu() {
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
      id="menu"
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
            Weekly Menu
          </h2>
          <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            Delicious and nutritious meals prepared fresh daily
          </p>
        </motion.div>

        {/* Menu Tabs */}
        <motion.div variants={itemVariants} className="bg-slate-50 dark:bg-slate-900 rounded-2xl p-6 sm:p-8">
          <Tabs defaultValue="0" className="w-full">
            <TabsList className="grid w-full grid-cols-7 mb-8">
              {weeklyMenu.map((item, index) => (
                <TabsTrigger
                  key={index}
                  value={index.toString()}
                  className="text-xs sm:text-sm"
                >
                  {item.day.slice(0, 3)}
                </TabsTrigger>
              ))}
            </TabsList>

            {weeklyMenu.map((day, index) => (
              <TabsContent
                key={index}
                value={index.toString()}
                className="space-y-4"
              >
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="grid md:grid-cols-4 gap-4"
                >
                  {[
                    { label: "Teatime", value: day.teatime },
                    { label: "Lunch", value: day.lunch },
                    { label: "Snacks", value: day.snacks },
                    { label: "Dinner", value: day.dinner },
                  ].map((meal, idx) => (
                    <motion.div
                      key={idx}
                      whileHover={{ scale: 1.05 }}
                      className="bg-white dark:bg-slate-800 p-4 rounded-xl border border-slate-200 dark:border-slate-700"
                    >
                      <p className="text-sm font-semibold text-slate-600 dark:text-slate-400 mb-2">
                        {meal.label}
                      </p>
                      <p className="text-lg font-bold text-chirayu-blue dark:text-chirayu-teal">
                        {meal.value}
                      </p>
                    </motion.div>
                  ))}
                </motion.div>
              </TabsContent>
            ))}
          </Tabs>
        </motion.div>
      </div>
    </motion.section>
  )
}
