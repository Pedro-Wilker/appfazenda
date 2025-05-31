export interface Farm {
  id: string;
  name: string;
  location: string;
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