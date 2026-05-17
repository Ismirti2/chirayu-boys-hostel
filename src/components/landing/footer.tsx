"use client"

import { motion } from "framer-motion"
import { Mail, Phone, MapPin, Facebook, Instagram } from "lucide-react"
import { Button } from "@/components/ui/button"

export function Footer() {
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
    <motion.footer
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={containerVariants}
      className="bg-chirayu-dark text-white py-16 sm:py-20"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-8 mb-12">
          {/* Logo Section */}
          <motion.div variants={itemVariants}>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-chirayu-blue to-chirayu-teal rounded-lg flex items-center justify-center font-bold">
                CH
              </div>
              <div>
                <p className="text-sm font-bold">CHIRAYU</p>
                <p className="text-xs opacity-75">BOYS HOSTEL</p>
              </div>
            </div>
            <p className="text-sm opacity-75">
              Providing quality accommodation for students since 2020.
            </p>
          </motion.div>

          {/* Quick Links */}
          <motion.div variants={itemVariants}>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm opacity-75 hover:opacity-100 transition-opacity">
              <li><a href="#facilities" className="hover:text-chirayu-teal transition-colors">Facilities</a></li>
              <li><a href="#rooms" className="hover:text-chirayu-teal transition-colors">Rooms</a></li>
              <li><a href="#menu" className="hover:text-chirayu-teal transition-colors">Menu</a></li>
              <li><a href="#colleges" className="hover:text-chirayu-teal transition-colors">Colleges</a></li>
            </ul>
          </motion.div>

          {/* Services */}
          <motion.div variants={itemVariants}>
            <h4 className="font-semibold mb-4">Services</h4>
            <ul className="space-y-2 text-sm opacity-75 hover:opacity-100 transition-opacity">
              <li><a href="#" className="hover:text-chirayu-teal transition-colors">Student Portal</a></li>
              <li><a href="#" className="hover:text-chirayu-teal transition-colors">Admin Panel</a></li>
              <li><a href="#" className="hover:text-chirayu-teal transition-colors">Admissions</a></li>
              <li><a href="#" className="hover:text-chirayu-teal transition-colors">Contact Us</a></li>
            </ul>
          </motion.div>

          {/* Contact */}
          <motion.div variants={itemVariants}>
            <h4 className="font-semibold mb-4">Contact</h4>
            <div className="space-y-3">
              <motion.a
                href="mailto:chirayuboyshostel@gmail.com"
                whileHover={{ x: 5 }}
                className="flex items-center gap-2 text-sm opacity-75 hover:opacity-100 transition-opacity hover:text-chirayu-teal"
              >
                <Mail className="w-4 h-4" />
                chirayuboyshostel@gmail.com
              </motion.a>
              <motion.a
                href="tel:9804396180"
                whileHover={{ x: 5 }}
                className="flex items-center gap-2 text-sm opacity-75 hover:opacity-100 transition-opacity hover:text-chirayu-teal"
              >
                <Phone className="w-4 h-4" />
                +977-9804396180
              </motion.a>
              <motion.div
                whileHover={{ x: 5 }}
                className="flex items-center gap-2 text-sm opacity-75"
              >
                <MapPin className="w-4 h-4" />
                Koteshwor, Kathmandu
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* Bottom Section */}
        <motion.div
          variants={itemVariants}
          className="border-t border-white/10 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4"
        >
          <p className="text-sm opacity-75">
            © 2026 Chirayu Boys Hostel. All rights reserved.
          </p>
          <div className="flex gap-4">
            <motion.button
              whileHover={{ scale: 1.2 }}
              className="opacity-75 hover:opacity-100 transition-opacity"
            >
              <Facebook className="w-5 h-5" />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.2 }}
              className="opacity-75 hover:opacity-100 transition-opacity"
            >
              <Instagram className="w-5 h-5" />
            </motion.button>
          </div>
        </motion.div>
      </div>
    </motion.footer>
  )
}
