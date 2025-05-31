import React from 'react';
import { StyleSheet, Text, View, Dimensions } from 'react-native';
import { BarChart, LineChart, PieChart } from 'react-native-chart-kit';
import { theme } from '../theme';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';

// Define ChartConfig type
interface ChartConfig {
  backgroundColor: string;
  backgroundGradientFrom: string;
  backgroundGradientTo: string;
  decimalPlaces?: number;
  color: (opacity?: number) => string;
  labelColor?: (opacity?: number) => string;
  style?: object;
  propsForDots?: object;
  propsForBackgroundLines?: object;
  propsForLabels?: object;
}

// Define chart data types
interface BarChartData {
  labels: string[];
  datasets: Array<{ data: number[] }>;
}

interface LineChartData {
  labels: string[];
  datasets: Array<{
    data: number[];
    color?: (opacity: number) => string;
  }>;
}

type PieChartData = Array<{
  name: string;
  value: number;
  color: string;
  legendFontColor?: string;
  legendFontSize?: number;
}>;

type ChartData = BarChartData | LineChartData | PieChartData;

interface ChartCardProps {
  title: string;
  chartType: 'bar' | 'line' | 'pie';
  data: ChartData;
  chartConfig: ChartConfig;
}

const chartWidth = wp('90%'); // 90% of screen width

export default function ChartCard({ title, chartType, data, chartConfig }: ChartCardProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      {chartType === 'bar' && (
        <BarChart
          data={data as BarChartData}
          width={chartWidth}
          height={220}
          yAxisLabel="R$"
          yAxisSuffix=""
          chartConfig={{ ...chartConfig, propsForLabels: { fontSize: 10 } }}
          style={styles.chart}
          verticalLabelRotation={30}
        />
      )}
      {chartType === 'line' && (
        <LineChart
          data={data as LineChartData}
          width={chartWidth}
          height={220}
          yAxisLabel=""
          yAxisSuffix="L"
          chartConfig={{ ...chartConfig, propsForLabels: { fontSize: 10 } }}
          style={styles.chart}
          bezier
        />
      )}
      {chartType === 'pie' && (
        <PieChart
          data={data as PieChartData}
          width={chartWidth}
          height={220}
          chartConfig={chartConfig}
          accessor="value"
          backgroundColor="transparent"
          paddingLeft="15"
          style={styles.chart}
        />
      )}
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
  chart: {
    borderRadius: theme.borderRadius.small,
  },
});