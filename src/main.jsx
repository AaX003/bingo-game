import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import Bingo from "./code/App.jsx";

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Bingo />
  </StrictMode>,
)
