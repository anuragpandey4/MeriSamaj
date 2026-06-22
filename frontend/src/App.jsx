import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { MemberRoutes } from './modules/member/routes/MemberRoutes';
import { DataProvider } from './modules/member/context/DataProvider';

const App = () => {
  return (
    <DataProvider>
      <BrowserRouter>
        <Routes>
          {/* Default entry → splash screen for onboarding demo */}
          <Route path="/" element={<Navigate to="/member/splash" replace />} />
          
          {/* Route all /member/* requests to MemberRoutes */}
          <Route path="/member/*" element={<MemberRoutes />} />
        </Routes>
      </BrowserRouter>
    </DataProvider>
  );
};

export default App;