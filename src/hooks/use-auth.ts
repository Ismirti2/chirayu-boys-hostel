import { useEffect, useState } from "react"
import { useAuthStore } from "@/lib/store"

export function useAuth() {
  const [hydrated, setHydrated] = useState(false)
  const store = useAuthStore()

  useEffect(() => {
    setHydrated(true)
  }, [])

  if (!hydrated) {
    return {
      ...store,
      hydrated: false,
    }
  }

  return {
    ...store,
    hydrated: true,
  }
}
