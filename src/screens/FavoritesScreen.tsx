import {
  View,
  ScrollView,
  StyleSheet,
  Text,
  TouchableNativeFeedback,
} from "react-native";
import { useEffect, useState, useRef, useMemo } from "react";
import { Person } from "../types/Person";
import {
  getPeople,
  getPersons,
  getPlanet,
  getSpeciesNames,
} from "../api/requests";
import { PeopleTable } from "../components/PeopleTable/PeopleTable";
import { useFavouritesContext } from "../context.ts/favouritesContext";
import { Header } from "../components/Header";
import { Search } from "../components/Search";
import {
  emptyFunction,
  filterPeople,
  showToast,
  sortPeople,
} from "../helpers/functions";
import { ErrorMessage } from "../types/ErrorMessage";
import { SortOrder } from "../types/SortOrder";
import { Container } from "../components/Container";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { StackParams } from "../../App";
import { Screen } from "../types/Screen";

export const FavoritesScreen = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [query, setQuery] = useState("");
  const [isLoading, setLoading] = useState(false);
  const [sortOrder, setSortOrder] = useState(SortOrder.NONE);

  const { isStorageError, favourites } = useFavouritesContext();

  const navigation = useNavigation<NativeStackNavigationProp<StackParams>>();

  if (isStorageError) {
    showToast(ErrorMessage.STORAGE);
  }

  const downloadData = async () => {
    setLoading(true);

    try {
      const peopleUrls = favourites.map((fav) => fav.url);
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

  useEffect(() => {
    downloadData();
  }, [favourites]);

  const filteredPeople = useMemo(
    () => filterPeople(people, query),
    [people, query]
  );

  const sortedPeople = useMemo(
    () => sortPeople(filteredPeople, sortOrder),
    [filteredPeople, sortOrder]
  );

  return (
    <ScrollView>
      <View className="m-3">
        <Header />
      </View>

      <Container>
        {favourites.length !== 0 ? (
          <>
            <Search
              query={query}
              onChange={setQuery}
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
          </>
        ) : (
          <>
            <Text className="text-2xl mb-6">No favourites yet.</Text>

            <TouchableNativeFeedback
              onPress={() => navigation.navigate(Screen.MAIN)}
            >
              <View className="flex flex-row">
                <Text className="text-xl text-blue-900 underline">
                  Go to the home page and add some.
                </Text>
              </View>
            </TouchableNativeFeedback>
          </>
        )}
      </Container>
    </ScrollView>
  );
};
