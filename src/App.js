import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useColorMode, Button } from '@chakra-ui/react';
import Login from './pages/Login';
import Orders from './pages/Orders';

const App = () => {
  const isAuthenticated = localStorage.getItem('auth') === 'true';
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <>
      <Button onClick={toggleColorMode} position="absolute" top="1rem" right="1rem">
        Toggle {colorMode === 'light' ? 'Dark' : 'Light'}
      </Button>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        {isAuthenticated && <Route path="/orders" element={<Orders />} />}
        {!isAuthenticated && <Route path="*" element={<Navigate to="/login" />} />}
      </Routes>
    </>
  );
};

export default App;