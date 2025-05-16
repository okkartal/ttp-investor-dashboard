'use client'

import { useState, useEffect } from 'react'
import { Investment } from '../types'

type Props = {
  investments: Investment[]
}

type SortKey = 'roi_percent' | 'next_distribution_date'

export default function InvestmentTable({ investments }: Props) {
  const [sortBy, setSortBy] = useState<SortKey>('next_distribution_date')
  const [sortedInvestments, setSortedInvestments] = useState<Investment[]>([])

  useEffect(() => {
    if (!investments) return

    const sorted = [...investments].sort((a, b) => {
      if (sortBy === 'roi_percent') {
        return a.roi_percent - b.roi_percent
      } else {
        return (
          new Date(a.next_distribution_date).getTime() -
          new Date(b.next_distribution_date).getTime()
        )
      }
    })

    setSortedInvestments(sorted)
  }, [investments, sortBy])

  return (
    <div className="space-y-4">
      {/* Sort Dropdown */}
      <div className="flex justify-end">
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value as SortKey)}
          className="border rounded-lg px-3 py-2 text-sm"
        >
          <option value="next_distribution_date">Sort by Distribution Date</option>
          <option value="roi_percent">Sort by ROI %</option>
        </select>
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded-xl border bg-white">
        <table className="min-w-full text-sm">
          <thead className="bg-gray-100 text-left text-gray-800">
            <tr>
              <th className="p-3">Project Name</th>
              <th className="p-3">Token Class</th>
              <th className="p-3">Shares Owned</th>
              <th className="p-3">Market Value</th>
              <th className="p-3">ROI %</th>
              <th className="p-3">Next Distribution</th>
            </tr>
          </thead>
          <tbody>
            {sortedInvestments.map((inv) => (
              <tr key={inv.id} className="border-t hover:bg-gray-50 text-gray-800">
                <td className="p-3">{inv.project_name}</td>
                <td className="p-3">{inv.token_class}</td>
                <td className="p-3">{inv.shares_owned}</td>
                <td className="p-3">${inv.market_value.toLocaleString()}</td>
                <td className="p-3">{inv.roi_percent.toFixed(1)}%</td>
                <td className="p-3">
                  {new Date(inv.next_distribution_date).toLocaleDateString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
