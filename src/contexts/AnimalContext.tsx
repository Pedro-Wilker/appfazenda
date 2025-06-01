import React, { createContext, useContext, useState, ReactNode } from 'react';

interface Animal {
  id: string;
  name: string;
  species: 'cattle' | 'chicken' | 'pig';
  farmId: string;
  gender: 'male' | 'female';
  purpose: 'breeding' | 'sale' | 'fattening';
  identificationNumber: string;
  monthlyData?: Array<{
    month: string;
    weight: number;
    production?: number;
    costs: number;
    revenue: number;
  }>;
}

interface AnimalContextType {
  animals: Animal[];
  addAnimal: (animal: Animal) => void;
}

const AnimalContext = createContext<AnimalContextType | undefined>(undefined);

export const AnimalProvider = ({ children }: { children: ReactNode }) => {
  const [animals, setAnimals] = useState<Animal[]>([
    // Dados mock para teste
    {
      id: '1',
      name: 'Mimosa',
      species: 'cattle',
      farmId: '1',
      gender: 'female',
      purpose: 'breeding',
      identificationNumber: 'BR123456',
      monthlyData: [
        { month: '2025-06', weight: 500, production: 600, costs: 1000, revenue: 1800 },
      ],
    },
    {
      id: '2',
      name: 'Clara',
      species: 'chicken',
      farmId: '2',
      gender: 'female',
      purpose: 'sale',
      identificationNumber: 'BR789012',
      monthlyData: [
        { month: '2025-06', weight: 2, production: 20, costs: 50, revenue: 100 },
      ],
    },
  ]);

  const addAnimal = (animal: Animal) => {
    setAnimals((prev) => [...prev, animal]);
  };

  return (
    <AnimalContext.Provider value={{ animals, addAnimal }}>
      {children}
    </AnimalContext.Provider>
  );
};

export const useAnimalContext = () => {
  const context = useContext(AnimalContext);
  if (!context) {
    throw new Error('useAnimalContext must be used within an AnimalProvider');
  }
  return context;
};