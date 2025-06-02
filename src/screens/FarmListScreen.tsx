import React from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity, SafeAreaView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useFarmContext } from '../contexts/FarmContext';
import { theme } from '../theme';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import Animated, { FadeInRight } from 'react-native-reanimated';
import { Farm } from '../types';
import { useNavigation } from '@react-navigation/native';
import type { StackNavigationProp } from '@react-navigation/stack';
type RootStackParamList = {
  FarmList: undefined;
  AddFarm: undefined;
  // add other routes here if needed
};

export default function FarmListScreen() {
  const { farms, selectedFarm, setSelectedFarm } = useFarmContext();
  const navigation = useNavigation<StackNavigationProp<RootStackParamList, 'FarmList'>>();

  const renderFarm = ({ item, index }: { item: Farm; index: number }) => {
    const isSelected = selectedFarm?.id === item.id;
    return (
      <TouchableOpacity
        onPress={() => setSelectedFarm(item)}
        activeOpacity={0.7}
      >
        <Animated.View
          entering={FadeInRight.duration(500).delay(index * 100)}
          style={[styles.farmCard, isSelected && styles.selectedFarmCard]}
        >
          <LinearGradient
            colors={[theme.colors.gradientStart, theme.colors.gradientEnd]}
            style={styles.gradient}
          >
            <Text style={styles.text}>{item.name}</Text>
            <Text style={styles.location}>{item.location}</Text>
            <Text style={styles.type}>
              {item.type === 'milk' ? 'Produção de Leite' : 'Produção de Ovos'}
            </Text>
          </LinearGradient>
        </Animated.View>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={farms}
        renderItem={renderFarm}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      />
      <TouchableOpacity
        style={styles.floatingButton}
        onPress={() => navigation.navigate('AddFarm')}
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
  farmCard: {
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
  selectedFarmCard: {
    borderWidth: 2,
    borderColor: theme.colors.primary,
  },
  gradient: {
    padding: theme.spacing.sm,
  },
  text: {
    ...theme.typography.title,
    color: '#fff',
  },
  location: {
    ...theme.typography.body,
    color: '#fff',
  },
  type: {
    ...theme.typography.body,
    fontWeight: 'bold',
    color: '#fff',
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
    shadowOpacity: 0,
    shadowRadius: 2,
    elevation: 6,
  },
});