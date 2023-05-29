import { View, ScrollView, StyleSheet } from "react-native";
import { useEffect, useState, useRef, useMemo, useCallback } from "react";
import { Person } from "../types/Person";
import { getFullInfoPeople, getPeople, getPlanet, getSpeciesNames } from "../api/requests";
import { PeopleTable } from "../components/PeopleTable/PeopleTable";
import { useFavouritesContext } from "../context.ts/favouritesContext";
import { Header } from "../components/Header";
import { Search } from "../components/Search";
import { Pagination } from "../components/Pagination";
import { showToast, sortPeople } from "../helpers/functions";
import { ErrorMessage } from "../types/ErrorMessage";
import debounce from "lodash.debounce";
import { SortOrder } from "../types/SortOrder";
import { Container } from "../components/Container";

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

      const fullInfoPeople = await getFullInfoPeople(resultFromApi.results);

      setPeople(fullInfoPeople);
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

  const sortedPeople = useMemo(
    () => sortPeople(people, sortOrder),
    [people, sortOrder]
  );

  return (
    <ScrollView>
      <View className="m-3">
        <Header />
      </View>

      <Container>
        <Search
          query={query}
          onChange={handleQuery}
          onSubmit={() => downloadData(query)}
        />

        <View>
          <PeopleTable
            sortOrder={sortOrder}
            onOrderChange={setSortOrder}
            people={sortedPeople}
            isLoading={isLoading}
          />
        </View>

        <Pagination
          total={total}
          page={page.current}
          onPageChange={handlePageChange}
          isLoading={isLoading}
        />
      </Container>
    </ScrollView>
  );
};
