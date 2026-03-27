import * as React from 'react'
import { onAuthStateChanged, type User } from 'firebase/auth'
import { doc, getDoc } from 'firebase/firestore'
import { Navigate, useLocation } from 'react-router-dom'
import { auth, db } from '../firebase/config'
import { useAuthStore } from '../stores/authStore'

export type UserRole = 'client' | 'franchisee' | 'production'

function roleHome(role: UserRole) {
  if (role === 'client') return '/client'
  if (role === 'franchisee') return '/franchisee'
  return '/production'
}

async function fetchRole(user: User): Promise<UserRole | null> {
  const snap = await getDoc(doc(db, 'users', user.uid))
  if (!snap.exists()) return null
  const data = snap.data() as { role?: unknown }
  if (data.role === 'client' || data.role === 'franchisee' || data.role === 'production') {
    return data.role
  }
  return null
}

export function AuthGuard({
  requiredRole,
  children,
}: {
  requiredRole: UserRole
  children: React.ReactNode
}) {
  const location = useLocation()
  const setUser = useAuthStore((s) => s.setUser)
  const [status, setStatus] = React.useState<
    | { kind: 'loading' }
    | { kind: 'signedOut' }
    | { kind: 'signedIn'; role: UserRole | null }
  >({ kind: 'loading' })

  React.useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (user) => {
      if (!user) {
        setUser(null, null)
        setStatus({ kind: 'signedOut' })
        return
      }
      setStatus({ kind: 'loading' })
      const role = await fetchRole(user)
      setUser(user, role)
      setStatus({ kind: 'signedIn', role })
    })
    return () => unsub()
  }, [setUser])

  if (status.kind === 'loading') {
    return (
      <div className="min-h-[100svh] bg-white text-black flex items-center justify-center px-8">
        <div className="w-full max-w-sm">
          <div className="text-center text-xs uppercase tracking-wider text-[#AAAAAA]">
            Checking access
          </div>
          <div className="mt-6 h-px w-full bg-[#E0E0E0]" />
        </div>
      </div>
    )
  }

  if (status.kind === 'signedOut') {
    return <Navigate to="/login" replace state={{ from: location.pathname }} />
  }

  if (!status.role) {
    return <Navigate to="/login" replace />
  }

  if (status.role !== requiredRole) {
    return <Navigate to={roleHome(status.role)} replace />
  }

  return <>{children}</>
}

