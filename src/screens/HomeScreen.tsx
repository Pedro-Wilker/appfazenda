import React from 'react';
import { StyleSheet, ScrollView, SafeAreaView } from 'react-native';
import WeatherCard from '../components/WeatherCard';
import MilkProductionCard from '../components/MilkProductionCard'; // Novo
import ChartCard from '../components/ChartCard';
import { Weather } from '../types';
import { theme } from '../theme';

const mockWeather: Weather[] = [
  { day: 'Hoje', temperature: 25, condition: 'Ensolarado', precipitation: 0 },
  { day: 'Terça', temperature: 23, condition: 'Nublado', precipitation: 5 },
  { day: 'Quarta', temperature: 22, condition: 'Chuvoso', precipitation: 15 },
  { day: 'Quinta', temperature: 24, condition: 'Parcialmente nublado', precipitation: 2 },
  { day: 'Sexta', temperature: 26, condition: 'Ensolarado', precipitation: 0 },
];

const mockMilkProduction = {
  daily: 120, // Litros/dia
  monthly: 3150, // Litros/mês
  earnings: 7500, // Ganhos (R$)
  costs: 4500, // Custos (R$)
};

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
  { name: 'Ganhos', value: 5000, color: theme.colors.primary, legendFontColor: theme.colors.text, legendFontSize: 10 },
  { name: 'Gastos', value: 3000, color: theme.colors.accent, legendFontColor: theme.colors.text, legendFontSize: 10 },
];

const defaultChartConfig = {
  backgroundColor: theme.colors.card,
  color: (opacity = 1) => `rgba(46, 125, 50, ${opacity})`,
  labelColor: (opacity = 1) => theme.colors.text,
};

export default function HomeScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <WeatherCard weatherData={mockWeather} />
        <MilkProductionCard
          dailyProduction={mockMilkProduction.daily}
          monthlyProduction={mockMilkProduction.monthly}
          earnings={mockMilkProduction.earnings}
          costs={mockMilkProduction.costs}
        />
        <ChartCard title="Gastos Semanais" chartType="bar" data={mockExpenseData} chartConfig={defaultChartConfig} />
        <ChartCard title="Produção de Leite" chartType="line" data={mockMilkProductionData} chartConfig={defaultChartConfig} />
        <ChartCard title="Balanço Mensal" chartType="pie" data={mockBalanceData} chartConfig={defaultChartConfig} />
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
    paddingVertical: theme.spacing.sm,
    paddingBottom: theme.spacing.xl,
  },
});