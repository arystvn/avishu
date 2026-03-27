import * as React from 'react'
import { Badge } from '../../components/ui/Badge'
import { Button } from '../../components/ui/Button'
import { Divider } from '../../components/ui/Divider'
import { Modal } from '../../components/ui/Modal'
import { listenToAllOrders, setOrderStatus } from '../../firebase/firestore'
import { useOrderStore, type Order, type OrderStatus } from '../../stores/orderStore'

function nextStatus(status: OrderStatus): OrderStatus {
  if (status === 'placed') return 'tailoring'
  if (status === 'tailoring') return 'ready'
  return 'ready'
}

function nowTime() {
  return new Intl.DateTimeFormat(undefined, { hour: '2-digit', minute: '2-digit' }).format(new Date())
}

export function ProductionApp() {
  const orders = useOrderStore((s) => s.orders)
  const setOrders = useOrderStore((s) => s.setOrders)
  const [time, setTime] = React.useState(nowTime())
  const [active, setActive] = React.useState<Order | null>(null)

  React.useEffect(() => {
    const unsub = listenToAllOrders(setOrders)
    return () => unsub()
  }, [setOrders])

  React.useEffect(() => {
    const id = window.setInterval(() => setTime(nowTime()), 1000)
    return () => window.clearInterval(id)
  }, [])

  return (
    <div className="min-h-[100svh] bg-white text-black">
      <div className="px-14 py-12">
        <header className="flex items-end justify-between gap-10">
          <div>
            <div className="text-[34px] font-semibold uppercase tracking-wider leading-tight">
              PRODUCTION QUEUE
            </div>
            <div className="mt-4 text-[14px] font-medium uppercase tracking-wider text-[#888888]">
              {time}
            </div>
          </div>
          <div className="text-[12px] font-medium uppercase tracking-wider text-[#AAAAAA]">
            AVISHU WORKSHOP
          </div>
        </header>

        <div className="mt-12">
          <Divider />
        </div>

        <main className="mt-10">
          <div className="divide-y divide-[#E0E0E0]">
            {orders.map((o, idx) => (
              <button
                key={o.id}
                className="w-full text-left py-10"
                onClick={() => setActive(o)}
              >
                <div className="flex items-center justify-between gap-10">
                  <div className="w-[160px] shrink-0 text-[48px] font-semibold leading-none text-[#AAAAAA]">
                    #{String(idx + 1).padStart(3, '0')}
                  </div>

                  <div className="min-w-0 flex-1">
                    <div className="text-[24px] font-semibold uppercase tracking-wider text-black truncate">
                      {o.items?.[0]?.name ?? 'ORDER'}
                    </div>
                    <div className="mt-3 text-[16px] font-medium text-black">
                      QTY {o.items?.reduce((sum, it) => sum + (it.qty || 0), 0) ?? 0} ·{' '}
                      <span className="uppercase tracking-wider">{o.clientName}</span>
                    </div>
                  </div>

                  <div className="shrink-0 text-right">
                    <div className="flex justify-end">
                      {o.status === 'placed' ? (
                        <Badge variant="solid">PLACED</Badge>
                      ) : o.status === 'tailoring' ? (
                        <Badge variant="muted">TAILORING</Badge>
                      ) : (
                        <Badge variant="outline">READY</Badge>
                      )}
                    </div>
                    <div className="mt-6 text-[11px] font-medium uppercase tracking-wider text-[#888888]">
                      PRIORITY STANDARD
                    </div>
                  </div>
                </div>

                <div className="mt-8 h-px w-full bg-[#E0E0E0]">
                  <div
                    className={[
                      'h-px bg-black',
                      o.status === 'placed' ? 'w-[33%]' : o.status === 'tailoring' ? 'w-[66%]' : 'w-full',
                    ].join(' ')}
                  />
                </div>
              </button>
            ))}

            {orders.length === 0 ? (
              <div className="py-20 text-center text-[12px] font-medium uppercase tracking-wider text-[#888888]">
                QUEUE EMPTY
              </div>
            ) : null}
          </div>
        </main>
      </div>

      <Modal open={!!active} onClose={() => setActive(null)} className="p-14">
        <div className="flex items-start justify-between">
          <div className="text-[12px] font-medium uppercase tracking-wider text-[#888888]">
            ACTIVE TASK
          </div>
          <button
            className="text-[12px] font-medium uppercase tracking-wider text-black"
            onClick={() => setActive(null)}
          >
            CLOSE
          </button>
        </div>

        <div className="mt-16 text-center">
          <div className="text-[40px] font-semibold uppercase tracking-wider leading-tight text-black">
            {active?.items?.[0]?.name ?? 'ORDER'}
          </div>
          <div className="mt-8 text-[18px] font-normal text-black">
            CLIENT: <span className="font-medium uppercase tracking-wider">{active?.clientName ?? '—'}</span>
          </div>
          <div className="mt-4 text-[18px] font-normal text-black">
            ITEMS: {active?.items?.map((it) => `${it.name} × ${it.qty}`).join(' · ') ?? '—'}
          </div>
        </div>

        <div className="mt-16">
          <Divider />
        </div>

        <div className="fixed inset-x-0 bottom-0 bg-white">
          <div className="px-14 pb-14 pt-8">
            <Button
              size="xl"
              fullWidth
              onClick={async () => {
                if (!active) return
                await setOrderStatus(active.id, nextStatus(active.status))
                setActive(null)
              }}
            >
              COMPLETE STAGE
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  )
}

