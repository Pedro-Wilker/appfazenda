import { MonthlyFarmData, MonthlyAnimalData, Expense, Animal } from '../types';

export const mockAnimals: Animal[] = [
  {
    id: 'animal1',
    name: 'Mimosa',
    species: 'cattle',
    farmId: 'farm1',
    gender: 'female',
    purpose: 'breeding',
    identificationNumber: 'BR123456',
    monthlyData: [
      {
        month: '2025-01',
        weight: 500,
        production: 300, // litros de leite
        earnings: 900,
        expenses: [
          { id: 'exp1', description: 'Ração', amount: 200, date: '2025-01-10' },
          { id: 'exp2', description: 'Veterinário', amount: 150, date: '2025-01-15' },
        ],
      },
      {
        month: '2024-12',
        weight: 490,
        production: 290,
        earnings: 870,
        expenses: [
          { id: 'exp3', description: 'Ração', amount: 190, date: '2024-12-05' },
        ],
      },
      // Dados para outros meses e anos
    ],
  },
  {
    id: 'animal2',
    name: 'Clara',
    species: 'chicken',
    farmId: 'farm1',
    gender: 'female',
    purpose: 'sale',
    identificationNumber: 'BR789012',
    monthlyData: [
      {
        month: '2025-01',
        weight: 2,
        production: 25, // ovos
        earnings: 50,
        expenses: [
          { id: 'exp4', description: 'Ração', amount: 20, date: '2025-01-12' },
        ],
      },
    ],
  },
];

export const mockFarmData: MonthlyFarmData[] = [
  {
    month: '2025-01',
    earnings: 10000,
    expenses: [
      { id: 'exp5', description: 'Manutenção', amount: 1000, date: '2025-01-03' },
      { id: 'exp6', description: 'Funcionários', amount: 3000, date: '2025-01-20' },
    ],
    production: { milk: 5000, eggs: 1500 },
    precipitation: 120, // mm
  },
  {
    month: '2024-12',
    earnings: 9500,
    expenses: [
      { id: 'exp7', description: 'Equipamentos', amount: 2000, date: '2024-12-10' },
    ],
    production: { milk: 4800, eggs: 1400 },
    precipitation: 80,
  },
  // Dados para outros meses e anos
];