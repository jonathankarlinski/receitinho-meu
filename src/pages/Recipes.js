import React from 'react';
import { useLocation } from 'react-router-dom';
import Header from '../components/Header';

export default function Recipes() {
  const location = useLocation();

  return (
    <div>
      <Header
        title={ location.pathname === '/foods' ? 'Foods' : 'Drinks' }
      />
    </div>
  );
}
