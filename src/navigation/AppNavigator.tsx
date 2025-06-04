import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import HomeScreen from '../screens/HomeScreen';
import AnimalTypesScreen from '../screens/AnimalTypesScreen';
import FarmListScreen from '../screens/FarmListScreen';
import AddFarmScreen from '../screens/AddFarmScreen';
import AnimalListScreen from '../screens/AnimalListScreen';
import AnimalDetailsScreen from '../screens/AnimalDetailsScreen';
import AddAnimalScreen from '../screens/AddAnimalScreen';
import ReportScreen from '../screens/ReportScreen';
import { theme } from '../theme';

export type RootStackParamList = {
  Tabs: undefined;
  Home: undefined;
  AnimalTypes: undefined;
  FarmList: undefined;
  AddFarm: undefined;
  AnimalList: { species: 'cattle' | 'chicken' | 'pig' };
  AnimalDetails: { animalId: string };
  AddAnimal: undefined;
  Report: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();
const Tabs = createBottomTabNavigator<RootStackParamList>();

// Navegador de abas
function TabsNavigator() {
  return (
    <Tabs.Navigator
      screenOptions={{
        tabBarActiveTintColor: theme.colors.primary,
        tabBarInactiveTintColor: theme.colors.textSecondary,
        tabBarStyle: {
          backgroundColor: theme.colors.card,
          borderTopColor: theme.colors.card,
          paddingBottom: 5,
          height: 60,
        },
      }}
    >
      <Tabs.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarLabel: 'Início',
          tabBarIcon: ({ color, size }: { color: string; size: number }) => (
            <Icon name="home" color={color} size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name="FarmList"
        component={FarmListScreen}
        options={{
          tabBarLabel: 'Fazendas',
          tabBarIcon: ({ color, size }: { color: string; size: number }) => (
            <Icon name="barn" color={color} size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name="AnimalTypes"
        component={AnimalTypesScreen}
        options={{
          tabBarLabel: 'Animais',
          tabBarIcon: ({ color, size }: { color: string; size: number }) => (
            <Icon name="paw" color={color} size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name="Report"
        component={ReportScreen}
        options={{
          tabBarLabel: 'Relatórios',
          tabBarIcon: ({ color, size }: { color: string; size: number }) => (
            <Icon name="file-document" color={color} size={size} />
          ),
        }}
      />
    </Tabs.Navigator>
  );
}

// Navegador principal
export default function AppNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: theme.colors.primary },
        headerTintColor: '#fff',
        headerTitleStyle: {
          ...theme.typography.title,
          fontWeight: 'bold', // or a valid value like '700'
        },
      }}
    >
      <Stack.Screen
        name="Tabs"
        component={TabsNavigator}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="AddFarm"
        component={AddFarmScreen}
        options={{ title: 'Adicionar Fazenda' }}
      />
      <Stack.Screen
        name="AnimalList"
        component={AnimalListScreen}
        options={{ title: 'Lista de Animais' }}
      />
      <Stack.Screen
        name="AnimalDetails"
        component={AnimalDetailsScreen}
        options={{ title: 'Detalhes do Animal' }}
      />
      <Stack.Screen
        name="AddAnimal"
        component={AddAnimalScreen}
        options={{ title: 'Adicionar Animal' }}
      />
    </Stack.Navigator>
  );
}