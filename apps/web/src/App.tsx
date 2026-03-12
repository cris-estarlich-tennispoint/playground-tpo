import CategoryPage from './pages/CategoryPage'
import { Toaster } from 'react-hot-toast'

function App() {
  return (
    <div className="min-h-screen bg-shop-bg text-shop-text">
      <Toaster
        position="top-center"
        toastOptions={{
          style: {
            background: '#1a1a1a',
            color: '#f5f5f5',
            border: '1px solid #2a2a2a',
          },
          success: {
            iconTheme: {
              primary: '#22c55e',
              secondary: '#f5f5f5',
            },
          },
        }}
      />
      <CategoryPage />
    </div>
  )
}

export default App
