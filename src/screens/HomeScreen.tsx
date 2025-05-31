import React from 'react';
import { StyleSheet, ScrollView, SafeAreaView, Text, View } from 'react-native';
import WeatherCard from '../components/WeatherCard';
import ChartCard from '../components/ChartCard';
import Button from '../components/Button';
import { Weather } from '../types';
import { theme } from '../theme';

// Mock data
const mockWeather: Weather[] = [
  { day: 'Hoje', temperature: 25, condition: 'Ensolarado', precipitation: 0 },
  { day: 'Terça', temperature: 23, condition: 'Nublado', precipitation: 5 },
  { day: 'Quarta', temperature: 22, condition: 'Chuvoso', precipitation: 15 },
  { day: 'Quinta', temperature: 24, condition: 'Parcialmente nublado', precipitation: 2 },
  { day: 'Sexta', temperature: 26, condition: 'Ensolarado', precipitation: 0 },
];

const mockExpenseData = {
  labels: ['Seg', 'Ter', 'Qua', 'Qui', 'Sex'],
  datasets: [{ data: [500, 700, 300, 600, 400] }],
};

const mockMilkProductionData = {
  labels: ['Seg', 'Ter', 'Qua', 'Qui', 'Sex'],
  datasets: [
    { data: [100, 120, 90, 110, 130], color: () => theme.colors.primary },
    { data: [3000, 3100, 3050, 3200, 3150].map((v) => v / 100), color: () => theme.colors.secondary },
  ],
};

const mockBalanceData = [
  { name: 'Ganhos', value: 5000, color: theme.colors.primary, legendFontColor: theme.colors.text, legendFontSize: 12 },
  { name: 'Gastos', value: 3000, color: theme.colors.accent, legendFontColor: theme.colors.text, legendFontSize: 12 },
];

const chartConfig = {
  backgroundColor: theme.colors.card,
  backgroundGradientFrom: theme.colors.card,
  backgroundGradientTo: theme.colors.card,
  decimalPlaces: 0,
  color: (opacity = 1) => `rgba(46, 125, 50, ${opacity})`,
  labelColor: (opacity = 1) => theme.colors.text,
  style: {
    borderRadius: theme.borderRadius.small,
  },
  propsForDots: {
    r: '6',
    strokeWidth: '2',
    stroke: theme.colors.secondary,
  },
};

export default function HomeScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Bem-vindo à sua fazenda</Text>
          <Button title="Ver Fazendas" onPress={() => {}} style={styles.headerButton} />
        </View>
        <WeatherCard weatherData={mockWeather} />
        <ChartCard title="Gastos Semanais" chartType="bar" data={mockExpenseData} chartConfig={chartConfig} />
        <ChartCard title="Produção de Leite" chartType="line" data={mockMilkProductionData} chartConfig={chartConfig} />
        <ChartCard title="Balanço Mensal" chartType="pie" data={mockBalanceData} chartConfig={chartConfig} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  scrollContent: {
    paddingBottom: theme.spacing.xl,
  },
  header: {
    padding: theme.spacing.md,
    backgroundColor: theme.colors.primary,
    borderBottomLeftRadius: theme.borderRadius.medium,
    borderBottomRightRadius: theme.borderRadius.medium,
    marginBottom: theme.spacing.sm,
  },
  headerTitle: {
    ...theme.typography.title,
    color: '#fff',
    marginBottom: theme.spacing.sm,
  },
  headerButton: {
    alignSelf: 'flex-start',
  },
});