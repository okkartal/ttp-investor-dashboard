'use client'

import { simulatePayout } from '@/app/actions/simulatePayout'
import { useTransition } from 'react'
import { useRouter } from 'next/navigation'

type Props = {
  onComplete: () => void,
  investorId: string | null
}

export default function SimulatePayoutButton({ onComplete, investorId }: Props) {
  const [isPending, startTransition] = useTransition()
  const router = useRouter()

  const handleLogout = () => {
   router.push('/login');
  }

  const handePayout = () => {
    startTransition(async () => {
        await simulatePayout({ investorId })
        router.refresh() // Reload the data
        onComplete()
    })
  }

  return (
    <><button
          onClick={handePayout}
          disabled={isPending}
          className="bg-green-600 text-white px-4 py-2 rounded-lg shadow hover:bg-green-700 transition disabled:opacity-50"
      >
          {isPending ? 'Processing...' : 'Simulate Payout'}
      </button><button onClick={handleLogout}
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition">
              Logout
          </button></>
  )
}
