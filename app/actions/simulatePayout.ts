'use server'

import { supabase } from '../lib/supabase'

type Props = {
  investorId: string | null
}

export async function simulatePayout({ investorId }: Props) {
  const payoutAmount = 500

  // 1. distributions tablosundaki sayacı artıran RPC çağrısı
  await supabase.rpc('increment_distributions', {
    investor_id_param: investorId,
    amount: payoutAmount,
  })

  // 2. Bir yatırım seçip market_value'yu azalt
  const { data: investments, error } = await supabase
    .from('investments')
    .select('*')
    .eq('investor_id', investorId)
    .limit(1)

  if (error) {
    console.error('Error fetching investments:', error)
    throw new Error('Failed to fetch investments')
  }

  if (investments && investments.length > 0) {
    const investment = investments[0]

    const { error: updateError } = await supabase
      .from('investments')
      .update({
        market_value: investment.market_value - payoutAmount,
      })
      .eq('id', investment.id)

    if (updateError) {
      console.error('Error updating investment:', updateError)
      throw new Error('Failed to update investment')
    }
  }
}
