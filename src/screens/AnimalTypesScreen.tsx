import React from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity, SafeAreaView } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useFarmContext } from '../contexts/FarmContext';
import { theme } from '../theme';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import Animated, { FadeInRight } from 'react-native-reanimated';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AppNavigator';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

type AnimalType = {
  id: string;
  name: string;
  species: 'cattle' | 'chicken' | 'pig';
  icon: string;
};

const animalTypes: AnimalType[] = [
  { id: '1', name: 'Gado', species: 'cattle', icon: 'cow' },
  { id: '2', name: 'Galinhas', species: 'chicken', icon: 'egg' },
  { id: '3', name: 'Porcos', species: 'pig', icon: 'pig' },
];

export default function AnimalTypesScreen() {
  const { selectedFarm } = useFarmContext();
  const navigation = useNavigation<NavigationProp>();

  const renderAnimalType = ({ item, index }: { item: AnimalType; index: number }) => (
    <TouchableOpacity
      onPress={() => navigation.navigate('AnimalList', { species: item.species })}
      activeOpacity={0.7}
    >
      <Animated.View
        entering={FadeInRight.duration(500).delay(index * 100)}
        style={styles.animalTypeCard}
      >
        <Icon name={item.icon} size={24} color={theme.colors.primary} style={styles.icon} />
        <Text style={styles.text}>{item.name}</Text>
      </Animated.View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={animalTypes}
        renderItem={renderAnimalType}
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
  animalTypeCard: {
    flexDirection: 'row',
    alignItems: 'center',
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
  icon: {
    marginRight: theme.spacing.sm,
  },
  text: {
    ...theme.typography.title,
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