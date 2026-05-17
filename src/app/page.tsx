"use client"

import { useState } from "react"
import { Navbar } from "@/components/landing/navbar"
import { Hero } from "@/components/landing/hero"
import { Facilities } from "@/components/landing/facilities"
import { Rooms } from "@/components/landing/rooms"
import { Menu } from "@/components/landing/menu"
import { Colleges } from "@/components/landing/colleges"
import { Footer } from "@/components/landing/footer"
import { EnquiryModal } from "@/components/landing/enquiry-modal"
import { ThemeToggle } from "@/components/theme-toggle"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"

export default function Home() {
  const [enquiryOpen, setEnquiryOpen] = useState(false)

  return (
    <main className="bg-white dark:bg-slate-950">
      <Navbar onEnquireClick={() => setEnquiryOpen(true)} />
      <Hero onEnquireClick={() => setEnquiryOpen(true)} />
      <Facilities />
      <Rooms onEnquireClick={() => setEnquiryOpen(true)} />
      <Menu />
      <Colleges />

      {/* Floating Action Bar */}
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 1 }}
        className="fixed bottom-20 left-0 right-0 z-40 flex justify-center px-4 pointer-events-none"
      >
        <div className="flex gap-3 pointer-events-auto">
          <Link href="/student-login">
            <Button variant="outline">Student Portal</Button>
          </Link>
          <Link href="/admin-login">
            <Button variant="outline">Admin Panel</Button>
          </Link>
        </div>
      </motion.div>

      <Footer />
      <EnquiryModal isOpen={enquiryOpen} onClose={() => setEnquiryOpen(false)} />
      <ThemeToggle />
    </main>
  )
}
