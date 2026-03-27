import * as React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { Sidebar } from '../../components/layout/Sidebar'
import { Badge } from '../../components/ui/Badge'
import { Button } from '../../components/ui/Button'
import { Divider } from '../../components/ui/Divider'
import { listenToAllOrders } from '../../firebase/firestore'
import { useOrderStore } from '../../stores/orderStore'

function todayLabel() {
  return new Intl.DateTimeFormat(undefined, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }).format(
    new Date(),
  )
}

function DashboardPage() {
  const orders = useOrderStore((s) => s.orders)

  const revenueToday = 12450
  const planCompletion = 72
  const activeOrders = orders.length

  return (
    <div className="px-16 py-14">
      <div className="text-[28px] font-medium uppercase tracking-wider text-black">DASHBOARD</div>
      <div className="mt-3 text-[11px] font-medium uppercase tracking-wider text-[#888888]">
        {todayLabel()}
      </div>

      <div className="mt-14 border-t border-[#E0E0E0] pt-12">
        <div className="grid grid-cols-3 divide-x divide-[#E0E0E0]">
          <div className="pr-10">
            <div className="text-[44px] font-semibold leading-none text-black">${revenueToday}</div>
            <div className="mt-4 text-[11px] font-medium uppercase tracking-wider text-[#888888]">
              REVENUE TODAY
            </div>
          </div>
          <div className="px-10">
            <div className="text-[44px] font-semibold leading-none text-black">{planCompletion}%</div>
            <div className="mt-4 text-[11px] font-medium uppercase tracking-wider text-[#888888]">
              PLAN COMPLETION
            </div>
          </div>
          <div className="pl-10">
            <div className="text-[44px] font-semibold leading-none text-black">{activeOrders}</div>
            <div className="mt-4 text-[11px] font-medium uppercase tracking-wider text-[#888888]">
              ACTIVE ORDERS
            </div>
          </div>
        </div>
      </div>

      <div className="mt-14">
        <Divider />
      </div>
    </div>
  )
}

function OrdersPage() {
  const orders = useOrderStore((s) => s.orders)

  return (
    <div className="px-16 py-14">
      <div className="flex items-center justify-between">
        <div className="text-[24px] font-medium uppercase tracking-wider text-black">ORDERS</div>
        <div className="flex items-center gap-3">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-black opacity-20" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-black" />
          </span>
          <div className="text-[11px] font-medium uppercase tracking-wider text-black">LIVE</div>
        </div>
      </div>

      <div className="mt-10 border-t border-[#E0E0E0]">
        <div className="divide-y divide-[#E0E0E0]">
          {orders.map((o) => (
            <div key={o.id} className="py-10">
              <div className="flex items-start justify-between gap-10">
                <div className="min-w-0">
                  <div className="text-[11px] font-medium uppercase tracking-wider text-[#888888]">
                    #{o.id.toUpperCase()}
                  </div>
                  <div className="mt-2 text-sm font-medium uppercase tracking-wider text-black">
                    {o.clientName}
                  </div>
                  <div className="mt-4 text-sm font-normal text-black">
                    {o.items?.map((it) => `${it.name} × ${it.qty}`).join(', ') || '—'}
                  </div>
                </div>

                <div className="shrink-0 text-right">
                  <div className="flex justify-end">
                    {o.status === 'placed' ? (
                      <Badge variant="solid">NEW</Badge>
                    ) : o.status === 'tailoring' ? (
                      <Badge variant="muted">IN PROGRESS</Badge>
                    ) : (
                      <Badge variant="outline">READY</Badge>
                    )}
                  </div>
                  <div className="mt-6">
                    <Button size="md" onClick={() => {}}>
                      ACCEPT
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          ))}

          {orders.length === 0 ? (
            <div className="py-16 text-center text-[11px] font-medium uppercase tracking-wider text-[#888888]">
              NO ORDERS
            </div>
          ) : null}
        </div>
      </div>
    </div>
  )
}

function PlaceholderPage({ title }: { title: string }) {
  return (
    <div className="px-16 py-14">
      <div className="text-[24px] font-medium uppercase tracking-wider text-black">{title}</div>
      <div className="mt-10">
        <Divider />
      </div>
    </div>
  )
}

export function FranchiseeApp() {
  const setOrders = useOrderStore((s) => s.setOrders)

  React.useEffect(() => {
    const unsub = listenToAllOrders(setOrders)
    return () => unsub()
  }, [setOrders])

  return (
    <div className="min-h-[100svh] bg-white text-black flex">
      <Sidebar />
      <div className="min-w-0 flex-1">
        <Routes>
          <Route path="/" element={<DashboardPage />} />
          <Route path="/orders" element={<OrdersPage />} />
          <Route path="/analytics" element={<PlaceholderPage title="ANALYTICS" />} />
          <Route path="/settings" element={<PlaceholderPage title="SETTINGS" />} />
          <Route path="*" element={<Navigate to="/franchisee" replace />} />
        </Routes>
      </div>
    </div>
  )
}

