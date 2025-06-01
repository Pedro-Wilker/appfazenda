export interface Farm {
  id: string;
  name: string;
  location: string;
  type: 'milk' | 'eggs'; // Adicionado
}

export interface Weather {
  day: string;
  temperature: number;
  condition: string;
  precipitation: number;
}

export interface ExpenseData {
  day: string;
  amount: number;
}

export interface MilkProductionData {
  day: string;
  dailyLiters: number;
  monthlyLiters: number;
}

export interface BalanceData {
  label: string;
  value: number;
}

export interface PieChartData { // Adicionado
  name: string;
  value: number;
  color: string;
  legendFontColor: string;
  legendFontSize: number;
}

interface Animal {
  id: string;
  name: string;
  species: 'cattle' | 'chicken' | 'pig'; // Atualizado para suportar mais tipos
  farmId: string;
  gender: 'male' | 'female';
  purpose: 'breeding' | 'sale' | 'fattening';
  identificationNumber: string;
  monthlyData?: Array<{
    month: string; // ex.: "2025-06"
    weight: number; // em kg
    production?: number; // ex.: litros de leite
    costs: number; // em R$
    revenue: number; // em R$
  }>;
}