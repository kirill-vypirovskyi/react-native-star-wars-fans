import { ReactNode, createContext, useContext } from "react";
import { Favourite, useFavourites } from "../hooks/useFavourites";

interface FavouritesContextValue {
  addFavourite: (fav: Favourite) => void;
  removeFavourite: (url: string) => void;
  maleCount: number;
  femaleCount: number;
  otherCount: number;
  favourites: Favourite[];
  isInFavourites: (url: string) => boolean;
  clearAllFavourites: () => void;
  isStorageError: boolean;
}

export const FavouritesContext = createContext<
  FavouritesContextValue | undefined
>(undefined);

interface FavouritesProviderProps {
  children: ReactNode;
}

export const FavouritesProvider = ({ children }: FavouritesProviderProps) => {
  const value = useFavourites();

  return (
    <FavouritesContext.Provider value={value}>
      {children}
    </FavouritesContext.Provider>
  );
};

export const useFavouritesContext = () => {
  const favouritesContext = useContext(FavouritesContext);

  if (favouritesContext === undefined) {
    throw new Error(
      'useFavouritesContext must be used within a FavouritesProvider',
    );
  }

  return favouritesContext;
};
