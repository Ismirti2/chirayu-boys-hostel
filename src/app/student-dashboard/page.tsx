"use client"

import { useRouter } from "next/navigation"
import { useAuthStore } from "@/lib/store"
import { useEffect } from "react"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { LogOut, Home, User, FileText, AlertCircle } from "lucide-react"
import Link from "next/link"

export default function StudentDashboard() {
  const router = useRouter()
  const { isAuthenticated, userType, currentUser, logout } = useAuthStore()

  useEffect(() => {
    if (!isAuthenticated || userType !== "student") {
      router.push("/student-login")
    }
  }, [isAuthenticated, userType, router])

  const handleLogout = () => {
    logout()
    router.push("/")
  }

  if (!isAuthenticated) {
    return null
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-950 dark:to-chirayu-dark">
      {/* Header */}
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 sticky top-0 z-40"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <motion.div whileHover={{ scale: 1.05 }} className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-chirayu-blue to-chirayu-teal rounded-lg flex items-center justify-center text-white font-bold">
              CH
            </div>
            <div>
              <p className="text-sm font-bold text-chirayu-blue dark:text-chirayu-teal">CHIRAYU</p>
              <p className="text-xs text-slate-600 dark:text-slate-400">Student Portal</p>
            </div>
          </motion.div>

          <Button
            variant="outline"
            size="sm"
            onClick={handleLogout}
            className="flex items-center gap-2"
          >
            <LogOut className="w-4 h-4" />
            Logout
          </Button>
        </div>
      </motion.header>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white dark:bg-slate-900 rounded-xl p-6 sm:p-8 mb-8"
        >
          <h1 className="text-3xl font-bold text-chirayu-blue dark:text-chirayu-teal mb-2">
            Welcome, {currentUser?.name || "Student"}!
          </h1>
          <p className="text-slate-600 dark:text-slate-400">
            Manage your hostel account and view your details below.
          </p>
        </motion.div>

        {/* Navigation Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {[
            {
              icon: User,
              title: "Profile",
              description: "View your profile",
              href: "#",
            },
            {
              icon: Home,
              title: "Room Info",
              description: "Room details",
              href: "#",
            },
            {
              icon: FileText,
              title: "Complaints",
              description: "File complaints",
              href: "#",
            },
            {
              icon: AlertCircle,
              title: "Notices",
              description: "View notices",
              href: "#",
            },
          ].map((item, index) => {
            const Icon = item.icon
            return (
              <motion.a
                key={index}
                href={item.href}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 hover:border-chirayu-teal dark:hover:border-chirayu-teal transition-colors cursor-pointer"
              >
                <motion.div
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.6 }}
                  className="w-12 h-12 bg-gradient-to-br from-chirayu-blue/10 to-chirayu-teal/10 rounded-lg flex items-center justify-center mb-4"
                >
                  <Icon className="w-6 h-6 text-chirayu-blue dark:text-chirayu-teal" />
                </motion.div>
                <h3 className="font-semibold text-slate-900 dark:text-white mb-1">
                  {item.title}
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  {item.description}
                </p>
              </motion.a>
            )
          })}
        </div>

        {/* Student Details */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="bg-white dark:bg-slate-900 rounded-xl p-6 sm:p-8"
        >
          <h2 className="text-2xl font-bold text-chirayu-blue dark:text-chirayu-teal mb-6">
            Your Details
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            {[
              { label: "Student ID", value: currentUser?.studentId },
              { label: "Name", value: currentUser?.name },
              { label: "Room Type", value: "Double Seater" },
              { label: "Room Number", value: "201" },
              { label: "Check-in Date", value: "2026-01-15" },
              { label: "Email", value: currentUser?.email },
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 + index * 0.05 }}
                className="p-4 bg-slate-50 dark:bg-slate-800 rounded-lg"
              >
                <p className="text-sm text-slate-600 dark:text-slate-400 mb-1">
                  {item.label}
                </p>
                <p className="font-semibold text-slate-900 dark:text-white">
                  {item.value || "N/A"}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </main>
  )
}
