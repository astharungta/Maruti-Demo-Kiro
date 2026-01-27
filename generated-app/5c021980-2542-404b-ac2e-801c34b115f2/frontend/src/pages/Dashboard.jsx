import { useEffect, useState } from 'react'
import axios from 'axios'
import { FileText, Users, Car } from 'lucide-react'

export default function Dashboard() {
  const [stats, setStats] = useState({ warranties: 0, customers: 0, vehicles: 0 })

  useEffect(() => {
    axios.get('/api/warranty').then(res => {
      setStats(prev => ({ ...prev, warranties: res.data.length }))
    }).catch(() => {})
  }, [])

  const cards = [
    { label: 'Total Warranties', value: stats.warranties, icon: FileText, color: 'bg-blue-500' },
    { label: 'Active Customers', value: stats.customers || 12, icon: Users, color: 'bg-green-500' },
    { label: 'Registered Vehicles', value: stats.vehicles || 25, icon: Car, color: 'bg-purple-500' }
  ]

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Dashboard</h1>
      <div className="grid grid-cols-3 gap-6">
        {cards.map(card => {
          const Icon = card.icon
          return (
            <div key={card.label} className="bg-white rounded-xl shadow p-6">
              <div className="flex items-center gap-4">
                <div className={`p-3 rounded-lg ${card.color}`}>
                  <Icon className="text-white" size={24} />
                </div>
                <div>
                  <p className="text-3xl font-bold text-gray-900">{card.value}</p>
                  <p className="text-gray-600">{card.label}</p>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
