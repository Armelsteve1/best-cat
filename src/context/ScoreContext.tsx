import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Cat } from '../types/Cat';

// Créer un type pour le contexte
interface ScoreContextType {
  cats: Cat[];
  incrementScore: (id: string) => void;
  setCats: React.Dispatch<React.SetStateAction<Cat[]>>;
}

// Créer le contexte
const ScoreContext = createContext<ScoreContextType | undefined>(undefined);

// Provider pour le contexte
export const ScoreProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [cats, setCats] = useState<Cat[]>([]);

  const incrementScore = (id: string) => {
    setCats((prevCats) =>
      prevCats.map((cat) =>
        cat.id === id ? { ...cat, score: cat.score + 1 } : cat
      )
    );
  };

  return (
    <ScoreContext.Provider value={{ cats, incrementScore, setCats }}>
      {children}
    </ScoreContext.Provider>
  );
};

// Hook pour utiliser le contexte
export const useScore = (): ScoreContextType => {
  const context = useContext(ScoreContext);
  if (!context) {
    throw new Error('useScore must be used within a ScoreProvider');
  }
  return context;
};
