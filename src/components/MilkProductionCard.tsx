import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { theme } from '../theme';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import Animated, { FadeInRight } from 'react-native-reanimated';

interface MilkProductionCardProps {
  dailyProduction: number; // Litros/dia
  monthlyProduction: number; // Litros/mês
  earnings: number; // Ganhos (R$)
  costs: number; // Custos (R$)
}

export default function MilkProductionCard({
  dailyProduction,
  monthlyProduction,
  earnings,
  costs,
}: MilkProductionCardProps) {
  return (
    <Animated.View entering={FadeInRight.duration(500).delay(200)} style={styles.container}>
      <LinearGradient
        colors={[theme.colors.gradientStart, theme.colors.gradientEnd]}
        style={styles.header}
      >
        <Text style={styles.title}>Produção de Leite</Text>
      </LinearGradient>
      <View style={styles.content}>
        <View style={styles.section}>
          <Text style={styles.label}>Produção Hoje</Text>
          <Text style={styles.value}>{dailyProduction} L</Text>
        </View>
        <View style={styles.section}>
          <Text style={styles.label}>Produção Mensal</Text>
          <Text style={styles.value}>{monthlyProduction} L</Text>
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
    boxShadow: '0px 2px 6px rgba(0, 0, 0, 0.15)', // Web
    elevation: 4, // Android
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
    color: theme.colors.primary, // Verde para ganhos
  },
  costs: {
    color: theme.colors.accent, // Rosa para custos
  },
});