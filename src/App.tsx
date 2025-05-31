import React from 'react';
import AppNavigator from './navigation/AppNavigator';
import { FarmProvider } from './contexts/FarmContext';
import ErrorBoundary from './components/ErrorBoundary';

export default function App() {
  return (
    <ErrorBoundary>
      <FarmProvider>
        <AppNavigator />
      </FarmProvider>
    </ErrorBoundary>
  );
}