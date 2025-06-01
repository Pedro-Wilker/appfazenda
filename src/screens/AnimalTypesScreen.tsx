import React from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity, SafeAreaView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useFarmContext } from '../contexts/FarmContext';
import { useAnimalContext } from '../contexts/AnimalContext';
import { theme } from '../theme';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import Animated, { FadeInRight } from 'react-native-reanimated';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

type RootStackParamList = {
  AnimalTypes: undefined;
  AnimalList: { species: 'cattle' | 'chicken' | 'pig' };
  // Outras rotas
};

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

const animalTypes = [
  { id: 'cattle', name: 'Gado', icon: 'cow' },
  { id: 'chicken', name: 'Galinhas', icon: 'egg' },
  { id: 'pig', name: 'Porcos', icon: 'pig' },
];

export default function AnimalTypesScreen() {
  const { selectedFarm } = useFarmContext();
  const { animals } = useAnimalContext();
  const navigation = useNavigation<NavigationProp>();

  const farmAnimalTypes = animalTypes.filter((type) =>
    animals.some((animal) => animal.species === type.id && animal.farmId === selectedFarm?.id)
  );

  const renderAnimalType = ({ item, index }: { item: typeof animalTypes[0]; index: number }) => (
    <TouchableOpacity
      onPress={() => navigation.navigate('AnimalList', { species: item.id as 'cattle' | 'chicken' | 'pig' })}
      activeOpacity={0.7}
    >
      <Animated.View
        entering={FadeInRight.duration(500).delay(index * 100)}
        style={styles.card}
      >
        <LinearGradient
          colors={[theme.colors.gradientStart, theme.colors.gradientEnd]}
          style={styles.gradient}
        >
          <Text style={styles.text}>{item.name}</Text>
        </LinearGradient>
      </Animated.View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>
        Tipos de Animais {selectedFarm ? `da ${selectedFarm.name}` : ''}
      </Text>
      <FlatList
        data={farmAnimalTypes}
        renderItem={renderAnimalType}
        keyExtractor={(item) => item.id}
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
  listContent: {
    paddingBottom: theme.spacing.xl,
  },
  card: {
    marginHorizontal: theme.spacing.sm,
    marginVertical: theme.spacing.xs,
    borderRadius: theme.borderRadius.medium,
    backgroundColor: theme.colors.card,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 2,
    overflow: 'hidden',
    width: wp('92%'),
    alignSelf: 'center',
  },
  gradient: {
    padding: theme.spacing.sm,
  },
  text: {
    ...theme.typography.title,
    color: '#fff',
  },
});