import React, { createContext, useState, useContext, ReactNode } from 'react';
import { Farm } from '../types';

interface FarmContextType {
  farms: Farm[];
  selectedFarm: Farm | null;
  setSelectedFarm: (farm: Farm | null) => void;
  addFarm: (farm: Farm) => void;
}

const FarmContext = createContext<FarmContextType | undefined>(undefined);

// Fazendas iniciais (substitui mockFarms)
const initialFarms: Farm[] = [
  { id: '1', name: 'Fazenda Leite', location: 'Minas Gerais', type: 'milk' },
  { id: '2', name: 'Fazenda Ovos', location: 'São Paulo', type: 'eggs' },
];

export function FarmProvider({ children }: { children: ReactNode }) {
  const [farms, setFarms] = useState<Farm[]>(initialFarms);
  const [selectedFarm, setSelectedFarm] = useState<Farm | null>(null);

  const addFarm = (farm: Farm) => {
    setFarms((prev) => [...prev, farm]);
  };

  return (
    <FarmContext.Provider value={{ farms, selectedFarm, setSelectedFarm, addFarm }}>
      {children}
    </FarmContext.Provider>
  );
}

export function useFarmContext() {
  const context = useContext(FarmContext);
  if (context === undefined) {
    throw new Error('useFarmContext deve ser usado dentro de um FarmProvider');
  }
  return context;
}