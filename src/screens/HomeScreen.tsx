import React from 'react';
import { StyleSheet, ScrollView, SafeAreaView, Text, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import WeatherCard from '../components/WeatherCard';
import MilkProductionCard from '../components/MilkProductionCard';
import ChartCard from '../components/ChartCard';
import Button from '../components/Button';
import { useFarmContext } from '../contexts/FarmContext';
import { Weather, PieChartData } from '../types';
import { theme } from '../theme';
import { RootStackParamList } from '../navigation/AppNavigator';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

interface ProductionData {
  daily: number;
  monthly: number;
  earnings: number;
  costs: number;
}

interface MockProductionData {
  milk: ProductionData;
  eggs: ProductionData;
}

interface ChartData {
  labels: string[];
  datasets: Array<{
    data: number[];
    color?: (opacity: number) => string;
  }>;
}

interface MockChartData {
  milk: ChartData;
  eggs: ChartData;
}

interface MockBalanceData {
  milk: PieChartData[];
  eggs: PieChartData[];
}

const mockWeather: Weather[] = [
  { day: 'Hoje', temperature: 25, condition: 'Ensolarado', precipitation: 0 },
  { day: 'Terça', temperature: 23, condition: 'Nublado', precipitation: 5 },
  { day: 'Quarta', temperature: 22, condition: 'Chuvoso', precipitation: 15 },
  { day: 'Quinta', temperature: 24, condition: 'Parcialmente nublado', precipitation: 2 },
  { day: 'Sexta', temperature: 26, condition: 'Ensolarado', precipitation: 0 },
];

const mockMilkProduction: MockProductionData = {
  milk: { daily: 120, monthly: 3150, earnings: 7500, costs: 4500 },
  eggs: { daily: 50, monthly: 1500, earnings: 3000, costs: 1800 },
};

const mockExpenseData: MockChartData = {
  milk: {
    labels: ['Seg', 'Ter', 'Qua', 'Qui', 'Sex'],
    datasets: [{ data: [500, 700, 300, 600, 400] }],
  },
  eggs: {
    labels: ['Seg', 'Ter', 'Qua', 'Qui', 'Sex'],
    datasets: [{ data: [200, 300, 250, 400, 350] }],
  },
};

const mockMilkProductionData: MockChartData = {
  milk: {
    labels: ['Seg', 'Ter', 'Qua', 'Qui', 'Sex'],
    datasets: [
      { data: [100, 120, 90, 110, 130], color: () => theme.colors.primary },
      { data: [3000, 3100, 3050, 3200, 3150].map((v) => v / 100), color: () => theme.colors.secondary },
    ],
  },
  eggs: {
    labels: ['Seg', 'Ter', 'Qua', 'Qui', 'Sex'],
    datasets: [
      { data: [45, 50, 48, 52, 47], color: () => theme.colors.primary },
      { data: [1400, 1500, 1450, 1550, 1480].map((v) => v / 100), color: () => theme.colors.secondary },
    ],
  },
};

const mockBalanceData: MockBalanceData = {
  milk: [
    { name: 'Ganhos', value: 5000, color: theme.colors.primary, legendFontColor: theme.colors.text, legendFontSize: 10 },
    { name: 'Gastos', value: 3000, color: theme.colors.accent, legendFontColor: theme.colors.text, legendFontSize: 10 },
  ],
  eggs: [
    { name: 'Ganhos', value: 3000, color: theme.colors.primary, legendFontColor: theme.colors.text, legendFontSize: 10 },
    { name: 'Gastos', value: 1800, color: theme.colors.accent, legendFontColor: theme.colors.text, legendFontSize: 10 },
  ],
};

const defaultChartConfig = {
  backgroundColor: theme.colors.card,
  color: (opacity = 1) => `rgba(46, 125, 50, ${opacity})`,
  labelColor: (opacity = 1) => theme.colors.text,
};

export default function HomeScreen() {
  const { selectedFarm } = useFarmContext();
  const navigation = useNavigation<NavigationProp>();
  const farmType: 'milk' | 'eggs' = selectedFarm?.type || 'milk';

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <WeatherCard weatherData={mockWeather} />
        <MilkProductionCard
          dailyProduction={mockMilkProduction[farmType].daily}
          monthlyProduction={mockMilkProduction[farmType].monthly}
          earnings={mockMilkProduction[farmType].earnings}
          costs={mockMilkProduction[farmType].costs}
        />
        <ChartCard
          title="Gastos Semanais"
          chartType="bar"
          data={mockExpenseData[farmType]}
          chartConfig={defaultChartConfig}
        />
        <ChartCard
          title={farmType === 'milk' ? 'Produção de Leite' : 'Produção de Ovos'}
          chartType="line"
          data={mockMilkProductionData[farmType]}
          chartConfig={defaultChartConfig}
        />
        <ChartCard
          title="Balanço Mensal"
          chartType="pie"
          data={mockBalanceData[farmType]}
          chartConfig={defaultChartConfig}
        />
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
  title: {
    ...theme.typography.title,
    color: theme.colors.primary,
    textAlign: 'center',
    marginBottom: theme.spacing.md,
  },
  buttonContainer: {
    alignItems: 'center',
    marginBottom: theme.spacing.lg,
  },
  button: {
    width: '80%',
    marginVertical: theme.spacing.xs,
  },
});