"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useAuthStore } from "@/lib/store"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { motion } from "framer-motion"
import Link from "next/link"
import { AlertCircle } from "lucide-react"

export default function StudentLogin() {
  const router = useRouter()
  const { login } = useAuthStore()
  const [credentials, setCredentials] = useState({ studentId: "", password: "" })
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setCredentials((prev) => ({ ...prev, [name]: value }))
    setError("")
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    setTimeout(() => {
      const success = login("student", credentials)
      if (success) {
        router.push("/student-dashboard")
      } else {
        setError(
          "Invalid credentials. Try Student ID: CH-2026-001, Password: student123"
        )
      }
      setLoading(false)
    }, 800)
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-950 dark:to-chirayu-dark flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        {/* Card */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-xl p-8">
          {/* Logo */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.1 }}
            className="flex justify-center mb-8"
          >
            <div className="w-12 h-12 bg-gradient-to-br from-chirayu-blue to-chirayu-teal rounded-xl flex items-center justify-center text-white font-bold text-lg">
              CH
            </div>
          </motion.div>

          {/* Title */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-center mb-8"
          >
            <h1 className="text-2xl font-bold text-chirayu-blue dark:text-chirayu-teal mb-2">
              Student Portal
            </h1>
            <p className="text-sm text-slate-600 dark:text-slate-400">
              Access your hostel account
            </p>
          </motion.div>

          {/* Form */}
          <motion.form
            onSubmit={handleSubmit}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="space-y-5"
          >
            {/* Error Alert */}
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-800 rounded-lg p-4 flex gap-3"
              >
                <AlertCircle className="w-5 h-5 text-red-600 dark:text-red-400 flex-shrink-0" />
                <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
              </motion.div>
            )}

            {/* Student ID */}
            <div className="space-y-2">
              <Label htmlFor="studentId" className="text-sm font-medium">
                Student ID
              </Label>
              <Input
                id="studentId"
                name="studentId"
                placeholder="e.g., CH-2026-001"
                value={credentials.studentId}
                onChange={handleChange}
                required
                className="h-10"
              />
            </div>

            {/* Password */}
            <div className="space-y-2">
              <Label htmlFor="password" className="text-sm font-medium">
                Password
              </Label>
              <Input
                id="password"
                name="password"
                type="password"
                placeholder="Enter your password"
                value={credentials.password}
                onChange={handleChange}
                required
                className="h-10"
              />
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              disabled={loading}
              className="w-full h-10 font-medium"
            >
              {loading ? "Logging in..." : "Login"}
            </Button>
          </motion.form>

          {/* Divider */}
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-slate-200 dark:border-slate-700"></div>
            </div>
            <div className="relative flex justify-center text-xs">
              <span className="px-2 bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400">
                Other options
              </span>
            </div>
          </div>

          {/* Links */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="space-y-3 text-center text-sm"
          >
            <Link href="/" className="block text-chirayu-blue dark:text-chirayu-teal hover:underline">
              Back to Home
            </Link>
            <Link href="/admin-login" className="block text-slate-600 dark:text-slate-400 hover:text-chirayu-blue dark:hover:text-chirayu-teal">
              Admin Login?
            </Link>
          </motion.div>

          {/* Demo Credentials */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mt-8 p-4 bg-slate-100 dark:bg-slate-800 rounded-lg"
          >
            <p className="text-xs font-semibold text-slate-900 dark:text-white mb-2">
              Demo Credentials:
            </p>
            <p className="text-xs text-slate-600 dark:text-slate-400 mb-1">
              <span className="font-medium">ID:</span> CH-2026-001
            </p>
            <p className="text-xs text-slate-600 dark:text-slate-400">
              <span className="font-medium">Password:</span> student123
            </p>
          </motion.div>
        </div>
      </motion.div>
    </main>
  )
}
