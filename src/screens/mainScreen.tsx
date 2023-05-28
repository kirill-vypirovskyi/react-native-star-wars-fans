import { SafeAreaView } from "react-native-safe-area-context";
import { View, ScrollView, StyleSheet } from "react-native";
import { useEffect, useState, useRef, useMemo } from "react";
import { Person } from "../types/Person";
import { getPeople, getPlanet, getSpeciesNames } from "../api/requests";
import PeopleTable from "../components/PeopleTable/PeopleTable";
import { useFavouritesContext } from "../context.ts/favouritesContext";
import { Header } from "../components/Header";
import { Search } from "../components/Search";
import { Pagination } from "../components/Pagination";
import { showToast, sortPeople } from "../helpers/functions";
import { ErrorMessage } from "../types/ErrorMessage";
import debounce from "lodash.debounce";
import { SortOrder } from "../types/SortOrder";

export const MainScreen = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [total, setTotal] = useState(0);
  const [query, setQuery] = useState("");
  const [isLoading, setLoading] = useState(false);
  const [sortOrder, setSortOrder] = useState(SortOrder.NONE);

  const page = useRef(1);

  const { isStorageError } = useFavouritesContext();

  if (isStorageError) {
    showToast(ErrorMessage.STORAGE);
  }

  const downloadData = async (query: string) => {
    setLoading(true);

    try {
      const resultFromApi = await getPeople(page.current, query);

      const urlsToNames = await Promise.all(
        resultFromApi.results.map(async (person) => {
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
      setTotal(resultFromApi.count);
    } catch (error) {
      showToast(ErrorMessage.REQUEST);
    } finally {
      setLoading(false);
    }
  };

  const debouncedRequest = useRef(debounce(downloadData, 1000)).current;

  const handleQuery = (text: string) => {
    setQuery(text);
    page.current = 1;

    debouncedRequest.cancel();
    debouncedRequest(text);
  };

  useEffect(() => {
    downloadData(query);
  }, []);

  const startItem = (page.current - 1) * 10 + 1;
  const endItem = Math.min(page.current * 10, total);
  const isLastPage = page.current >= Math.ceil(total / 10);

  const handlePageChange = (whichPage: "next" | "prev") => {
    if (whichPage == "prev" && page.current <= 1) {
      return;
    }

    if (whichPage === "next" && isLastPage) {
      return;
    }

    page.current = whichPage === "prev" ? page.current - 1 : page.current + 1;

    downloadData(query);
  };

  const sortedPeople = useMemo(() => sortPeople(people, sortOrder), [people, sortOrder])

  return (
    <SafeAreaView className="flex-1 bg-gray-100">
      <ScrollView>
        <View className="m-3">
          <Header />
        </View>

        <View style={styles.container} className="bg-white rounded p-3 m-3">
          <Search query={query} onChange={handleQuery} onSubmit={() => downloadData(query)}/>

          <View>
            <PeopleTable sortOrder={sortOrder} onOrderChange={setSortOrder} people={sortedPeople} isLoading={isLoading} />
          </View>

          <Pagination
            total={total}
            startItem={startItem}
            endItem={endItem}
            onPageChange={handlePageChange}
            isLoading={isLoading}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
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
