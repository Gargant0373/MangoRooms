import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import LandingPage from './landing/LandingPage';
import "./global.css";
import { HashRouter, Route, Routes } from 'react-router-dom';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <HashRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
      </Routes>
    </HashRouter>
  </StrictMode>,
)
