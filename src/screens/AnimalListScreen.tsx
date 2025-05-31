import React from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useFarmContext } from '../contexts/FarmContext';
import { theme } from '../theme';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import Animated, { FadeInRight } from 'react-native-reanimated';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootTabParamList } from '../navigation/AppNavigator';

interface Animal {
  id: string;
  name: string;
  species: 'cow' | 'chicken';
  farmId: string;
}

const mockAnimals: Animal[] = [
  { id: '1', name: 'Mimosa', species: 'cow', farmId: '1' },
  { id: '2', name: 'Clara', species: 'chicken', farmId: '2' },
];

type NavigationProp = NativeStackNavigationProp<RootTabParamList>;

export default function AnimalListScreen() {
  const { selectedFarm } = useFarmContext();
  const navigation = useNavigation<NavigationProp>();

  const farmAnimals = mockAnimals.filter((animal) => animal.farmId === selectedFarm?.id);

  const renderAnimal = ({ item, index }: { item: Animal; index: number }) => (
    <Animated.View
      entering={FadeInRight.duration(500).delay(index * 100)}
      style={styles.animalCard}
    >
      <Text style={styles.text}>{item.name}</Text>
      <Text style={styles.species}>
        {item.species === 'cow' ? 'Vaca' : 'Galinha'}
      </Text>
    </Animated.View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>
        Animais {selectedFarm ? `da ${selectedFarm.name}` : ''}
      </Text>
      <FlatList
        data={farmAnimals}
        renderItem={renderAnimal}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      />
      <TouchableOpacity
        style={styles.floatingButton}
        onPress={() => navigation.navigate('AddAnimal')}
      >
        <Icon name="plus" size={24} color="#fff" />
      </TouchableOpacity>
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
  animalCard: {
    marginHorizontal: theme.spacing.sm,
    marginVertical: theme.spacing.xs,
    borderRadius: theme.borderRadius.medium,
    backgroundColor: theme.colors.card,
    padding: theme.spacing.sm,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 2,
    width: wp('92%'),
    alignSelf: 'center',
  },
  text: {
    ...theme.typography.title,
    color: theme.colors.text,
  },
  species: {
    ...theme.typography.body,
    color: theme.colors.text,
  },
  floatingButton: {
    position: 'absolute',
    bottom: theme.spacing.lg,
    right: theme.spacing.sm,
    backgroundColor: theme.colors.primary,
    borderRadius: 30,
    width: 60,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 6,
  },
});