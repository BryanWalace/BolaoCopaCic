import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import Header from './components/layout/Header'
import HomePage from './pages/HomePage'
import AdminPage from './pages/AdminPage'

export default function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-bg-dark flex flex-col">
        <Header />
        <div className="flex-1">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/admin" element={<AdminPage />} />
          </Routes>
        </div>

        {/* Footer */}
        <footer className="border-t border-border-dim py-4 mt-8">
          <p className="text-center text-gray-600 text-xs">
            Bolão Copa 2026 ⚽ · EUA 🇺🇸 · Canadá 🇨🇦 · México 🇲🇽
          </p>
        </footer>

        <Toaster
          position="bottom-right"
          toastOptions={{
            style: {
              background: '#1A1A1A',
              color: '#E5E5E5',
              border: '1px solid #2A2A2A',
              borderRadius: '12px',
              fontSize: '14px',
            },
            success: {
              iconTheme: { primary: '#006847', secondary: '#E5E5E5' },
            },
            error: {
              iconTheme: { primary: '#B22234', secondary: '#E5E5E5' },
            },
          }}
        />
      </div>
    </BrowserRouter>
  )
}
