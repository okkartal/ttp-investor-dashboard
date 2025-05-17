import { Suspense } from 'react'
import DashboardClient from '../components/DashboardClient'

export default function DashboardPage() {
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Investor Dashboard</h1>
      <Suspense fallback={<div>Loading...</div>}>
      <DashboardClient />
    </Suspense>
    </div>
  )
}