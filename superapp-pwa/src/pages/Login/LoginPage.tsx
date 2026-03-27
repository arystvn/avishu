import * as React from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '../../components/ui/Button'
import { Divider } from '../../components/ui/Divider'
import { Input } from '../../components/ui/Input'
import type { UserRole } from '../../components/AuthGuard'
import { signIn } from '../../firebase/auth'
import { useAuthStore } from '../../stores/authStore'

function roleHome(role: UserRole) {
  if (role === 'client') return '/client'
  if (role === 'franchisee') return '/franchisee'
  return '/production'
}

export function LoginPage() {
  const navigate = useNavigate()
  const role = useAuthStore((s) => s.role)

  const [email, setEmail] = React.useState('')
  const [password, setPassword] = React.useState('')
  const [error, setError] = React.useState<string | null>(null)
  const [loading, setLoading] = React.useState(false)

  React.useEffect(() => {
    if (!role) return
    navigate(roleHome(role), { replace: true })
  }, [role, navigate])

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError(null)
    setLoading(true)
    try {
      await signIn(email.trim(), password)
    } catch {
      setError('INVALID CREDENTIALS')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-[100svh] bg-white text-black flex items-center justify-center px-8">
      <div className="w-full max-w-sm">
        <div className="text-center">
          <div className="text-[44px] font-light uppercase tracking-widest">AVISHU</div>
          <div className="mt-10">
            <Divider />
          </div>
        </div>

        <form className="mt-14" onSubmit={onSubmit}>
          <div className="space-y-10">
            <div>
              <div className="text-[11px] uppercase tracking-wider text-[#888888]">EMAIL</div>
              <div className="mt-3">
                <Input
                  autoComplete="email"
                  placeholder="ENTER EMAIL"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>

            <div>
              <div className="text-[11px] uppercase tracking-wider text-[#888888]">PASSWORD</div>
              <div className="mt-3">
                <Input
                  type="password"
                  autoComplete="current-password"
                  placeholder="ENTER PASSWORD"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>
          </div>

          <div className="mt-14">
            <Button type="submit" fullWidth disabled={loading || !email || !password}>
              {loading ? 'ENTERING' : 'ENTER'}
            </Button>
            {error ? (
              <div className="mt-6 text-center text-[11px] uppercase tracking-wider text-[#888888]">
                {error}
              </div>
            ) : null}
          </div>
        </form>

        <div className="mt-20 text-center text-[10px] uppercase tracking-wider text-[#AAAAAA]">
          <div>SECURE ACCESS PORTAL</div>
          <div className="mt-2">AUTHORIZED USERS ONLY</div>
        </div>
      </div>
    </div>
  )
}

