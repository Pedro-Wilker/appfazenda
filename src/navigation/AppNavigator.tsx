import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import HomeScreen from '../screens/HomeScreen';
import FarmListScreen from '../screens/FarmListScreen';
import AnimalListScreen from '../screens/AnimalListScreen';
import AddFarmScreen from '../screens/AddFarmScreen';
// import AddAnimalScreen from '../screens/AddAnimalScreen'; // Adicionar se implementado
import { theme } from '../theme';

// Definir interface de rotas
export type RootTabParamList = {
  Home: undefined;
  Farms: undefined;
  Animals: undefined;
  AddFarm: undefined;
  AddAnimal: undefined;
};

const Tab = createBottomTabNavigator<RootTabParamList>();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={{
          tabBarActiveTintColor: theme.colors.primary,
          tabBarInactiveTintColor: theme.colors.text,
          tabBarStyle: {
            backgroundColor: theme.colors.card,
          },
        }}
      >
        <Tab.Screen
          name="Home"
          component={HomeScreen}
          options={{
            tabBarLabel: 'Início',
            tabBarIcon: ({ color, size }) => (
              <Icon name="home" color={color} size={size} />
            ),
            headerShown: false,
          }}
        />
        <Tab.Screen
          name="Farms"
          component={FarmListScreen}
          options={{
            tabBarLabel: 'Fazendas',
            tabBarIcon: ({ color, size }) => (
              <Icon name="warehouse" color={color} size={size} />
            ),
            headerShown: false,
          }}
        />
        <Tab.Screen
          name="Animals"
          component={AnimalListScreen}
          options={{
            tabBarLabel: 'Animais',
            tabBarIcon: ({ color, size }) => (
              <Icon name="cow" color={color} size={size} />
            ),
            headerShown: false,
          }}
        />
        <Tab.Screen
          name="AddFarm"
          component={AddFarmScreen}
          options={{
            tabBarButton: () => null,
            headerShown: false,
          }}
        />
        {/* <Tab.Screen
          name="AddAnimal"
          component={AddAnimalScreen} // Substituir placeholder
          options={{
            tabBarButton: () => null,
            headerShown: false,
          }}
        /> */}
      </Tab.Navigator>
    </NavigationContainer>
  );
}