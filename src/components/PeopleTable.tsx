import {
  ScrollView,
  StyleSheet,
  View,
  ActivityIndicator,
  Text,
} from "react-native";
import { Row, Table } from "react-native-table-component";
import { Person } from "../types/person";
import { HearthButton } from "./HearthButton";
import { PeopleTableRow, widthArr } from "./PeopleTableRow";

type Props = {
  people: Person[];
  isLoading: boolean;
};

const PeopleTable = ({ people, isLoading }: Props) => {
  return (
    <>
      <ScrollView horizontal={true} className={isLoading ? "opacity-25" : ""}>
        <View>
          {people.length !== 0 && (
            <Table>
              <Row
                widthArr={widthArr}
                style={styles.row}
                textStyle={styles.header}
                data={[
                  <HearthButton
                    fill={true}
                    color="#000000"
                    size={20}
                    onClick={() => {}}
                  />,
                  "Name",
                  "Birth year",
                  "Gender",
                  "Home World",
                  "Species",
                ]}
              />

              {people.map((person, index) => (
                <PeopleTableRow
                  key={person.url}
                  person={person}
                  index={index}
                />
              ))}
            </Table>
          )}
        </View>
      </ScrollView>

      {people.length === 0 && !isLoading && (
        <Text className="text-2xl text-center p-6">{"No results found :("}</Text>
      )}

      {isLoading && (
        <View className="absolute top-0 left-0 right-0 bottom-0 justify-center items-center">
          <ActivityIndicator size="large" color="black" />
        </View>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  header: { lineHeight: 50, fontWeight: "700", paddingLeft: 10 },
  row: { height: 50, backgroundColor: "#f0f0f0", paddingLeft: 10 },
});

export default PeopleTable;
