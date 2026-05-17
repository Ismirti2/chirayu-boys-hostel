"use client"

import { motion } from "framer-motion"
import { Menu, X } from "lucide-react"
import { useState } from "react"
import { Button } from "@/components/ui/button"

interface NavbarProps {
  onEnquireClick: () => void
}

export function Navbar({ onEnquireClick }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed top-0 w-full z-40 bg-white/95 backdrop-blur-sm dark:bg-slate-950/95 border-b border-slate-200 dark:border-slate-800"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="flex items-center gap-2 cursor-pointer"
          >
            <div className="w-10 h-10 bg-gradient-to-br from-chirayu-blue to-chirayu-teal rounded-lg flex items-center justify-center text-white font-bold">
              CH
            </div>
            <div className="hidden sm:block">
              <p className="text-sm font-bold text-chirayu-blue dark:text-chirayu-teal">
                CHIRAYU
              </p>
              <p className="text-xs text-slate-600 dark:text-slate-400">
                BOYS HOSTEL
              </p>
            </div>
          </motion.div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8">
            <a
              href="#facilities"
              className="text-sm font-medium text-slate-700 dark:text-slate-300 hover:text-chirayu-blue dark:hover:text-chirayu-teal transition-colors"
            >
              Facilities
            </a>
            <a
              href="#rooms"
              className="text-sm font-medium text-slate-700 dark:text-slate-300 hover:text-chirayu-blue dark:hover:text-chirayu-teal transition-colors"
            >
              Rooms
            </a>
            <a
              href="#menu"
              className="text-sm font-medium text-slate-700 dark:text-slate-300 hover:text-chirayu-blue dark:hover:text-chirayu-teal transition-colors"
            >
              Menu
            </a>
            <a
              href="#colleges"
              className="text-sm font-medium text-slate-700 dark:text-slate-300 hover:text-chirayu-blue dark:hover:text-chirayu-teal transition-colors"
            >
              Colleges
            </a>
          </div>

          {/* CTA and Mobile Menu */}
          <div className="flex items-center gap-4">
            <Button
              size="sm"
              onClick={onEnquireClick}
              className="hidden sm:inline-flex"
            >
              Enquire Now
            </Button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg"
            >
              {isOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="md:hidden pb-4 space-y-2"
          >
            <a
              href="#facilities"
              className="block px-4 py-2 text-sm font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg"
            >
              Facilities
            </a>
            <a
              href="#rooms"
              className="block px-4 py-2 text-sm font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg"
            >
              Rooms
            </a>
            <a
              href="#menu"
              className="block px-4 py-2 text-sm font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg"
            >
              Menu
            </a>
            <a
              href="#colleges"
              className="block px-4 py-2 text-sm font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg"
            >
              Colleges
            </a>
            <Button
              size="sm"
              onClick={onEnquireClick}
              className="w-full"
            >
              Enquire Now
            </Button>
          </motion.div>
        )}
      </div>
    </motion.nav>
  )
}
