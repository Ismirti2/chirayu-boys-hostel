"use client"

import { useRouter } from "next/navigation"
import { useAuthStore, useDataStore } from "@/lib/store"
import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import {
  LogOut,
  Users,
  Home,
  MessageSquare,
  BellAlert,
  Plus,
} from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Link from "next/link"

export default function AdminDashboard() {
  const router = useRouter()
  const { isAuthenticated, userType, logout } = useAuthStore()
  const { students, rooms, enquiries, complaints, notices } = useDataStore()
  const [stats, setStats] = useState({ students: 0, rooms: 0, enquiries: 0 })

  useEffect(() => {
    if (!isAuthenticated || userType !== "admin") {
      router.push("/admin-login")
    }
    setStats({
      students: students.length,
      rooms: rooms.filter((r) => r.occupied).length,
      enquiries: enquiries.length,
    })
  }, [isAuthenticated, userType, students, rooms, enquiries, router])

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
              <p className="text-xs text-slate-600 dark:text-slate-400">Admin Panel</p>
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
        {/* Stats */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          {[
            { icon: Users, label: "Total Students", value: stats.students },
            { icon: Home, label: "Occupied Rooms", value: stats.rooms },
            { icon: MessageSquare, label: "New Enquiries", value: stats.enquiries },
          ].map((stat, index) => {
            const Icon = stat.icon
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-slate-600 dark:text-slate-400 text-sm mb-1">
                      {stat.label}
                    </p>
                    <p className="text-3xl font-bold text-chirayu-blue dark:text-chirayu-teal">
                      {stat.value}
                    </p>
                  </div>
                  <div className="w-12 h-12 bg-gradient-to-br from-chirayu-blue/10 to-chirayu-teal/10 rounded-lg flex items-center justify-center">
                    <Icon className="w-6 h-6 text-chirayu-blue dark:text-chirayu-teal" />
                  </div>
                </div>
              </motion.div>
            )
          })}
        </div>

        {/* Tabs */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-6"
        >
          <Tabs defaultValue="students" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="students">Students</TabsTrigger>
              <TabsTrigger value="rooms">Rooms</TabsTrigger>
              <TabsTrigger value="enquiries">Enquiries</TabsTrigger>
              <TabsTrigger value="notices">Notices</TabsTrigger>
            </TabsList>

            {/* Students Tab */}
            <TabsContent value="students" className="space-y-4 mt-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold">Students List</h3>
                <Button size="sm" className="flex items-center gap-2">
                  <Plus className="w-4 h-4" />
                  Add Student
                </Button>
              </div>
              <div className="space-y-2">
                {students.map((student) => (
                  <motion.div
                    key={student.id}
                    whileHover={{ x: 5 }}
                    className="p-4 bg-slate-50 dark:bg-slate-800 rounded-lg flex justify-between items-center"
                  >
                    <div>
                      <p className="font-semibold">{student.name}</p>
                      <p className="text-sm text-slate-600 dark:text-slate-400">
                        {student.studentId}
                      </p>
                    </div>
                    <span className="px-3 py-1 bg-chirayu-teal/10 text-chirayu-teal rounded-full text-sm font-medium">
                      {student.roomNumber}
                    </span>
                  </motion.div>
                ))}
              </div>
            </TabsContent>

            {/* Rooms Tab */}
            <TabsContent value="rooms" className="space-y-4 mt-6">
              <h3 className="text-lg font-semibold mb-4">Rooms Status</h3>
              <div className="space-y-2">
                {rooms.map((room) => (
                  <motion.div
                    key={room.id}
                    whileHover={{ x: 5 }}
                    className="p-4 bg-slate-50 dark:bg-slate-800 rounded-lg flex justify-between items-center"
                  >
                    <div>
                      <p className="font-semibold">Room {room.roomNumber}</p>
                      <p className="text-sm text-slate-600 dark:text-slate-400">
                        Type: {room.type === "1" ? "Single" : room.type === "2" ? "Double" : "Triple"}
                      </p>
                    </div>
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-medium ${
                        room.occupied
                          ? "bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400"
                          : "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400"
                      }`}
                    >
                      {room.occupied ? "Occupied" : "Available"}
                    </span>
                  </motion.div>
                ))}
              </div>
            </TabsContent>

            {/* Enquiries Tab */}
            <TabsContent value="enquiries" className="space-y-4 mt-6">
              <h3 className="text-lg font-semibold mb-4">Recent Enquiries</h3>
              <div className="space-y-2">
                {enquiries.length === 0 ? (
                  <p className="text-slate-600 dark:text-slate-400 text-center py-8">
                    No enquiries yet
                  </p>
                ) : (
                  enquiries.map((enquiry) => (
                    <motion.div
                      key={enquiry.id}
                      whileHover={{ x: 5 }}
                      className="p-4 bg-slate-50 dark:bg-slate-800 rounded-lg"
                    >
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <p className="font-semibold">{enquiry.name}</p>
                          <p className="text-sm text-slate-600 dark:text-slate-400">
                            {enquiry.email}
                          </p>
                        </div>
                        <span className="px-2 py-1 bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400 rounded text-xs font-medium">
                          {enquiry.status}
                        </span>
                      </div>
                      <p className="text-sm text-slate-600 dark:text-slate-400">
                        {enquiry.message}
                      </p>
                    </motion.div>
                  ))
                )}
              </div>
            </TabsContent>

            {/* Notices Tab */}
            <TabsContent value="notices" className="space-y-4 mt-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold">Notices</h3>
                <Button size="sm" className="flex items-center gap-2">
                  <Plus className="w-4 h-4" />
                  Add Notice
                </Button>
              </div>
              <div className="space-y-2">
                {notices.map((notice) => (
                  <motion.div
                    key={notice.id}
                    whileHover={{ x: 5 }}
                    className="p-4 bg-slate-50 dark:bg-slate-800 rounded-lg"
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="font-semibold">{notice.title}</p>
                        <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                          {notice.content}
                        </p>
                      </div>
                      <span
                        className={`px-2 py-1 rounded text-xs font-medium whitespace-nowrap ml-4 ${
                          notice.priority === "high"
                            ? "bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400"
                            : notice.priority === "medium"
                            ? "bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400"
                            : "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400"
                        }`}
                      >
                        {notice.priority}
                      </span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </motion.div>
      </div>
    </main>
  )
}
