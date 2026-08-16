import './App.css'
import { useState } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { Header } from './components/Header'
import { Sidebar } from './components/Sidebar'
import { Browse } from './pages/Browse'
import { CarDetail } from './pages/CarDetail'
import { SellCar } from './pages/SellCar'

function App() {
  const [sidebarExpanded, setSidebarExpanded] = useState(false)

  return (
    <BrowserRouter>
      <div className="app-container">
        {/* Top Header - with search and notifications */}
        <Header onToggleSidebar={() => setSidebarExpanded(!sidebarExpanded)} />

        {/* Main Layout - Sidebar + Content */}
        <div className="app-main">
          {/* Expandable Sidebar Navigation */}
          <Sidebar expanded={sidebarExpanded} />

          {/* Main content area */}
          <Routes>
            <Route path="/" element={<Browse />} />
            <Route path="/car/:carId" element={<CarDetail />} />
            <Route path="/sell" element={<SellCar />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  )
}

export default App
