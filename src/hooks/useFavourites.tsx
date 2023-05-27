import { useCallback, useEffect, useMemo, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export interface Favourite {
  url: string;
  gender: string;
}

export const useFavourites = () => {
  const [favourites, setFavourites] = useState<Favourite[]>([]);
  const [isStorageError, setIsStorageError] = useState(false);

  const saveData = async () => {
    setIsStorageError(false);

    try {
      await AsyncStorage.setItem("favourites", JSON.stringify(favourites));
    } catch {
      setIsStorageError(true);
    } finally {
      getData();
    }
  };

  const removeData = async () => {
    setIsStorageError(false);

    try {
      await AsyncStorage.removeItem("favourites");
    } catch (error) {
      setIsStorageError(true);
    }
  };

  const getData = async () => {
    setIsStorageError(false);

    try {
      const value = await AsyncStorage.getItem("favourites");

      if (value !== null) {
        return value;
      }
    } catch {
      setIsStorageError(true);
    }
  };

  const addFavourite = useCallback(
    (fav: Favourite) => {
      setFavourites((prev) => [...prev, fav]);
    },
    [setFavourites]
  );

  const removeFavourite = useCallback(
    (url: string) => {
      setFavourites((prev) => prev.filter((person) => person.url !== url));
    },
    [setFavourites]
  );

  const femaleCount = useMemo(
    () => favourites.filter((person) => person.gender === "female").length,
    [favourites]
  );

  const maleCount = useMemo(
    () => favourites.filter((person) => person.gender === "male").length,
    [favourites]
  );

  const otherCount = useMemo(
    () =>
      favourites.filter(
        (person) => person.gender !== "female" && person.gender !== "male"
      ).length,
    [favourites]
  );

  const isInFavourites = useCallback(
    (url: string) => {
      return favourites.some((person) => person.url === url);
    },
    [favourites]
  );

  const clearAllFavourites = useCallback(() => {
    setFavourites([]);
    removeData();
  }, []);

  useEffect(() => {
    (async () => {
      const data = await getData();

      setFavourites(JSON.parse(data || "[]"));
    })();
  }, []);

  useEffect(() => {
    saveData();
  }, [favourites]);

  return {
    addFavourite,
    removeFavourite,
    femaleCount,
    maleCount,
    otherCount,
    favourites,
    isInFavourites,
    clearAllFavourites,
    isStorageError,
  };
};
