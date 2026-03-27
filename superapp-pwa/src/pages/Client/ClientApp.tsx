import * as React from 'react'
import { ShoppingBag } from 'lucide-react'
import { Badge } from '../../components/ui/Badge'
import { Button } from '../../components/ui/Button'
import { Divider } from '../../components/ui/Divider'
import { Modal } from '../../components/ui/Modal'

type ProductStatus = 'IN STOCK' | 'PRE-ORDER'
type Product = { id: string; name: string; price: number; status: ProductStatus }

const products: Product[] = [
  { id: 'P-001', name: 'LEATHER COAT', price: 3200, status: 'PRE-ORDER' },
  { id: 'P-002', name: 'TAILORED TROUSERS', price: 980, status: 'IN STOCK' },
  { id: 'P-003', name: 'SILK SHIRT', price: 640, status: 'IN STOCK' },
  { id: 'P-004', name: 'CASHMERE SCARF', price: 420, status: 'PRE-ORDER' },
]

export function ClientApp() {
  const [tab, setTab] = React.useState<'HOME' | 'MY ORDERS'>('HOME')
  const [cartCount, setCartCount] = React.useState(0)
  const [active, setActive] = React.useState<Product | null>(null)
  const [readyByDate, setReadyByDate] = React.useState('')

  return (
    <div className="min-h-[100svh] bg-white text-black">
      <div className="mx-auto w-full max-w-[480px] px-6">
        <header className="pt-10">
          <div className="flex items-center justify-between">
            <div className="text-sm font-medium uppercase tracking-wider">AVISHU</div>
            <div className="relative">
              <ShoppingBag className="h-5 w-5 text-black" aria-hidden="true" />
              {cartCount > 0 ? (
                <div className="absolute -right-2 -top-2 h-5 min-w-5 rounded-full bg-black px-1 text-center text-[11px] leading-5 text-white">
                  {cartCount}
                </div>
              ) : null}
            </div>
          </div>
          <div className="mt-8">
            <Divider />
          </div>
          <div className="mt-8 flex gap-8">
            <button
              className={
                tab === 'HOME'
                  ? 'text-xs font-medium uppercase tracking-wider text-black'
                  : 'text-xs font-medium uppercase tracking-wider text-[#888888]'
              }
              onClick={() => setTab('HOME')}
            >
              HOME
            </button>
            <button
              className={
                tab === 'MY ORDERS'
                  ? 'text-xs font-medium uppercase tracking-wider text-black'
                  : 'text-xs font-medium uppercase tracking-wider text-[#888888]'
              }
              onClick={() => setTab('MY ORDERS')}
            >
              MY ORDERS
            </button>
          </div>
        </header>

        {tab === 'HOME' ? (
          <main className="pb-24">
            <section className="mt-12 bg-black px-6 py-10">
              <div className="text-[14px] font-medium uppercase tracking-wider text-white">
                NEW COLLECTION / SS 2025
              </div>
              <div className="mt-4 text-sm font-normal text-[#AAAAAA]">
                Editorial pieces. Strict silhouettes. Zero noise.
              </div>
            </section>

            <section className="mt-16">
              <div className="text-xs font-medium uppercase tracking-wider text-black">
                CATALOGUE
              </div>
              <div className="mt-8 border-t border-[#E0E0E0]">
                <div className="grid grid-cols-2">
                  {products.map((p, idx) => (
                    <button
                      key={p.id}
                      className={[
                        'text-left',
                        'border-b border-[#E0E0E0]',
                        idx % 2 === 0 ? 'border-r border-[#E0E0E0]' : '',
                      ].join(' ')}
                      onClick={() => {
                        setActive(p)
                        setReadyByDate('')
                      }}
                    >
                      <div className="aspect-[4/5] w-full bg-black" />
                      <div className="px-4 py-5">
                        <div className="text-[12px] font-medium uppercase tracking-wider text-black">
                          {p.name}
                        </div>
                        <div className="mt-2 flex items-center justify-between gap-3">
                          <div className="text-sm font-normal text-black">${p.price}</div>
                          <Badge variant={p.status === 'IN STOCK' ? 'muted' : 'outline'}>
                            {p.status}
                          </Badge>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </section>
          </main>
        ) : (
          <main className="pb-24">
            <section className="mt-14">
              <div className="text-xs font-medium uppercase tracking-wider text-black">
                MY ORDERS
              </div>
              <div className="mt-10 border-t border-[#E0E0E0] pt-10">
                <div className="text-[11px] font-medium uppercase tracking-wider text-[#888888]">
                  ACTIVE ORDER
                </div>
                <div className="mt-8 flex items-center justify-between">
                  {(['PLACED', 'TAILORING', 'READY'] as const).map((step, i) => {
                    const activeIndex = 1
                    const isPast = i < activeIndex
                    const isCurrent = i === activeIndex
                    return (
                      <div key={step} className="flex flex-1 items-center">
                        <div
                          className={[
                            'h-3 w-3 rounded-full border',
                            isCurrent ? 'bg-black border-black' : isPast ? 'bg-[#888888] border-[#888888]' : 'bg-white border-[#E0E0E0]',
                          ].join(' ')}
                        />
                        <div
                          className={[
                            'ml-3 text-[11px] font-medium uppercase tracking-wider',
                            isCurrent ? 'text-black' : isPast ? 'text-[#888888]' : 'text-[#AAAAAA]',
                          ].join(' ')}
                        >
                          {step}
                        </div>
                        {i < 2 ? <div className="mx-4 h-px flex-1 bg-[#E0E0E0]" /> : null}
                      </div>
                    )
                  })}
                </div>
              </div>
            </section>

            <section className="mt-16 border-t border-[#E0E0E0] pt-10">
              <div className="text-xs font-medium uppercase tracking-wider text-black">
                LOYALTY PROGRAM
              </div>
              <div className="mt-10">
                <div className="h-px w-full bg-[#E0E0E0]">
                  <div className="h-px w-[55%] bg-black" />
                </div>
                <div className="mt-6 text-[11px] font-medium uppercase tracking-wider text-[#888888]">
                  120 POINTS UNTIL NEXT TIER
                </div>
              </div>
            </section>
          </main>
        )}
      </div>

      <Modal open={!!active} onClose={() => setActive(null)} className="p-6">
        <div className="flex items-start justify-between">
          <div className="text-[11px] font-medium uppercase tracking-wider text-[#888888]">
            PRODUCT
          </div>
          <button
            className="text-[11px] font-medium uppercase tracking-wider text-black"
            onClick={() => setActive(null)}
          >
            CLOSE
          </button>
        </div>

        <div className="mt-10">
          <div className="text-[28px] font-medium uppercase tracking-wider text-black">
            {active?.name ?? ''}
          </div>
          <div className="mt-4 flex items-center justify-between">
            <div className="text-lg font-normal text-black">${active?.price ?? 0}</div>
            {active ? (
              <Badge variant={active.status === 'IN STOCK' ? 'muted' : 'outline'}>{active.status}</Badge>
            ) : null}
          </div>
        </div>

        <div className="mt-10">
          <Divider />
        </div>

        {active?.status === 'PRE-ORDER' ? (
          <div className="mt-10">
            <div className="text-[11px] uppercase tracking-wider text-[#888888]">READY BY</div>
            <input
              type="date"
              value={readyByDate}
              onChange={(e) => setReadyByDate(e.target.value)}
              className="mt-3 w-full rounded-none border-0 border-b border-black bg-transparent px-0 py-3 text-base font-normal text-black outline-none"
            />
            <div className="mt-12 space-y-3">
              <Button
                fullWidth
                onClick={() => {
                  if (!readyByDate) return
                  setActive(null)
                }}
                disabled={!readyByDate}
              >
                PLACE PRE-ORDER
              </Button>
            </div>
          </div>
        ) : (
          <div className="mt-12 space-y-3">
            <Button
              fullWidth
              onClick={() => {
                setCartCount((c) => c + 1)
                setActive(null)
              }}
            >
              ADD TO CART
            </Button>
            <Button fullWidth variant="outline" onClick={() => setActive(null)}>
              BUY NOW
            </Button>
          </div>
        )}
      </Modal>
    </div>
  )
}

