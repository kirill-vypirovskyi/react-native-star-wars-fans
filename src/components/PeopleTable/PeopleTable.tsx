import {
  ScrollView,
  View,
  ActivityIndicator,
  Text,
} from "react-native";
import { Person } from "../../types/person";
import { PeopleTableRow } from "./PeopleTableRow";

type Props = {
  people: Person[];
  isLoading: boolean;
};

const PeopleTable = ({ people, isLoading }: Props) => {
  return (
    <>
      <ScrollView horizontal={true} className={isLoading ? "opacity-25" : ""}>
        <View className="flex flex-col">
          <PeopleTableRow index={-1} />
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
