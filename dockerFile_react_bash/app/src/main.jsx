import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import JoistickROS from './JoistickROS'
import JoistickWSockets from './JoistickWSockets'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <JoistickWSockets />
  </React.StrictMode>,
)
