export interface Weather {
  day: string;
  temperature: number;
  condition: string;
  precipitation: number;
}

export interface PieChartData {
  name: string;
  value: number;
  color: string;
  legendFontColor: string;
  legendFontSize: number;
}

export interface Farm {
  id: string;
  name: string;
  location: string;
  type: 'milk' | 'eggs';
}

export interface Animal {
  id: string;
  name: string;
  species: 'cattle' | 'chicken' | 'pig';
  farmId: string;
  gender: 'male' | 'female';
  purpose: 'breeding' | 'sale' | 'fattening';
  identificationNumber: string;
  monthlyData: MonthlyAnimalData[];
}

export interface Expense {
  id: string;
  description: string;
  amount: number;
  date: string; // Formato ISO (ex.: '2025-01-15')
}

export interface MonthlyAnimalData {
  month: string; // ex.: '2025-01'
  weight: number; // em kg
  production: number; // leite (litros) ou ovos (unidades)
  earnings: number; // ganhos em R$
  expenses: Expense[]; // gastos detalhados
}

export interface MonthlyFarmData {
  month: string; // ex.: '2025-01'
  earnings: number; // ganhos totais
  expenses: Expense[]; // gastos totais
  production: {
    milk?: number; // litros
    eggs?: number; // unidades
  };
  precipitation: number; // mm de chuva
}

export interface ReportFilters {
  type: 'general' | 'precipitation' | 'animals_general' | 'animal_specific';
  period: 'monthly' | 'annual';
  year: number;
  animalId?: string; // para relatório de animal específico
}