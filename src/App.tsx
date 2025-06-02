import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { FarmProvider } from './contexts/FarmContext';
import { AnimalProvider } from './contexts/AnimalContext';
import AppNavigator from './navigation/AppNavigator';

export default function App() {
  return (
    <FarmProvider>
      <AnimalProvider>
        <NavigationContainer>
          <AppNavigator />
        </NavigationContainer>
      </AnimalProvider>
    </FarmProvider>
  );
}