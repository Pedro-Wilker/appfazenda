import React from 'react';
import { StyleSheet, Text, View, FlatList } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { LinearGradient } from 'expo-linear-gradient';
import { Weather } from '../types';
import { theme } from '../theme';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import Animated, { FadeInRight } from 'react-native-reanimated';

interface WeatherCardProps {
  weatherData: Weather[];
}

const getWeatherIcon = (condition: string) => {
  switch (condition.toLowerCase()) {
    case 'ensolarado':
      return { name: 'weather-sunny', color: '#ffb300' };
    case 'nublado':
      return { name: 'weather-cloudy', color: '#78909c' };
    case 'chuvoso':
      return { name: 'weather-rainy', color: '#0288d1' };
    case 'parcialmente nublado':
      return { name: 'weather-partly-cloudy', color: '#90a4ae' };
    default:
      return { name: 'weather-cloudy', color: '#78909c' };
  }
};

export default function WeatherCard({ weatherData }: WeatherCardProps) {
  return (
    <Animated.View entering={FadeInRight.duration(500)} style={styles.container}>
      <LinearGradient
        colors={[theme.colors.gradientStart, theme.colors.gradientEnd]}
        style={styles.gradient}
      >
        <Text style={styles.title}>Previsão do Tempo</Text>
      </LinearGradient>
      <FlatList
        horizontal
        data={weatherData}
        keyExtractor={(item) => item.day}
        renderItem={({ item, index }) => (
          <Animated.View entering={FadeInRight.delay(index * 100)} style={styles.weatherItem}>
            <Icon
              name={getWeatherIcon(item.condition).name}
              size={20}
              color={getWeatherIcon(item.condition).color}
              style={styles.icon}
            />
            <Text style={styles.day}>{item.day}</Text>
            <Text style={styles.temperature}>{item.temperature}°C</Text>
            <Text style={styles.condition} numberOfLines={1}>
              {item.condition}
            </Text>
            <Text style={styles.precipitation}>{item.precipitation} mm</Text>
          </Animated.View>
        )}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.listContent}
        snapToInterval={wp('22%') + theme.spacing.sm}
        decelerationRate="fast"
      />
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    margin: theme.spacing.sm,
    borderRadius: theme.borderRadius.medium,
    backgroundColor: theme.colors.card,
    boxShadow: '0px 2px 6px rgba(0, 0, 0, 0.15)',
    elevation: 4,
    overflow: 'hidden',
  },
  gradient: {
    padding: theme.spacing.sm,
    borderTopLeftRadius: theme.borderRadius.medium,
    borderTopRightRadius: theme.borderRadius.medium,
  },
  title: {
    ...theme.typography.title,
    color: '#fff',
  },
  weatherItem: {
    backgroundColor: theme.colors.card,
    padding: theme.spacing.sm,
    marginRight: theme.spacing.sm,
    borderRadius: theme.borderRadius.small,
    alignItems: 'center',
    width: wp('20%'),
    minWidth: 80,
    borderWidth: 1,
    borderColor: theme.colors.background,
    boxShadow: '0px 2px 6px rgba(0, 0, 0, 0.15)',
    elevation: 4,
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
    maxWidth: '100%',
  },
  precipitation: {
    ...theme.typography.body,
    fontWeight: 'bold',
    color: theme.colors.accent,
  },
  listContent: {
    padding: theme.spacing.sm,
  },
});