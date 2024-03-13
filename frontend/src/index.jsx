import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { ThemeProvider } from '@mui/material'
import { BrowserRouter } from 'react-router-dom'
import { createTheme } from '@mui/material'


const defaultTheme = createTheme();

ReactDOM.createRoot(document.getElementById('root')).render(
  
  <React.StrictMode>
    <ThemeProvider theme={defaultTheme}>
      <BrowserRouter>
    <App />
    </BrowserRouter>
    </ThemeProvider>
  </React.StrictMode>,
  
)
