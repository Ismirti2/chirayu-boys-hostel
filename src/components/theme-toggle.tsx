"use client"

import { motion } from "framer-motion"
import { useTheme } from "@/hooks/use-theme"
import { Moon, Sun } from "lucide-react"

export function ThemeToggle() {
  const { theme, setTheme, mounted } = useTheme()

  if (!mounted) return null

  return (
    <motion.button
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
      className="fixed bottom-6 right-6 z-50 w-12 h-12 rounded-full bg-chirayu-blue dark:bg-chirayu-teal text-white dark:text-chirayu-dark flex items-center justify-center shadow-lg hover:shadow-xl transition-shadow"
    >
      {theme === "light" ? (
        <Moon className="w-5 h-5" />
      ) : (
        <Sun className="w-5 h-5" />
      )}
    </motion.button>
  )
}
