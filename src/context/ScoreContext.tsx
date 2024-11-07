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

  // Initialize matchCount from localStorage or default to 0
  const [matchCount, setMatchCount] = useState<number>(() => {
    const storedMatchCount = localStorage.getItem('matchCount');
    return storedMatchCount ? parseInt(storedMatchCount, 10) : 0;
  });

  // Increment score for a specific cat
  const incrementScore = (id: string) => {
    setCats((prevCats) =>
      prevCats.map((cat) =>
        cat.id === id ? { ...cat, score: (cat.score || 0) + 1 } : cat
      )
    );
  };

  // Increment match count and update in localStorage
  const incrementMatchCount = () => {
    setMatchCount((prevCount) => {
      const newCount = prevCount + 1;
      localStorage.setItem('matchCount', newCount.toString());
      return newCount;
    });
  };

  // Reset match count to 0 and update in localStorage
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

// Custom hook for accessing ScoreContext
export const useScore = (): ScoreContextType => {
  const context = useContext(ScoreContext);
  if (!context) {
    throw new Error('useScore must be used within a ScoreProvider');
  }
  return context;
};
