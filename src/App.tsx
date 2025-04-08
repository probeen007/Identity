
import React from 'react';
import { Outlet } from 'react-router-dom';
import { Toaster } from './components/ui/toaster';

function App() {
  return (
    <>
      <Toaster />
      <Outlet />
    </>
  );
}

export default App;
