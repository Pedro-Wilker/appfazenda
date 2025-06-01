import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import FarmListScreen from '../screens/FarmListScreen';
import AddFarmScreen from '../screens/AddFarmScreen';
import AnimalTypesScreen from '../screens/AnimalTypesScreen';
import AnimalListScreen from '../screens/AnimalListScreen';
import AnimalDetailsScreen from '../screens/AnimalDetailsScreen';
import AddAnimalScreen from '../screens/AddAnimalScreen';

export type RootStackParamList = {
  FarmList: undefined;
  AddFarm: undefined;
  AnimalTypes: undefined;
  AnimalList: { species: 'cattle' | 'chicken' | 'pig' };
  AnimalDetails: { animalId: string };
  AddAnimal: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function AppNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="FarmList" component={FarmListScreen} />
      <Stack.Screen name="AddFarm" component={AddFarmScreen} />
      <Stack.Screen name="AnimalTypes" component={AnimalTypesScreen} />
      <Stack.Screen name="AnimalList" component={AnimalListScreen} />
      <Stack.Screen name="AnimalDetails" component={AnimalDetailsScreen} />
      <Stack.Screen name="AddAnimal" component={AddAnimalScreen} />
    </Stack.Navigator>
  );
}