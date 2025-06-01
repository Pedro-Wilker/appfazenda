import React from 'react';
import AppNavigator from './navigation/AppNavigator';
import { FarmProvider } from './contexts/FarmContext';
import ErrorBoundary from './components/ErrorBoundary';
import { AnimalProvider } from './contexts/AnimalContext';
import { NavigationContainer } from '@react-navigation/native';

export default function App() {
  return (
    <ErrorBoundary>
      <FarmProvider>
        <AnimalProvider>
          <NavigationContainer>
            <AppNavigator />
          </NavigationContainer>
        </AnimalProvider>
      </FarmProvider>
    </ErrorBoundary>
  );
}