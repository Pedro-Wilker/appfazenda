import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useFarmContext } from '../contexts/FarmContext';
import { theme } from '../theme';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import Animated, { FadeInRight } from 'react-native-reanimated';

interface MilkProductionCardProps {
  dailyProduction: number;
  monthlyProduction: number;
  earnings: number;
  costs: number;
}

export default function MilkProductionCard({
  dailyProduction,
  monthlyProduction,
  earnings,
  costs,
}: MilkProductionCardProps) {
  const { selectedFarm } = useFarmContext();
  const isMilk = selectedFarm?.type === 'milk';
  const unit = isMilk ? 'L' : 'dúzias';

  return (
    <Animated.View entering={FadeInRight.duration(500).delay(200)} style={styles.container}>
      <LinearGradient
        colors={[theme.colors.gradientStart, theme.colors.gradientEnd]}
        style={styles.header}
      >
        <Text style={styles.title}>
          {isMilk ? 'Produção de Leite' : 'Produção de Ovos'}
        </Text>
      </LinearGradient>
      <View style={styles.content}>
        <View style={styles.section}>
          <Text style={styles.label}>Produção Hoje</Text>
          <Text style={styles.value}>{dailyProduction} {unit}</Text>
        </View>
        <View style={styles.section}>
          <Text style={styles.label}>Produção Mensal</Text>
          <Text style={styles.value}>{monthlyProduction} {unit}</Text>
        </View>
        <View style={styles.section}>
          <Text style={styles.label}>Ganhos</Text>
          <Text style={[styles.value, styles.earnings]}>R$ {earnings.toFixed(2)}</Text>
        </View>
        <View style={styles.section}>
          <Text style={styles.label}>Custos Mensais</Text>
          <Text style={[styles.value, styles.costs]}>R$ {costs.toFixed(2)}</Text>
        </View>
      </View>
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
    width: wp('92%'),
    alignSelf: 'center',
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
  content: {
    padding: theme.spacing.sm,
    flexDirection: 'column',
    gap: theme.spacing.sm,
  },
  section: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  label: {
    ...theme.typography.subtitle,
    color: theme.colors.text,
  },
  value: {
    ...theme.typography.body,
    fontWeight: 'bold',
    color: theme.colors.text,
  },
  earnings: {
    color: theme.colors.primary,
  },
  costs: {
    color: theme.colors.accent,
  },
});