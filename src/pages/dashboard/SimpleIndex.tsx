import { useState } from 'react'
import { Button } from '../../components/ui/button'

export default function SimpleIndex() {
  const [count, setCount] = useState(0)

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Simple Dashboard Test</h1>
      <p className="mb-4">Count: {count}</p>
      <Button onClick={() => setCount(count + 1)}>
        Increment
      </Button>
    </div>
  )
}
