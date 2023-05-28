import { ScrollView, View, ActivityIndicator, Text } from "react-native";
import { Person } from "../../types/Person";
import { PeopleTableRow } from "./PeopleTableRow";
import { PeopleTableHeader } from "./PeopletableHeader";
import { SortOrder } from "../../types/SortOrder";

type Props = {
  people: Person[];
  isLoading: boolean;
  sortOrder: SortOrder;
  onOrderChange: (order: SortOrder) => void;
};

const PeopleTable = ({
  people,
  isLoading,
  sortOrder,
  onOrderChange,
}: Props) => {
  return (
    <>
      <ScrollView horizontal={true} className={isLoading ? "opacity-25" : ""}>
        <View className="flex flex-col">
          <PeopleTableHeader sortOrder={sortOrder} onOrderChange={onOrderChange}/>
          {people.map((person, index) => (
            <PeopleTableRow person={person} index={index} key={person.url} />
          ))}
        </View>
      </ScrollView>

      {people.length === 0 && !isLoading && (
        <Text className="text-2xl text-center p-6">
          {"No results found :("}
        </Text>
      )}

      {isLoading && (
        <View className="absolute top-0 left-0 right-0 bottom-0 justify-center items-center">
          <ActivityIndicator size="large" color="black" />
        </View>
      )}
    </>
  );
};

export default PeopleTable;
