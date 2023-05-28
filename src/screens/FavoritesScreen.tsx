import { View, ScrollView, StyleSheet } from "react-native";
import { useEffect, useState, useRef, useMemo } from "react";
import { Person } from "../types/Person";
import { getPeople, getPersons, getPlanet, getSpeciesNames } from "../api/requests";
import { PeopleTable } from "../components/PeopleTable/PeopleTable";
import { useFavouritesContext } from "../context.ts/favouritesContext";
import { Header } from "../components/Header";
import { Search } from "../components/Search";
import { emptyFunction, filterPeople, showToast, sortPeople } from "../helpers/functions";
import { ErrorMessage } from "../types/ErrorMessage";
import { SortOrder } from "../types/SortOrder";

export const FavoritesScreen = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [query, setQuery] = useState("");
  const [isLoading, setLoading] = useState(false);
  const [sortOrder, setSortOrder] = useState(SortOrder.NONE);

  const page = useRef(1);

  const { isStorageError, favourites } = useFavouritesContext();

  if (isStorageError) {
    showToast(ErrorMessage.STORAGE);
  }

  const downloadData = async () => {
    setLoading(true);

    try {
      const peopleUrls = favourites.map(fav => fav.url);
      const peopleFull = await getPersons(peopleUrls);

      const urlsToNames = await Promise.all(
        peopleFull.map(async (person) => {
          const planet = await getPlanet(person.homeworld);
          const species = await getSpeciesNames(person.species as string[]);

          return {
            ...person,
            homeworld_full: planet,
            species_names: species,
          };
        })
      );

      setPeople(urlsToNames);
    } catch (error) {
      showToast(ErrorMessage.REQUEST);
    } finally {
      setLoading(false);
    }
  };

  const handleQuery = (text: string) => {
    setQuery(text);
  };

  useEffect(() => {
    downloadData();
  }, []);

  const filteredPeople = useMemo(
    () => filterPeople(people, query),
    [people, query]
  )

  const sortedPeople = useMemo(
    () => sortPeople(filteredPeople, sortOrder),
    [filteredPeople, sortOrder]
  );

  return (
    <ScrollView>
      <View className="m-3">
        <Header />
      </View>

      <View style={styles.container} className="bg-white rounded p-3 m-3">
        <Search
          query={query}
          onChange={handleQuery}
          onSubmit={emptyFunction}
        />

        <View>
          <PeopleTable
            sortOrder={sortOrder}
            onOrderChange={setSortOrder}
            people={sortedPeople}
            isLoading={isLoading}
          />
        </View>

      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.25,
    shadowRadius: 2,
    elevation: 5,
  },
});
