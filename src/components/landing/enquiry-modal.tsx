"use client"

import { motion, AnimatePresence } from "framer-motion"
import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useDataStore } from "@/lib/store"
import { Mail, Phone, CheckCircle } from "lucide-react"

interface EnquiryModalProps {
  isOpen: boolean
  onClose: () => void
}

export function EnquiryModal({ isOpen, onClose }: EnquiryModalProps) {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    roomType: "2",
    checkInDate: "",
    message: "",
  })
  const [submitted, setSubmitted] = useState(false)
  const { addEnquiry } = useDataStore()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // Add enquiry to store
    addEnquiry({
      id: Date.now().toString(),
      ...formData,
      status: "new",
      createdAt: new Date().toISOString(),
    })

    // WhatsApp integration
    const whatsappMessage = `Hello, I'm interested in ${formData.roomType === "1" ? "Single" : formData.roomType === "2" ? "Double" : "Triple"} seater room. Name: ${formData.name}, Phone: ${formData.phone}, Email: ${formData.email}`
    const whatsappLink = `https://wa.me/9779804396180?text=${encodeURIComponent(whatsappMessage)}`
    window.open(whatsappLink, "_blank")

    // Show success state
    setSubmitted(true)
    setTimeout(() => {
      setSubmitted(false)
      setFormData({
        name: "",
        phone: "",
        email: "",
        roomType: "2",
        checkInDate: "",
        message: "",
      })
      onClose()
    }, 2000)
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Enquire Now</DialogTitle>
          <DialogDescription>
            Fill in your details and we'll get back to you shortly
          </DialogDescription>
        </DialogHeader>

        <AnimatePresence>
          {!submitted ? (
            <motion.form
              key="form"
              onSubmit={handleSubmit}
              initial={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="space-y-4"
            >
              {/* Name */}
              <div className="space-y-2">
                <Label htmlFor="name">Full Name *</Label>
                <Input
                  id="name"
                  name="name"
                  placeholder="John Doe"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="h-9"
                />
              </div>

              {/* Email */}
              <div className="space-y-2">
                <Label htmlFor="email">Email *</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="john@example.com"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="h-9"
                />
              </div>

              {/* Phone */}
              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number *</Label>
                <Input
                  id="phone"
                  name="phone"
                  placeholder="9841234567"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  className="h-9"
                />
              </div>

              {/* Room Type */}
              <div className="space-y-2">
                <Label htmlFor="roomType">Preferred Room Type *</Label>
                <select
                  id="roomType"
                  name="roomType"
                  value={formData.roomType}
                  onChange={handleChange}
                  className="w-full h-9 px-3 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 text-sm"
                >
                  <option value="1">Single Seater (Rs. 5000)</option>
                  <option value="2">Double Seater (Rs. 8000)</option>
                  <option value="3">Triple Seater (Rs. 10500)</option>
                </select>
              </div>

              {/* Check-in Date */}
              <div className="space-y-2">
                <Label htmlFor="checkInDate">Expected Check-in Date *</Label>
                <Input
                  id="checkInDate"
                  name="checkInDate"
                  type="date"
                  value={formData.checkInDate}
                  onChange={handleChange}
                  required
                  className="h-9"
                />
              </div>

              {/* Message */}
              <div className="space-y-2">
                <Label htmlFor="message">Message</Label>
                <textarea
                  id="message"
                  name="message"
                  placeholder="Tell us more about yourself..."
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 text-sm resize-none h-24"
                />
              </div>

              {/* Submit Button */}
              <Button type="submit" className="w-full" size="sm">
                Submit Enquiry
              </Button>

              <p className="text-xs text-slate-600 dark:text-slate-400 text-center">
                We'll contact you via WhatsApp and Email
              </p>
            </motion.form>
          ) : (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col items-center justify-center py-8"
            >
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 0.5 }}
              >
                <CheckCircle className="w-16 h-16 text-chirayu-teal mb-4" />
              </motion.div>
              <h3 className="text-lg font-semibold text-chirayu-blue dark:text-chirayu-teal mb-2">
                Thank You!
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-400 text-center">
                Your enquiry has been submitted successfully. We'll contact you soon via WhatsApp.
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </DialogContent>
    </Dialog>
  )
}
