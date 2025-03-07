import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import LandingPage from './pages/Landing';
import { BrowserRouter, Route, Routes } from 'react-router';
import SearchResultPage from './pages/SearchResult';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<LandingPage />} />
          <Route path={`/search-result`} element={<SearchResultPage />} />
        </Routes>
      </BrowserRouter>
  </StrictMode>
);
