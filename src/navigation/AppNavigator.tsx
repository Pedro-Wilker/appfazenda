import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import HomeScreen from '../screens/HomeScreen';
import FarmListScreen from '../screens/FarmListScreen';
import { theme } from '../theme';

const Tab = createBottomTabNavigator();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName: string = 'help-circle-outline';
            if (route.name === 'Home') {
              iconName = focused ? 'home' : 'home-outline';
            } else if (route.name === 'Farms') {
              iconName = focused ? 'barn' : 'barn-outline';
            }
            return <Icon name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: theme.colors.primary,
          tabBarInactiveTintColor: theme.colors.textSecondary,
          tabBarStyle: {
            backgroundColor: theme.colors.card,
            borderTopColor: theme.colors.background,
            paddingBottom: theme.spacing.sm,
            height: 60,
          },
          headerShown: false,
        })}
      >
        <Tab.Screen name="Home" component={HomeScreen} options={{ title: 'Início' }} />
        <Tab.Screen name="Farms" component={FarmListScreen} options={{ title: 'Fazendas' }} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}