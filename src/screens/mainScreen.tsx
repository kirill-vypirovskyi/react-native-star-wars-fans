import { SafeAreaView } from "react-native-safe-area-context";
import { View, ScrollView } from "react-native";
import { useEffect, useState, useRef, useCallback } from "react";
import { Person } from "../types/person";
import { getPeople, getPlanet, getSpeciesNames } from "../api/requests";
import PeopleTable from "../components/PeopleTable";
import { useFavouritesContext } from "../context.ts/favouritesContext";
import { Header } from "../components/Header";
import { Search } from "../components/Search";
import { Pagination } from "../components/Pagination";
import { showToast } from "../helpers/functions";
import { ErrorMessage } from "../types/ErrorMessage";
import debounce from "lodash.debounce";

export const MainScreen = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [total, setTotal] = useState(0);
  const [query, setQuery] = useState("");
  const [isLoading, setLoading] = useState(false);

  const page = useRef(1);

  const { isStorageError } = useFavouritesContext();

  if (isStorageError) {
    showToast(ErrorMessage.STORAGE);
  }

  const downloadData = useCallback(
    async (query: string) => {
      setLoading(true);

      try {
        const resultFromApi = await getPeople(page.current, query);

        const urlsToNames = await Promise.all(
          resultFromApi.results.map(async (person) => {
            const planet = await getPlanet(person.homeworld);
            const species = await getSpeciesNames(person.species as string[]);

            return {
              ...person,
              homeworld_name: planet.name,
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
    },
    [page.current]
  );

  const debouncedRequest = useRef(debounce(downloadData, 1000)).current;

  const handleQuery = (text: string) => {
    setQuery(text);
    page.current = 1;

    debouncedRequest.cancel();
    debouncedRequest(text);
  };

  useEffect(() => {
    downloadData(query);
  }, [downloadData]);

  const startItem = (page.current - 1) * 10 + 1;
  const endItem = Math.min(page.current * 10, total);
  const isLastPage = page.current >= Math.ceil(total / 10);

  const handlePageChange = useCallback(
    (whichPage: "next" | "prev") => {
      if (whichPage == "prev" && page.current <= 1) {
        return;
      }

      if (whichPage === "next" && isLastPage) {
        return;
      }

      page.current = whichPage === "prev" ? page.current - 1 : page.current + 1;

      downloadData(query);
    },
    [page.current]
  );

  return (
    <SafeAreaView className="flex-1 bg-gray-100-100">
      <ScrollView className="p-4">
        <Header />

        <Search query={query} onChange={handleQuery} />

        <View>
          <PeopleTable people={people} isLoading={isLoading} />
        </View>

        <Pagination
          total={total}
          startItem={startItem}
          endItem={endItem}
          onPageChange={handlePageChange}
          isLoading={isLoading}
        />
      </ScrollView>
    </SafeAreaView>
  );
};
