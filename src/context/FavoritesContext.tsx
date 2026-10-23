import React, {createContext, useCallback, useContext, useMemo, useState} from 'react';
import type {ReactNode} from 'react';

export interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  oldPrice: number;
  rating: number;
  image: string;
}

interface FavoritesContextValue {
  products: Product[];
  setProducts: React.Dispatch<React.SetStateAction<Product[]>>;
  favorites: string[];
  toggleFavorite: (product: Product) => void;
}

const FavoritesContext = createContext<FavoritesContextValue | undefined>(undefined);

export const FavoritesProvider = ({children}: {children: ReactNode}) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [favorites, setFavorites] = useState<string[]>([]);

  const toggleFavorite = useCallback((product: Product) => {
    const id = String(product.id);
    setFavorites(previous =>
      previous.map(String).includes(id)
        ? previous.filter(savedId => String(savedId) !== id)
        : [...previous, id],
    );
  }, []);

  const value = useMemo(
    () => ({products, setProducts, favorites, toggleFavorite}),
    [products, favorites, toggleFavorite],
  );

  return <FavoritesContext.Provider value={value}>{children}</FavoritesContext.Provider>;
};

export const useFavorites = () => {
  const value = useContext(FavoritesContext);
  if (!value) {
    throw new Error('useFavorites must be used inside FavoritesProvider. Wrap your navigator with FavoritesProvider.');
  }
  return value;
};
