import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, Platform } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { LinearGradient } from 'expo-linear-gradient';
import { useFarmContext } from '../contexts/FarmContext';
import { useAnimalContext } from '../contexts/AnimalContext';
import { theme } from '../theme';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AppNavigator';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

export default function AddAnimalScreen() {
  const { selectedFarm } = useFarmContext();
  const { addAnimal } = useAnimalContext();
  const navigation = useNavigation<NavigationProp>();
  const [name, setName] = useState('');
  const [species, setSpecies] = useState<'cattle' | 'chicken' | 'pig'>('cattle');
  const [gender, setGender] = useState<'male' | 'female'>('female');
  const [purpose, setPurpose] = useState<'breeding' | 'sale' | 'fattening'>('breeding');
  const [identificationNumber, setIdentificationNumber] = useState('');

  const handleSave = () => {
    if (!name || !identificationNumber || !selectedFarm) {
      Alert.alert('Erro', 'Nome, número de identificação e fazenda são obrigatórios.');
      return;
    }

    const newAnimal = {
      id: Math.random().toString(36).substring(2),
      name,
      species,
      farmId: selectedFarm.id,
      gender,
      purpose,
      identificationNumber,
      monthlyData: [],
    };

    addAnimal(newAnimal);
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Adicionar Animal</Text>
      <View style={styles.form}>
        <Text style={styles.label}>Nome do Animal</Text>
        <TextInput
          style={styles.input}
          placeholder="Ex.: Mimosa"
          value={name}
          onChangeText={setName}
        />
        <Text style={styles.label}>Espécie</Text>
        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={species}
            onValueChange={(value) => setSpecies(value as 'cattle' | 'chicken' | 'pig')}
            style={styles.picker}
          >
            <Picker.Item label="Gado" value="cattle" />
            <Picker.Item label="Galinha" value="chicken" />
            <Picker.Item label="Porco" value="pig" />
          </Picker>
        </View>
        <Text style={styles.label}>Gênero</Text>
        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={gender}
            onValueChange={(value) => setGender(value as 'male' | 'female')}
            style={styles.picker}
          >
            <Picker.Item label="Macho" value="male" />
            <Picker.Item label="Fêmea" value="female" />
          </Picker>
        </View>
        <Text style={styles.label}>Propósito</Text>
        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={purpose}
            onValueChange={(value) => setPurpose(value as 'breeding' | 'sale' | 'fattening')}
            style={styles.picker}
          >
            <Picker.Item label="Procriação" value="breeding" />
            <Picker.Item label="Venda" value="sale" />
            <Picker.Item label="Engorda" value="fattening" />
          </Picker>
        </View>
        <Text style={styles.label}>Número de Identificação</Text>
        <TextInput
          style={styles.input}
          placeholder="Ex.: BR123456"
          value={identificationNumber}
          onChangeText={setIdentificationNumber}
        />
        <Text style={styles.label}>Fazenda</Text>
        <TextInput
          style={[styles.input, styles.disabledInput]}
          value={selectedFarm?.name || 'Nenhuma fazenda selecionada'}
          editable={false}
        />
      </View>
      <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
        <LinearGradient
          colors={[theme.colors.gradientStart, theme.colors.gradientEnd]}
          style={styles.gradientButton}
        >
          <Text style={styles.saveButtonText}>Salvar</Text>
        </LinearGradient>
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
  form: {
    marginHorizontal: theme.spacing.sm,
    gap: theme.spacing.sm,
  },
  label: {
    ...theme.typography.subtitle,
    color: theme.colors.text,
  },
  input: {
    backgroundColor: theme.colors.card,
    borderRadius: theme.borderRadius.medium,
    padding: theme.spacing.sm,
    ...theme.typography.body,
    color: theme.colors.text,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  disabledInput: {
    backgroundColor: theme.colors.card,
    color: theme.colors.textSecondary,
  },
  pickerContainer: {
    backgroundColor: theme.colors.card,
    borderRadius: theme.borderRadius.medium,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    overflow: Platform.select({ web: 'hidden', default: 'visible' }),
  },
  picker: {
    ...theme.typography.body,
    color: theme.colors.text,
    padding: theme.spacing.sm,
  },
  saveButton: {
    margin: theme.spacing.sm,
    borderRadius: theme.borderRadius.medium,
    width: wp('92%'),
    alignSelf: 'center',
    overflow: 'hidden',
  },
  gradientButton: {
    padding: theme.spacing.sm,
    alignItems: 'center',
  },
  saveButtonText: {
    ...theme.typography.subtitle,
    color: '#fff',
    fontWeight: 'bold',
  },
});