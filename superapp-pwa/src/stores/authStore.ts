import type { User } from 'firebase/auth'
import { create } from 'zustand'
import type { UserRole } from '../components/AuthGuard'

type AuthState = {
  user: User | null
  role: UserRole | null
  setUser: (user: User | null, role: UserRole | null) => void
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  role: null,
  setUser: (user, role) => set({ user, role }),
}))

