import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, SafeAreaView, Alert } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { LinearGradient } from 'expo-linear-gradient';
import { useFarmContext } from '../contexts/FarmContext';
import { useAnimalContext } from '../contexts/AnimalContext';
import { theme } from '../theme';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import * as Print from 'expo-print';
import * as Sharing from 'expo-sharing';
import * as FileSystem from 'expo-file-system';
import { mockFarmData, mockAnimals } from '../mocks/reportData';
import { ReportFilters, MonthlyFarmData, Animal } from '../types';

export default function ReportScreen() {
  const { selectedFarm } = useFarmContext();
  const { animals } = useAnimalContext();
  const [filters, setFilters] = useState<ReportFilters>({
    type: 'general',
    period: 'monthly',
    year: new Date().getFullYear(),
    animalId: undefined,
  });

  const years = Array.from({ length: 5 }, (_, i) => new Date().getFullYear() - i);

  const generateGeneralReport = async (data: MonthlyFarmData[], animals: Animal[]) => {
    let content = `Relatório Geral - ${selectedFarm?.name}\nPeríodo: ${filters.period === 'monthly' ? `Mês ${filters.year}` : `Ano ${filters.year}`}\n\n`;

    content += 'Resumo Financeiro\n';
    let totalEarnings = 0;
    let totalExpenses = 0;
    data.forEach((monthData) => {
      if (monthData.month.startsWith(filters.year.toString())) {
        totalEarnings += monthData.earnings;
        monthData.expenses.forEach((exp) => (totalExpenses += exp.amount));
        content += `Mês: ${monthData.month}\n`;
        content += `Ganhos: R$${monthData.earnings}\n`;
        content += `Gastos:\n`;
        monthData.expenses.forEach((exp) => {
          content += `  - ${exp.description}: R$${exp.amount} (${exp.date})\n`;
        });
        content += `Produção: ${monthData.production.milk || 0}L leite, ${monthData.production.eggs || 0} ovos\n\n`;
      }
    });
    content += `Total Ganhos: R$${totalEarnings}\nTotal Gastos: R$${totalExpenses}\n\n`;

    content += 'Relatório por Animal\n';
    animals.forEach((animal) => {
      content += `Animal: ${animal.name} (${animal.identificationNumber})\n`;
      animal.monthlyData.forEach((data) => {
        if (data.month.startsWith(filters.year.toString())) {
          content += `  Mês: ${data.month}\n`;
          content += `  Peso: ${data.weight}kg\n`;
          content += `  Produção: ${data.production}${animal.species === 'cattle' ? 'L leite' : ' ovos'}\n`;
          content += `  Ganhos: R$${data.earnings}\n`;
          content += `  Gastos:\n`;
          data.expenses.forEach((exp) => {
            content += `    - ${exp.description}: R$${exp.amount} (${exp.date})\n`;
          });
        }
      });
      content += '\n';
    });

    return content;
  };

  const generatePrecipitationReport = async (data: MonthlyFarmData[]) => {
    let content = `Relatório de Precipitação - ${selectedFarm?.name}\nPeríodo: ${filters.period === 'monthly' ? `Mês ${filters.year}` : `Ano ${filters.year}`}\n\n`;

    const seasons = {
      summer: [12, 1, 2],
      autumn: [3, 4, 5],
      winter: [6, 7, 8],
      spring: [9, 10, 11],
    };

    if (filters.period === 'monthly') {
      const monthData = data.find((d) => d.month === `${filters.year}-01`);
      content += `Precipitação em Janeiro ${filters.year}: ${monthData?.precipitation || 0}mm\n`;
    } else {
      const yearlyData = data.filter((d) => d.month.startsWith(filters.year.toString()));
      let totalPrecipitation = 0;
      content += 'Precipitação por Mês:\n';
      yearlyData.forEach((monthData) => {
        totalPrecipitation += monthData.precipitation;
        content += `  ${monthData.month}: ${monthData.precipitation}mm\n`;
      });
      content += `\nTotal Anual: ${totalPrecipitation}mm\n\n`;

      content += 'Precipitação por Estação:\n';
      for (const [season, months] of Object.entries(seasons)) {
        const seasonPrecipitation = yearlyData
          .filter((d) => {
            const month = parseInt(d.month.split('-')[1]);
            return months.includes(month);
          })
          .reduce((sum, d) => sum + d.precipitation, 0);
        content += `  ${season.charAt(0).toUpperCase() + season.slice(1)}: ${seasonPrecipitation}mm\n`;
      }
    }

    return content;
  };

  const generateAnimalsGeneralReport = async (animals: Animal[]) => {
    let content = `Relatório Geral de Animais - ${selectedFarm?.name}\nPeríodo: ${filters.period === 'monthly' ? `Mês ${filters.year}` : `Ano ${filters.year}`}\n\n`;

    let totalProduction = 0;
    let totalEarnings = 0;
    let totalExpenses = 0;

    animals.forEach((animal) => {
      content += `Animal: ${animal.name} (${animal.identificationNumber})\n`;
      animal.monthlyData.forEach((data) => {
        if (data.month.startsWith(filters.year.toString())) {
          totalProduction += data.production;
          totalEarnings += data.earnings;
          data.expenses.forEach((exp) => (totalExpenses += exp.amount));
          content += `  Mês: ${data.month}\n`;
          content += `  Produção: ${data.production}${animal.species === 'cattle' ? 'L leite' : ' ovos'}\n`;
          content += `  Ganhos: R$${data.earnings}\n`;
          content += `  Gastos:\n`;
          data.expenses.forEach((exp) => {
            content += `    - ${exp.description}: R$${exp.amount} (${exp.date})\n`;
          });
        }
      });
      content += '\n';
    });

    content += `Total Produção: ${totalProduction}${selectedFarm?.type === 'milk' ? 'L leite' : ' ovos'}\n`;
    content += `Total Ganhos: R$${totalEarnings}\n`;
    content += `Total Gastos: R$${totalExpenses}\n`;

    return content;
  };

  const generateAnimalSpecificReport = async (animal: Animal) => {
    let content = `Relatório de Animal - ${animal.name} (${animal.identificationNumber})\nFazenda: ${selectedFarm?.name}\nPeríodo: ${filters.period === 'monthly' ? `Mês ${filters.year}` : `Ano ${filters.year}`}\n\n`;

    content += `Espécie: ${animal.species === 'cattle' ? 'Gado' : animal.species === 'chicken' ? 'Galinha' : 'Porco'}\n`;
    content += `Gênero: ${animal.gender === 'male' ? 'Macho' : 'Fêmea'}\n`;
    content += `Propósito: ${animal.purpose === 'breeding' ? 'Procriação' : animal.purpose === 'sale' ? 'Venda' : 'Engorda'}\n\n`;

    content += 'Histórico:\n';
    animal.monthlyData.forEach((data) => {
      if (data.month.startsWith(filters.year.toString())) {
        content += `  Mês: ${data.month}\n`;
        content += `  Peso: ${data.weight}kg\n`;
        content += `  Produção: ${data.production}${animal.species === 'cattle' ? 'L leite' : ' ovos'}\n`;
        content += `  Ganhos: R$${data.earnings}\n`;
        content += `  Gastos:\n`;
        data.expenses.forEach((exp) => {
          content += `    - ${exp.description}: R$${exp.amount} (${exp.date})\n`;
        });
        content += '\n';
      }
    });

    return content;
  };

  const generatePDF = async () => {
    console.log('Iniciando generatePDF');
    console.log('selectedFarm:', selectedFarm);
    console.log('filters:', filters);

    if (!selectedFarm) {
      console.log('Erro: selectedFarm é undefined');
      Alert.alert('Erro', 'Selecione uma fazenda antes de gerar o relatório.');
      return;
    }

    if (filters.type === 'animal_specific' && !filters.animalId) {
      console.log('Erro: animalId é undefined');
      Alert.alert('Erro', 'Selecione um animal para o relatório específico.');
      return;
    }

    let content = '';
    const farmData = mockFarmData;
    const animalsData = mockAnimals;
    console.log('farmData:', farmData);
    console.log('animalsData:', animalsData);

    try {
      switch (filters.type) {
        case 'general':
          console.log('Gerando relatório geral');
          content = await generateGeneralReport(farmData, animalsData);
          break;
        case 'precipitation':
          console.log('Gerando relatório de precipitação');
          content = await generatePrecipitationReport(farmData);
          break;
        case 'animals_general':
          console.log('Gerando relatório geral de animais');
          content = await generateAnimalsGeneralReport(animalsData);
          break;
        case 'animal_specific':
          console.log('Gerando relatório específico de animal');
          const animal = animalsData.find((a) => a.id === filters.animalId);
          if (animal) {
            content = await generateAnimalSpecificReport(animal);
          } else {
            console.log('Erro: Animal não encontrado');
            Alert.alert('Erro', 'Animal não encontrado.');
            return;
          }
          break;
      }

      console.log('Conteúdo gerado:', content);

      const htmlContent = `
        <html>
          <head>
            <style>
              body { font-family: Arial, sans-serif; padding: 20px; }
              h1 { font-size: 18px; }
              p { font-size: 14px; white-space: pre-wrap; }
            </style>
          </head>
          <body>
            <h1>
              ${filters.type === 'general' ? `Relatório Geral - ${selectedFarm.name}` : ''}
              ${filters.type === 'precipitation' ? `Relatório de Precipitação - ${selectedFarm.name}` : ''}
              ${filters.type === 'animals_general' ? `Relatório Geral de Animais - ${selectedFarm.name}` : ''}
              ${filters.type === 'animal_specific' ? `Relatório de Animal` : ''}
            </h1>
            <p>Período: ${filters.period === 'monthly' ? `Mês ${filters.year}` : `Ano ${filters.year}`}</p>
            <p>${content.replace(/\n/g, '<br>')}</p>
          </body>
        </html>
      `;

      console.log('HTML gerado:', htmlContent);

      const pdfUri = `${FileSystem.cacheDirectory}relatorio_${filters.type}_${filters.year}.pdf`;
      console.log('pdfUri:', pdfUri);

      const { uri } = await Print.printToFileAsync({ html: htmlContent });
      console.log('URI do PDF gerado:', uri);

      await FileSystem.moveAsync({ from: uri, to: pdfUri });
      console.log('PDF movido para:', pdfUri);

      Alert.alert('Sucesso', `PDF gerado em: ${pdfUri}`);
      if (await Sharing.isAvailableAsync()) {
        console.log('Compartilhando PDF');
        await Sharing.shareAsync(pdfUri);
      } else {
        console.log('Compartilhamento não disponível');
        Alert.alert('Erro', 'Compartilhamento não disponível nesta plataforma.');
      }
    } catch (error: unknown) { // Corrigido: Tipa error como unknown
      console.error('Erro ao gerar PDF:', error);
      if (error instanceof Error) {
        Alert.alert('Erro', `Falha ao gerar o PDF: ${error.message}`);
      } else {
        Alert.alert('Erro', 'Falha ao gerar o PDF.');
      }
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Gerar Relatórios</Text>
      <View style={styles.form}>
        <Text style={styles.label}>Tipo de Relatório</Text>
        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={filters.type}
            onValueChange={(value) => setFilters({ ...filters, type: value })}
            style={styles.picker}
          >
            <Picker.Item label="Geral" value="general" />
            <Picker.Item label="Precipitação" value="precipitation" />
            <Picker.Item label="Animais Geral" value="animals_general" />
            <Picker.Item label="Animal Específico" value="animal_specific" />
          </Picker>
        </View>
        <Text style={styles.label}>Período</Text>
        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={filters.period}
            onValueChange={(value) => setFilters({ ...filters, period: value })}
            style={styles.picker}
          >
            <Picker.Item label="Mensal" value="monthly" />
            <Picker.Item label="Anual" value="annual" />
          </Picker>
        </View>
        <Text style={styles.label}>Ano</Text>
        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={filters.year}
            onValueChange={(value) => setFilters({ ...filters, year: value })}
            style={styles.picker}
          >
            {years.map((year) => (
              <Picker.Item key={year} label={year.toString()} value={year} />
            ))}
          </Picker>
        </View>
        {filters.type === 'animal_specific' && (
          <>
            <Text style={styles.label}>Animal</Text>
            <View style={styles.pickerContainer}>
              <Picker
                selectedValue={filters.animalId}
                onValueChange={(value) => setFilters({ ...filters, animalId: value })}
                style={styles.picker}
              >
                <Picker.Item label="Selecione um animal" value={undefined} />
                {animals
                  .filter((a) => a.farmId === selectedFarm?.id)
                  .map((animal) => (
                    <Picker.Item
                      key={animal.id}
                      label={`${animal.name} (${animal.identificationNumber})`}
                      value={animal.id}
                    />
                  ))}
              </Picker>
            </View>
          </>
        )}
      </View>
      <TouchableOpacity style={styles.generateButton} onPress={generatePDF}>
        <LinearGradient
          colors={[theme.colors.gradientStart, theme.colors.gradientEnd]}
          style={styles.gradientButton}
        >
          <Text style={styles.generateButtonText}>Gerar PDF</Text>
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
    fontWeight: '600' as const,
  },
  pickerContainer: {
    backgroundColor: theme.colors.card,
    borderRadius: theme.borderRadius.medium,
    boxShadow: '0px 1px 4px rgba(0, 0, 0, 0.1)', // Corrigido: Substitui shadow*
    elevation: 2,
  },
  picker: {
    ...theme.typography.body,
    color: theme.colors.text,
  },
  generateButton: {
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
  generateButtonText: {
    ...theme.typography.subtitle,
    color: '#fff',
    fontWeight: 'bold' as const,
  },
});