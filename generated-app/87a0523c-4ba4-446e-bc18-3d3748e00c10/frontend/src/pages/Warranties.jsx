import { useEffect, useState } from 'react'
import axios from 'axios'
import { Plus, Trash2 } from 'lucide-react'

export default function Warranties() {
  const [warranties, setWarranties] = useState([])
  const [showForm, setShowForm] = useState(false)
  const [form, setForm] = useState({ policyNumber: '', vehicleVin: '', premium: '' })

  useEffect(() => {
    fetchWarranties()
  }, [])

  const fetchWarranties = () => {
    axios.get('/api/warranty').then(res => setWarranties(res.data)).catch(() => {})
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    await axios.post('/api/warranty', {
      ...form,
      premium: parseFloat(form.premium),
      startDate: new Date().toISOString(),
      endDate: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString(),
      status: 'Active',
      customerId: 1
    })
    setShowForm(false)
    setForm({ policyNumber: '', vehicleVin: '', premium: '' })
    fetchWarranties()
  }

  const handleDelete = async (id) => {
    await axios.delete(`/api/warranty/${id}`)
    fetchWarranties()
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Warranties</h1>
        <button
          onClick={() => setShowForm(true)}
          className="flex items-center gap-2 bg-primary text-white px-4 py-2 rounded-lg hover:bg-green-600"
        >
          <Plus size={20} /> Add Warranty
        </button>
      </div>

      {showForm && (
        <div className="bg-white rounded-xl shadow p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">New Warranty</h2>
          <form onSubmit={handleSubmit} className="grid grid-cols-3 gap-4">
            <input
              placeholder="Policy Number"
              value={form.policyNumber}
              onChange={e => setForm({ ...form, policyNumber: e.target.value })}
              className="border rounded-lg px-4 py-2"
              required
            />
            <input
              placeholder="Vehicle VIN"
              value={form.vehicleVin}
              onChange={e => setForm({ ...form, vehicleVin: e.target.value })}
              className="border rounded-lg px-4 py-2"
              required
            />
            <input
              placeholder="Premium"
              type="number"
              value={form.premium}
              onChange={e => setForm({ ...form, premium: e.target.value })}
              className="border rounded-lg px-4 py-2"
              required
            />
            <div className="col-span-3 flex gap-2">
              <button type="submit" className="bg-primary text-white px-6 py-2 rounded-lg">Save</button>
              <button type="button" onClick={() => setShowForm(false)} className="border px-6 py-2 rounded-lg">Cancel</button>
            </div>
          </form>
        </div>
      )}

      <div className="bg-white rounded-xl shadow overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Policy #</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Vehicle VIN</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Premium</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {warranties.map(w => (
              <tr key={w.id} className="hover:bg-gray-50">
                <td className="px-6 py-4">{w.policyNumber}</td>
                <td className="px-6 py-4">{w.vehicleVin}</td>
                <td className="px-6 py-4">
                  <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-sm">{w.status}</span>
                </td>
                <td className="px-6 py-4">${w.premium?.toFixed(2)}</td>
                <td className="px-6 py-4">
                  <button onClick={() => handleDelete(w.id)} className="text-red-500 hover:text-red-700">
                    <Trash2 size={18} />
                  </button>
                </td>
              </tr>
            ))}
            {warranties.length === 0 && (
              <tr><td colSpan="5" className="px-6 py-8 text-center text-gray-500">No warranties found</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
