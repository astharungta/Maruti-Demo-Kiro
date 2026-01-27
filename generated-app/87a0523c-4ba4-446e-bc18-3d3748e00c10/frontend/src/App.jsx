import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Dashboard from './pages/Dashboard'
import Warranties from './pages/Warranties'

export default function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/warranties" element={<Warranties />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  )
}
