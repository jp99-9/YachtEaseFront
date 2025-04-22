import { SidebarProvider } from './utils/SidebarContext.jsx'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(

  <SidebarProvider>
    <App />
  </SidebarProvider>


)
