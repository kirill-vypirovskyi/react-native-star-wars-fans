import { HearthButton } from "../HearthButton";
import { Person } from "../../types/Person";
import {
  Text,
  TouchableNativeFeedback,
  TouchableOpacity,
  View,
} from "react-native";
import { useFavouritesContext } from "../../context.ts/favouritesContext";
import { PeopleTableCell } from "./PeopleTableCell";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { StackParams } from "../../../App";

type Props = {
  person: Person;
  index: number;
};

export const PeopleTableRow = ({ person, index }: Props) => {
  const { addFavourite, removeFavourite, isInFavourites } =
    useFavouritesContext();

  const navigation = useNavigation<NativeStackNavigationProp<StackParams>>();

  const handleHeartButton = ({ url, gender }: Person, isFavourite: boolean) => {
    isFavourite ? removeFavourite(url) : addFavourite({ url, gender });
  };

  const isFavourite = isInFavourites(person.url);

  return (
    <View
      className={`flex flex-row bg-${
        index % 2 === 0 ? "transparent" : "gray-100"
      }`}
    >
      <View>
        <PeopleTableCell>
          {person.url ? (
            <HearthButton
              onClick={() => {
                handleHeartButton(person, isFavourite);
              }}
              fill={isFavourite}
              color="#ff0000"
              size={20}
            />
          ) : (
            <HearthButton
              fill={true}
              color="#000000"
              size={20}
              onClick={() => {}}
            />
          )}
        </PeopleTableCell>
      </View>

      <View style={{ width: 324 }} className="flex justify-center">
        <PeopleTableCell>
          <TouchableNativeFeedback
            onPress={() => navigation.push("Person", { object: person })}
          >
            <View className="bg-gray-200 rounded py-1 px-3 ">
              <Text>{person.name}</Text>
            </View>
          </TouchableNativeFeedback>
        </PeopleTableCell>
      </View>

      <View style={{ width: 150 }} className="flex justify-center">
        <PeopleTableCell>{person.birth_year}</PeopleTableCell>
      </View>

      <View style={{ width: 150 }} className="flex justify-center">
        <PeopleTableCell>{person.gender}</PeopleTableCell>
      </View>

      <View style={{ width: 150 }} className="flex justify-center">
        <PeopleTableCell>

            <View className="bg-gray-200 rounded py-1 px-3 ">
              <Text>{person.homeworld_full.name}</Text>
            </View>
        </PeopleTableCell>

        <TouchableOpacity
          className=" absolute top-0 bottom-0 left-0 right-0 opacity-10 "
          onPress={() =>
            navigation.push("Planet", { object: person.homeworld_full })
          }
        />
      </View>

      <View style={{ width: 150 }} className="flex justify-center">
        <PeopleTableCell>{person.species_names.join(", ")}</PeopleTableCell>
      </View>
    </View>
  );
};
