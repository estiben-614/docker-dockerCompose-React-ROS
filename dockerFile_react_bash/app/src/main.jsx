import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import JoistickROS from './JoistickROS'
import JoistickWSockets from './JoistickWSockets'
import JoistickBueno from './JoistickBueno'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <JoistickBueno />
  </React.StrictMode>,
)
