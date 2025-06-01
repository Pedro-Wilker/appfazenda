import React from 'react';
import { StyleSheet, Text, View, FlatList, SafeAreaView } from 'react-native';
import { Animal, useAnimalContext } from '../contexts/AnimalContext';
import { theme } from '../theme';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import Animated, { FadeInUp } from 'react-native-reanimated';
import { useRoute } from '@react-navigation/native';
import { RouteProp } from '@react-navigation/native';

type RootStackParamList = {
  AnimalDetails: { animalId: string };
};

type RoutePropType = RouteProp<RootStackParamList, 'AnimalDetails'>;

export default function AnimalDetailsScreen() {
  const { animals } = useAnimalContext();
  const route = useRoute<RoutePropType>();
  const { animalId } = route.params;

  const animal = animals.find((a) => a.id === animalId);

  if (!animal) {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.title}>Animal não encontrado</Text>
      </SafeAreaView>
    );
  }

  type MonthlyDataItem = {
    month: string;
    weight: number;
    production?: number;
    costs: number;
    revenue: number;
  };

  const renderMonthlyData = ({ item, index }: { item: MonthlyDataItem; index: number }) => (
    <Animated.View
      entering={FadeInUp.duration(500).delay(index * 100)}
      style={styles.dataCard}
    >
      <Text style={styles.dataText}>Mês: {item.month}</Text>
      <Text style={styles.dataText}>Peso: {item.weight} kg</Text>
      {item.production !== undefined && <Text style={styles.dataText}>Produção: {item.production} L</Text>}
      <Text style={styles.dataText}>Custos: R$ {item.costs.toFixed(2)}</Text>
      <Text style={styles.dataText}>Receita: R$ {item.revenue.toFixed(2)}</Text>
    </Animated.View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>{animal.name}</Text>
      <View style={styles.infoCard}>
        <Text style={styles.infoText}>ID: {animal.identificationNumber}</Text>
        <Text style={styles.infoText}>
          Espécie: {animal.species === 'cattle' ? 'Gado' : animal.species === 'chicken' ? 'Galinha' : 'Porco'}
        </Text>
        <Text style={styles.infoText}>Gênero: {animal.gender === 'male' ? 'Macho' : 'Fêmea'}</Text>
        <Text style={styles.infoText}>
          Propósito: {animal.purpose === 'breeding' ? 'Procriação' : animal.purpose === 'sale' ? 'Venda' : 'Engorda'}
        </Text>
      </View>
      <Text style={styles.subtitle}>Acompanhamento Mensal</Text>
      <FlatList
        data={animal.monthlyData || []}
        renderItem={renderMonthlyData}
        keyExtractor={(item) => item.month}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
    padding: theme.spacing.sm,
  },
  title: {
    ...theme.typography.title,
    color: theme.colors.primary,
    margin: theme.spacing.sm,
    textAlign: 'center',
  },
  subtitle: {
    ...theme.typography.subtitle,
    color: theme.colors.text,
    marginVertical: theme.spacing.sm,
  },
  infoCard: {
    marginHorizontal: theme.spacing.sm,
    padding: theme.spacing.sm,
    borderRadius: theme.borderRadius.medium,
    backgroundColor: theme.colors.card,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 2,
  },
  infoText: {
    ...theme.typography.body,
    color: theme.colors.text,
    marginVertical: theme.spacing.xs,
  },
  dataCard: {
    marginHorizontal: theme.spacing.sm,
    marginVertical: theme.spacing.xs,
    padding: theme.spacing.sm,
    borderRadius: theme.borderRadius.medium,
    backgroundColor: theme.colors.card,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 2,
  },
  dataText: {
    ...theme.typography.body,
    color: theme.colors.text,
  },
  listContent: {
    paddingBottom: theme.spacing.xl,
  },
});