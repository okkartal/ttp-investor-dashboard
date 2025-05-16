export type Investment = {
  id: string
  investor_id: string
  project_name: string
  token_class: string
  shares_owned: number
  market_value: number
  roi_percent: number
  next_distribution_date: string
  created_at: string
}

export type InvestorSummary = {
  investor_id: string
  total_invested_amount: number
  portfolio_value: number
  distributions_received: number
  outstanding_commitments: number
}

export const INVESTOR_ID = process.env.NEXT_PUBLIC_INVESTOR_ID as string