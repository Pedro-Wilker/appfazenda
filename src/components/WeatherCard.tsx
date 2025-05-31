import React from 'react';
import { StyleSheet, Text, View, FlatList, Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Weather } from '../types';
import { theme } from '../theme';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';

interface WeatherCardProps {
  weatherData: Weather[];
}

const getWeatherIcon = (condition: string) => {
  switch (condition.toLowerCase()) {
    case 'ensolarado':
      return 'weather-sunny';
    case 'nublado':
      return 'weather-cloudy';
    case 'chuvoso':
      return 'weather-rainy';
    case 'parcialmente nublado':
      return 'weather-partly-cloudy';
    default:
      return 'weather-cloudy';
  }
};

export default function WeatherCard({ weatherData }: WeatherCardProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Previsão do Tempo</Text>
      <FlatList
        horizontal
        data={weatherData}
        keyExtractor={(item) => item.day}
        renderItem={({ item }) => (
          <View style={styles.weatherItem}>
            <Icon
              name={getWeatherIcon(item.condition)}
              size={24}
              color={theme.colors.primary}
              style={styles.icon}
            />
            <Text style={styles.day}>{item.day}</Text>
            <Text style={styles.temperature}>{item.temperature}°C</Text>
            <Text style={styles.condition}>{item.condition}</Text>
            <Text style={styles.precipitation}>
              {item.precipitation} mm
            </Text>
          </View>
        )}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.listContent}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: theme.spacing.md,
    backgroundColor: theme.colors.card,
    borderRadius: theme.borderRadius.medium,
    margin: theme.spacing.sm,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  title: {
    ...theme.typography.title,
    color: theme.colors.primary,
    marginBottom: theme.spacing.sm,
  },
  weatherItem: {
    backgroundColor: theme.colors.background,
    padding: theme.spacing.sm,
    marginRight: theme.spacing.sm,
    borderRadius: theme.borderRadius.small,
    alignItems: 'center',
    width: wp('25%'), // Responsive width (25% of screen)
    minWidth: 90,
  },
  icon: {
    marginBottom: theme.spacing.xs,
  },
  day: {
    ...theme.typography.subtitle,
    color: theme.colors.text,
  },
  temperature: {
    ...theme.typography.body,
    color: theme.colors.textSecondary,
  },
  condition: {
    ...theme.typography.body,
    color: theme.colors.textSecondary,
    textAlign: 'center',
  },
  precipitation: {
    ...theme.typography.body,
    fontWeight: 'bold',
    color: theme.colors.accent,
  },
  listContent: {
    paddingHorizontal: theme.spacing.xs,
  },
});