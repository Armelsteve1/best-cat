import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Cat } from '../types/Cat';

interface ScoreContextType {
  cats: Cat[];
  matchCount: number;
  incrementScore: (id: string) => void;
  setCats: (cats: Cat[]) => void;
  incrementMatchCount: () => void;
  resetScores: () => void;
}

interface ScoreProviderProps {
  children: ReactNode;
}

const ScoreContext = createContext<ScoreContextType | undefined>(undefined);

export const ScoreProvider: React.FC<ScoreProviderProps> = ({ children }) => {
  const [cats, setCats] = useState<Cat[]>([]);
  const [matchCount, setMatchCount] = useState<number>(0);

  const incrementScore = (id: string) => {
    setCats((prevCats) =>
      prevCats.map((cat) =>
        cat.id === id ? { ...cat, score: cat.score + 1 } : cat
      )
    );
  };

  const incrementMatchCount = () => setMatchCount((prevCount) => prevCount + 1);

  const resetScores = () =>
    setCats((prevCats) => prevCats.map((cat) => ({ ...cat, score: 0 })));

  return (
    <ScoreContext.Provider
      value={{
        cats,
        matchCount,
        incrementScore,
        setCats,
        incrementMatchCount,
        resetScores,
      }}
    >
      {children}
    </ScoreContext.Provider>
  );
};

// Custom hook for accessing ScoreContext
export const useScore = (): ScoreContextType => {
  const context = useContext(ScoreContext);
  if (!context) {
    throw new Error('useScore must be used within a ScoreProvider');
  }
  return context;
};
