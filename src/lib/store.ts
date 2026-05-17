import { create } from "zustand"

export interface Student {
  id: string
  studentId: string
  name: string
  email: string
  phone: string
  roomType: "1" | "2" | "3"
  roomNumber?: string
  checkInDate: string
  emergencyContact: string
  collegeId: string
  parentName: string
  parentPhone: string
  address: string
}

export interface Room {
  id: string
  roomNumber: string
  type: "1" | "2" | "3"
  capacity: number
  occupants: number
  occupied: boolean
  monthlyFee: number
  occupied_by: string[]
}

export interface Enquiry {
  id: string
  name: string
  phone: string
  email: string
  roomType: string
  checkInDate: string
  message: string
  status: "new" | "contacted" | "converted" | "rejected"
  createdAt: string
}

export interface Notice {
  id: string
  title: string
  content: string
  priority: "low" | "medium" | "high"
  createdAt: string
  createdBy: string
}

export interface Complaint {
  id: string
  studentId: string
  title: string
  description: string
  category: string
  status: "open" | "in-progress" | "resolved"
  createdAt: string
}

export interface AuthState {
  isAuthenticated: boolean
  userType: "student" | "admin" | null
  currentUser: Student | { username: string } | null
  login: (userType: "student" | "admin", credentials: any) => boolean
  logout: () => void
}

export interface DataStore {
  students: Student[]
  rooms: Room[]
  enquiries: Enquiry[]
  notices: Notice[]
  complaints: Complaint[]
  addStudent: (student: Student) => void
  updateStudent: (id: string, student: Partial<Student>) => void
  deleteStudent: (id: string) => void
  addEnquiry: (enquiry: Enquiry) => void
  updateEnquiryStatus: (id: string, status: string) => void
  addNotice: (notice: Notice) => void
  addComplaint: (complaint: Complaint) => void
  updateComplaintStatus: (id: string, status: string) => void
}

export const useAuthStore = create<AuthState>((set) => ({
  isAuthenticated: false,
  userType: null,
  currentUser: null,
  login: (userType, credentials) => {
    if (userType === "admin") {
      if (
        credentials.username === "admin" &&
        credentials.password === "chirayu123"
      ) {
        set({
          isAuthenticated: true,
          userType: "admin",
          currentUser: { username: "admin" },
        })
        return true
      }
    } else if (userType === "student") {
      if (credentials.studentId && credentials.password === "student123") {
        set({
          isAuthenticated: true,
          userType: "student",
          currentUser: {
            studentId: credentials.studentId,
            name: "John Doe",
          } as any,
        })
        return true
      }
    }
    return false
  },
  logout: () =>
    set({
      isAuthenticated: false,
      userType: null,
      currentUser: null,
    }),
}))

export const useDataStore = create<DataStore>((set) => {
  const initialState = {
    students: [
      {
        id: "1",
        studentId: "CH-2026-001",
        name: "Aman Sharma",
        email: "aman@example.com",
        phone: "9841234567",
        roomType: "2" as const,
        roomNumber: "201",
        checkInDate: "2026-01-15",
        emergencyContact: "9841234568",
        collegeId: "knc-001",
        parentName: "Ram Sharma",
        parentPhone: "9841234569",
        address: "Kathmandu",
      },
      {
        id: "2",
        studentId: "CH-2026-002",
        name: "Bikash Poudel",
        email: "bikash@example.com",
        phone: "9842234567",
        roomType: "1" as const,
        roomNumber: "105",
        checkInDate: "2026-02-01",
        emergencyContact: "9842234568",
        collegeId: "cosmic-001",
        parentName: "Mohan Poudel",
        parentPhone: "9842234569",
        address: "Bhaktapur",
      },
    ],
    rooms: [
      {
        id: "1",
        roomNumber: "101",
        type: "1" as const,
        capacity: 1,
        occupants: 1,
        occupied: true,
        monthlyFee: 5000,
        occupied_by: ["CH-2026-002"],
      },
      {
        id: "2",
        roomNumber: "201",
        type: "2" as const,
        capacity: 2,
        occupants: 1,
        occupied: true,
        monthlyFee: 8000,
        occupied_by: ["CH-2026-001"],
      },
      {
        id: "3",
        roomNumber: "301",
        type: "3" as const,
        capacity: 3,
        occupants: 0,
        occupied: false,
        monthlyFee: 10500,
        occupied_by: [],
      },
    ],
    enquiries: [],
    notices: [
      {
        id: "1",
        title: "Admission Open 2026",
        content:
          "We are happy to announce that admissions for 2026 are now open!",
        priority: "high" as const,
        createdAt: new Date().toISOString(),
        createdBy: "admin",
      },
    ],
    complaints: [],
  }

  return {
    ...initialState,
    addStudent: (student) =>
      set((state) => ({
        students: [...state.students, student],
      })),
    updateStudent: (id, updates) =>
      set((state) => ({
        students: state.students.map((s) =>
          s.id === id ? { ...s, ...updates } : s
        ),
      })),
    deleteStudent: (id) =>
      set((state) => ({
        students: state.students.filter((s) => s.id !== id),
      })),
    addEnquiry: (enquiry) =>
      set((state) => ({
        enquiries: [...state.enquiries, enquiry],
      })),
    updateEnquiryStatus: (id, status) =>
      set((state) => ({
        enquiries: state.enquiries.map((e) =>
          e.id === id ? { ...e, status: status as any } : e
        ),
      })),
    addNotice: (notice) =>
      set((state) => ({
        notices: [...state.notices, notice],
      })),
    addComplaint: (complaint) =>
      set((state) => ({
        complaints: [...state.complaints, complaint],
      })),
    updateComplaintStatus: (id, status) =>
      set((state) => ({
        complaints: state.complaints.map((c) =>
          c.id === id ? { ...c, status: status as any } : c
        ),
      })),
  }
})
