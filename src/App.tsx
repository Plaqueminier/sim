import { BrowserRouter, Routes, Route } from 'react-router-dom';
import type { ReactNode } from 'react';
import Home from './pages/Home';
import ElementaryCA from './pages/ElementaryCA';

function App(): ReactNode {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/elementary-ca" element={<ElementaryCA />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
