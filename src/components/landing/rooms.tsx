"use client"

import { motion } from "framer-motion"
import { roomTypes } from "@/lib/data"
import { Button } from "@/components/ui/button"
import { Check } from "lucide-react"

interface RoomsProps {
  onEnquireClick: () => void
}

export function Rooms({ onEnquireClick }: RoomsProps) {
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
      id="rooms"
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
            Our Room Types
          </h2>
          <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            Choose the accommodation that best suits your needs
          </p>
        </motion.div>

        {/* Room Cards */}
        <motion.div
          variants={containerVariants}
          className="grid md:grid-cols-3 gap-8"
        >
          {roomTypes.map((room, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ y: -10 }}
              className="bg-white dark:bg-slate-800 rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-700 hover:shadow-xl transition-shadow"
            >
              {/* Header */}
              <div className="bg-gradient-to-r from-chirayu-blue to-chirayu-teal p-6 text-white">
                <h3 className="text-2xl font-bold mb-2">{room.type}</h3>
                <p className="text-sm opacity-90">{room.description}</p>
              </div>

              {/* Content */}
              <div className="p-6 space-y-6">
                {/* Price */}
                <motion.div whileHover={{ scale: 1.05 }} className="text-center">
                  <p className="text-3xl font-bold text-chirayu-blue dark:text-chirayu-teal">
                    Rs. {room.price}
                  </p>
                  <p className="text-sm text-slate-600 dark:text-slate-400">
                    per month
                  </p>
                </motion.div>

                {/* Capacity */}
                <div className="bg-slate-50 dark:bg-slate-700 p-4 rounded-lg">
                  <p className="text-sm font-semibold text-slate-900 dark:text-white">
                    Capacity: {room.capacity} Student{room.capacity > 1 ? "s" : ""}
                  </p>
                </div>

                {/* Amenities */}
                <div className="space-y-3">
                  {room.amenities.map((amenity, idx) => (
                    <motion.div
                      key={idx}
                      whileHover={{ x: 5 }}
                      className="flex items-start gap-3"
                    >
                      <Check className="w-5 h-5 text-chirayu-teal flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-slate-600 dark:text-slate-300">
                        {amenity}
                      </span>
                    </motion.div>
                  ))}
                </div>

                {/* CTA */}
                <Button
                  onClick={onEnquireClick}
                  variant={index === 1 ? "default" : "outline"}
                  className="w-full"
                >
                  Book Now
                </Button>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </motion.section>
  )
}
