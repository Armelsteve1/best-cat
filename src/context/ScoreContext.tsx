import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Cat } from '../types/Cat';

interface ScoreContextType {
  cats: Cat[];
  matchCount: number;
  incrementScore: (id: string) => void;
  setCats: (cats: Cat[]) => void;
  incrementMatchCount: () => void;
  resetMatchCount: () => void;
}

interface ScoreProviderProps {
  children: ReactNode;
}

const ScoreContext = createContext<ScoreContextType | undefined>(undefined);

export const ScoreProvider: React.FC<ScoreProviderProps> = ({ children }) => {
  const [cats, setCats] = useState<Cat[]>([]);

  const [matchCount, setMatchCount] = useState<number>(() => {
    const storedMatchCount = localStorage.getItem('matchCount');
    return storedMatchCount ? parseInt(storedMatchCount, 10) : 0;
  });

  const incrementScore = (id: string) => {
    setCats((prevCats) =>
      prevCats.map((cat) =>
        cat.id === id ? { ...cat, score: (cat.score || 0) + 1 } : cat
      )
    );
  };

  const incrementMatchCount = () => {
    setMatchCount((prevCount) => {
      const newCount = prevCount + 1;
      localStorage.setItem('matchCount', newCount.toString());
      return newCount;
    });
  };

  const resetMatchCount = () => {
    setMatchCount(0);
    localStorage.setItem('matchCount', '0');
  };

  return (
    <ScoreContext.Provider
      value={{
        cats,
        matchCount,
        incrementScore,
        setCats,
        incrementMatchCount,
        resetMatchCount,
      }}
    >
      {children}
    </ScoreContext.Provider>
  );
};

export const useScore = (): ScoreContextType => {
  const context = useContext(ScoreContext);
  if (!context) {
    throw new Error('useScore must be used within a ScoreProvider');
  }
  return context;
};
