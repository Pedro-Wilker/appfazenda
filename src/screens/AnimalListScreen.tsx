import React, { useState } from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity, SafeAreaView } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useFarmContext } from '../contexts/FarmContext';
import { useAnimalContext } from '../contexts/AnimalContext';
import type { Animal } from '../contexts/AnimalContext';
import { theme } from '../theme';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import Animated, { FadeInRight } from 'react-native-reanimated';
import { useNavigation, useRoute, RouteProp as NavigationRouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AppNavigator';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;
type AnimalListRouteProp = NavigationRouteProp<RootStackParamList, 'AnimalList'>;

export default function AnimalListScreen() {
  const { selectedFarm } = useFarmContext();
  const { animals } = useAnimalContext();
  const navigation = useNavigation<NavigationProp>();
  const route = useRoute<AnimalListRouteProp>();
  const { species } = route.params;

  const [genderFilter, setGenderFilter] = useState<'all' | 'male' | 'female'>('all');
  const [purposeFilter, setPurposeFilter] = useState<'all' | 'breeding' | 'sale' | 'fattening'>('all');

  const farmAnimals = animals.filter(
    (animal) =>
      animal.farmId === selectedFarm?.id &&
      animal.species === species &&
      (genderFilter === 'all' || animal.gender === genderFilter) &&
      (purposeFilter === 'all' || animal.purpose === purposeFilter)
  );

  const renderAnimal = ({ item, index }: { item: Animal; index: number }) => (
    <TouchableOpacity
      onPress={() => navigation.navigate('AnimalDetails', { animalId: item.id })}
      activeOpacity={0.7}
    >
      <Animated.View
        entering={FadeInRight.duration(500).delay(index * 100)}
        style={styles.animalCard}
      >
        <Text style={styles.text}>{item.name}</Text>
        <Text style={styles.species}>ID: {item.identificationNumber}</Text>
        <Text style={styles.species}>
          {item.gender === 'male' ? 'Macho' : 'Fêmea'} -{' '}
          {item.purpose === 'breeding'
            ? 'Procriação'
            : item.purpose === 'sale'
            ? 'Venda'
            : 'Engorda'}
        </Text>
      </Animated.View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>
        {species === 'cattle' ? 'Gado' : species === 'chicken' ? 'Galinhas' : 'Porcos'}{' '}
        {selectedFarm ? `da ${selectedFarm.name}` : ''}
      </Text>
      <View style={styles.filterContainer}>
        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={genderFilter}
            onValueChange={(value) => setGenderFilter(value)}
            style={styles.picker}
          >
            <Picker.Item label="Todos os Gêneros" value="all" />
            <Picker.Item label="Macho" value="male" />
            <Picker.Item label="Fêmea" value="female" />
          </Picker>
        </View>
        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={purposeFilter}
            onValueChange={(value) => setPurposeFilter(value)}
            style={styles.picker}
          >
            <Picker.Item label="Todos os Propósitos" value="all" />
            <Picker.Item label="Procriação" value="breeding" />
            <Picker.Item label="Venda" value="sale" />
            <Picker.Item label="Engorda" value="fattening" />
          </Picker>
        </View>
      </View>
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
  filterContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: theme.spacing.sm,
    marginBottom: theme.spacing.sm,
  },
  pickerContainer: {
    flex: 1,
    backgroundColor: theme.colors.card,
    borderRadius: theme.borderRadius.medium,
    marginHorizontal: theme.spacing.xs,
  },
  picker: {
    ...theme.typography.body,
    color: theme.colors.text,
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