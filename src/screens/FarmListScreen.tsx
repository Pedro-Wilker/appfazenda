import React from 'react';
import { StyleSheet, Text, View, SafeAreaView } from 'react-native';
import { theme } from '../theme';

export default function FarmListScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Lista de Fazendas</Text>
      <Text style={styles.subtitle}>Nenhuma fazenda cadastrada ainda.</Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
    padding: theme.spacing.md,
  },
  title: {
    ...theme.typography.title,
    color: theme.colors.primary,
    marginBottom: theme.spacing.sm,
  },
  subtitle: {
    ...theme.typography.body,
    color: theme.colors.textSecondary,
  },
});