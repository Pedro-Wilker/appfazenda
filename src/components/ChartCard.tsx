import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { BarChart, LineChart, PieChart } from 'react-native-gifted-charts';
import { LinearGradient } from 'expo-linear-gradient';
import { theme } from '../theme';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import Animated, { FadeInUp } from 'react-native-reanimated';

interface ChartConfig {
  backgroundColor?: string;
  color?: (opacity?: number) => string;
  labelColor?: (opacity?: number) => string;
}

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

const chartWidth = wp('92%');

export default function ChartCard({ title, chartType, data, chartConfig }: ChartCardProps) {
  const barData = chartType === 'bar' ? (data as BarChartData).datasets[0].data.map((value, index) => ({
    value,
    label: (data as BarChartData).labels[index],
  })) : [];

  const lineData = chartType === 'line'
    ? (data as LineChartData).datasets[0].data.map((value, index) => ({
        value,
        label: (data as LineChartData).labels[index],
        color: (data as LineChartData).datasets[0].color
          ? (data as LineChartData).datasets[0].color!(1)
          : chartConfig.color
          ? chartConfig.color(1)
          : 'rgba(46, 125, 50, 1)',
      }))
    : [];

  const pieData = chartType === 'pie' ? (data as PieChartData).map((item) => ({
    value: item.value,
    text: item.name,
    color: item.color,
  })) : [];

  return (
    <Animated.View entering={FadeInUp.duration(500)} style={styles.container}>
      <LinearGradient
        colors={[theme.colors.gradientStart, theme.colors.gradientEnd]}
        style={styles.header}
      >
        <Text style={styles.title}>{title}</Text>
      </LinearGradient>
      <View style={[styles.chartWrapper, chartType === 'bar' && styles.barChartWrapper, chartType === 'line' && styles.lineChartWrapper, chartType === 'pie' && styles.pieChartWrapper]}>
        {chartType === 'bar' && (
          <BarChart
            data={barData}
            width={chartWidth}
            height={200}
            barWidth={20}
            spacing={10}
            yAxisTextStyle={{ fontSize: 8, color: theme.colors.text }}
            xAxisLabelTextStyle={{ fontSize: 8, color: theme.colors.text }}
            frontColor={theme.colors.primary}
            yAxisLabelPrefix="R$"
            showFractionalValues={false}
            noOfSections={5}
            rotateLabel
          />
        )}
        {chartType === 'line' && (
          <LineChart
            data={lineData}
            width={chartWidth}
            height={200}
            yAxisTextStyle={{ fontSize: 8, color: theme.colors.text }}
            xAxisLabelTextStyle={{ fontSize: 8, color: theme.colors.text }}
            yAxisLabelSuffix="L"
            noOfSections={5}
            curved
            thickness={2}
          />
        )}
        {chartType === 'pie' && (
          <PieChart
            data={pieData}
            donut
            textColor={theme.colors.text}
            textSize={10}
            radius={80}
            innerRadius={50}
            focusOnPress={false} // Desativado para evitar erros de manipuladores de eventos
            centerLabelComponent={() => (
                <Text style={{ fontSize: 10, color: theme.colors.text }}>Balanço</Text>
              )}
          />
        )}
      </View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    margin: theme.spacing.sm,
    backgroundColor: theme.colors.card,
    borderRadius: theme.borderRadius.medium,
    boxShadow: '0px 2px 6px rgba(0, 0, 0, 0.15)',
    elevation: 4,
    overflow: 'hidden',
  },
  header: {
    padding: theme.spacing.sm,
    borderTopLeftRadius: theme.borderRadius.medium,
    borderTopRightRadius: theme.borderRadius.medium,
  },
  title: {
    ...theme.typography.title,
    color: '#fff',
  },
  chartWrapper: {
    alignItems: 'center',
    padding: theme.spacing.sm,
    // Removido pointerEvents: 'none' para permitir eventos de toque
  },
  barChartWrapper: {
    borderRadius: theme.borderRadius.small,
    overflow: 'hidden',
  },
  lineChartWrapper: {
    borderRadius: theme.borderRadius.small,
    overflow: 'hidden',
  },
  pieChartWrapper: {
    borderRadius: theme.borderRadius.small,
    overflow: 'hidden',
  },
});