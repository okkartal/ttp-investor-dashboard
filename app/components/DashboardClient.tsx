'use client'

import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'
import InvestmentTable from './InvestmentTable'
import MetricCard from './MetricCard'
import SimulatePayoutButton from './SimulatePayoutButton'

const INVESTOR_ID = process.env.NEXT_PUBLIC_INVESTOR_ID as string

export default function DashboardClient() {
  const [summary, setSummary] = useState<any | null>(null)
  const [investments, setInvestments] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  const fetchData = async () => {
    setLoading(true)

    const { data: summaryData } = await supabase
      .from('investor_summary')
      .select('*')
      .eq('investor_id', INVESTOR_ID)
      .single()

    const { data: investmentData } = await supabase
      .from('investments')
      .select('*')
      .eq('investor_id', INVESTOR_ID)
      .order('next_distribution_date', { ascending: true })

    setSummary(summaryData)
    setInvestments(investmentData || [])
    setLoading(false)
  }

  useEffect(() => {
    fetchData()
  }, [])

  return (
    <div className="space-y-8">
      <SimulatePayoutButton onComplete={fetchData} />

      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <MetricCard title="Total Invested" value={summary.total_invested_amount} />
            <MetricCard title="Portfolio Value" value={summary.portfolio_value} />
            <MetricCard title="Distributions Received" value={summary.distributions_received} />
            <MetricCard title="Outstanding Commitments" value={summary.outstanding_commitments} />
          </div>
          <InvestmentTable investments={investments} />
        </>
      )}
    </div>
  )
}
