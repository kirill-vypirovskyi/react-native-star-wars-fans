import { HearthButton } from "../HearthButton";
import { Person } from "../../types/person";
import { TouchableOpacity, TouchableWithoutFeedback, View } from "react-native";
import { useFavouritesContext } from "../../context.ts/favouritesContext";
import { PeopleTableCell } from "./PeopleTableCell";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { StackParams } from "../../../App";

type Props = {
  person?: Person;
  index: number;
};

const headerData = {
  name: "Name",
  height: "",
  mass: "",
  hair_color: "",
  skin_color: "",
  eye_color: "",
  birth_year: "Birth Year",
  gender: "Gender",
  homeworld: " ",
  homeworld_name: "Home World",
  films: [""],
  species: [""],
  species_names: ["Species"],
  vehicles: [""],
  starships: [""],
  created: "",
  edited: "",
  url: "",
};

export const PeopleTableRow = ({ person = headerData, index }: Props) => {
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
        <PeopleTableCell>{person.name}</PeopleTableCell>

        <TouchableOpacity
          className=" absolute top-0 bottom-0 left-0 right-0 bg-red-500 opacity-10 "
          onPress={() => navigation.navigate("Person", { person })}
        />
      </View>

      <View style={{ width: 150 }} className="flex justify-center">
        <PeopleTableCell>{person.birth_year}</PeopleTableCell>
      </View>

      <View style={{ width: 150 }} className="flex justify-center">
        <PeopleTableCell>{person.gender}</PeopleTableCell>
      </View>

      <View style={{ width: 150 }} className="flex justify-center">
        <PeopleTableCell>{person.homeworld_name}</PeopleTableCell>

        <TouchableOpacity className=" absolute top-0 bottom-0 left-0 right-0 bg-red-500 opacity-10 " />
      </View>

      <View style={{ width: 150 }} className="flex justify-center">
        <PeopleTableCell>{person.species_names.join(", ")}</PeopleTableCell>

        <TouchableOpacity className=" absolute top-0 bottom-0 left-0 right-0 bg-red-500 opacity-10 " />
      </View>
    </View>
  );
};
