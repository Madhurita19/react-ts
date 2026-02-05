import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { ThemeProvider } from './components/Sidebar/theme-provider.tsx'
import { AuthProvider } from './AuthContext'  // <-- import your AuthProvider

createRoot(document.getElementById('root')!).render(
  <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
    <AuthProvider>    {/* Wrap App with AuthProvider */}
      <App />
    </AuthProvider>
  </ThemeProvider>
)
