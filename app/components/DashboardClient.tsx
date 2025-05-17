'use client'

import { useCallback, useEffect, useMemo, useState } from 'react'
import { supabase } from '../lib/supabase'
import InvestmentTable from './InvestmentTable'
import MetricCard from './MetricCard'
import SimulatePayoutButton from './SimulatePayoutButton'
import { Investment, InvestorSummary } from '../types'
import { useSearchParams } from 'next/navigation'

  

export default function DashboardClient() {

  const searchParams = useSearchParams();
  

  const INVESTOR_ID = useMemo(() => searchParams.get('investorId'), [searchParams])

  const [summary, setSummary] = useState<InvestorSummary | null>(null)
  const [investments, setInvestments] = useState<Investment[]>([])
  const [loading, setLoading] = useState(true)

   const fetchData = useCallback(async () => {
    if (!INVESTOR_ID) return;

    setLoading(true);

    const { data: summaryData } = await supabase
      .from('investor_summary')
      .select('*')
      .eq('investor_id', INVESTOR_ID)
      .single();

    const { data: investmentData } = await supabase
      .from('investments')
      .select('*')
      .eq('investor_id', INVESTOR_ID)
      .order('next_distribution_date', { ascending: true });

    setSummary(summaryData);
    setInvestments(investmentData || []);
    setLoading(false);
  }, [INVESTOR_ID]); // 👈 Sadece INVESTOR_ID değişince yeniden oluşturulur

  useEffect(() => {
    fetchData();
  }, [fetchData]); 

  useEffect(() => {
    fetchData()
  }, [fetchData])

  return (
    <div className="space-y-8">
      <SimulatePayoutButton onComplete={fetchData} investorId={INVESTOR_ID} />

      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <MetricCard title="Total Invested" value={summary?.total_invested_amount ?? 0} />
            <MetricCard title="Portfolio Value" value={summary?.portfolio_value ?? 0} />
            <MetricCard title="Distributions Received" value={summary?.distributions_received ?? 0} />
            <MetricCard title="Outstanding Commitments" value={summary?.outstanding_commitments ?? 0} />
          </div>
          <InvestmentTable investments={investments} />
        </>
      )}
    </div>
  )
}
