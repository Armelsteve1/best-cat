import { Cat } from '../types/Cat';

export const fetchCats = async (): Promise<Cat[]> => {
  const response = await fetch('https://data.latelier.co/cats.json');
  const data = await response.json();
  return data.images.map((cat: any) => ({
    id: cat.id,
    url: cat.url,
    score: 0,
  }));
};
