import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from 'react';
import { Cat } from '../types/Cat';
import { fetchCats } from '../services/catService';

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

// Create the ScoreContext
const ScoreContext = createContext<ScoreContextType | undefined>(undefined);

export const ScoreProvider: React.FC<ScoreProviderProps> = ({ children }) => {
  // Initialize cats from localStorage, or from the API if localStorage is empty
  const [cats, setCats] = useState<Cat[]>(() => {
    const storedCats = localStorage.getItem('cats');
    return storedCats ? JSON.parse(storedCats) : [];
  });

  // Initialize matchCount from localStorage, defaulting to 0 if not found
  const [matchCount, setMatchCount] = useState<number>(() => {
    const storedMatchCount = localStorage.getItem('matchCount');
    return storedMatchCount ? parseInt(storedMatchCount, 10) : 0;
  });

  // Effect to load cats from the API if localStorage is empty
  useEffect(() => {
    const loadCats = async () => {
      if (cats.length === 0) {
        const fetchedCats = await fetchCats();
        setCats(fetchedCats);
        localStorage.setItem('cats', JSON.stringify(fetchedCats)); // Save fetched cats to localStorage
      }
    };
    loadCats();
  }, [cats]);

  // Effect to save cats to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('cats', JSON.stringify(cats));
  }, [cats]);

  // Function to increment the score of a specific cat by its id
  const incrementScore = (id: string) => {
    setCats((prevCats) =>
      prevCats.map((cat) =>
        cat.id === id ? { ...cat, score: (cat.score || 0) + 1 } : cat
      )
    );
  };

  // Function to increment matchCount and save it to localStorage
  const incrementMatchCount = () => {
    setMatchCount((prevCount) => {
      const newCount = prevCount + 1;
      localStorage.setItem('matchCount', newCount.toString());
      return newCount;
    });
  };

  // Function to reset matchCount and all cat scores
  const resetMatchCount = () => {
    setMatchCount(0);
    localStorage.setItem('matchCount', '0');

    // Reset all cat scores to 0 and save the new state to localStorage
    setCats((prevCats) => prevCats.map((cat) => ({ ...cat, score: 0 })));
    localStorage.setItem(
      'cats',
      JSON.stringify(cats.map((cat) => ({ ...cat, score: 0 })))
    );
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
