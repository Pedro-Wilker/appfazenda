import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, Platform } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { LinearGradient } from 'expo-linear-gradient';
import { useFarmContext } from '../contexts/FarmContext';
import { theme } from '../theme';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { useNavigation } from '@react-navigation/native';
import { Farm } from '../types';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function AddFarmScreen() {
  const { addFarm } = useFarmContext();
  const navigation = useNavigation();
  const [name, setName] = useState('');
  const [location, setLocation] = useState('');
  const [type, setType] = useState<'milk' | 'eggs'>('milk');

  const handleSave = () => {
    if (!name || !location) {
      Alert.alert('Todos os campos são obrigatórios', 'Por favor, preencha todos os campos.');
      return;
    }

    const newFarm: Farm = {
      id: Math.random().toString(36).substring(2),
      name,
      location,
      type,
    };

    addFarm(newFarm);
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Criar Nova Fazenda</Text>
      <View style={styles.form}>
        <Text style={styles.label}>Nome da Fazenda</Text>
        <TextInput
          style={styles.input}
          placeholder="Ex.: Fazenda Leite"
          value={name}
          onChangeText={setName}
        />
        <Text style={styles.label}>Local</Text>
        <TextInput
          style={styles.input}
          placeholder="Ex.: Minas Gerais"
          value={location}
          onChangeText={setLocation}
        />
        <Text style={styles.label}>Tipo de Produção</Text>
        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={type}
            onValueChange={(value) => setType(value as 'milk' | 'eggs')}
            style={styles.picker}
          >
            <Picker.Item label="Leite" value="milk" />
            <Picker.Item label="Ovos" value="eggs" />
          </Picker>
        </View>
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