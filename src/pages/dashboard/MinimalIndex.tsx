import { useState } from 'react'
import { Button } from '../../components/ui/button'
import { TotalDonationsCard } from '../../components/FinancialCard'

export default function MinimalIndex() {
  const [count, setCount] = useState(0)

  return (
    <div className="min-h-screen bg-neutral-50 space-y-4 p-4">
      <h1 className="text-2xl font-bold mb-4">Minimal Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <TotalDonationsCard 
          totalDonations={45230}
          change={12.3}
        />
      </div>
      
      <div className="flex gap-4">
        <Button onClick={() => setCount(count + 1)}>
          Count: {count}
        </Button>
      </div>
    </div>
  )
}
