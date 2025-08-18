import { useState } from 'react'

export default function UltraSimple() {
  const [count, setCount] = useState(0)

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Ultra Simple Dashboard</h1>
      <p className="mb-4">This is working! Count: {count}</p>
      <button 
        onClick={() => setCount(count + 1)}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        Click me: {count}
      </button>
    </div>
  )
}
