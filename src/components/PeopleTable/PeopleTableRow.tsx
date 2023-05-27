import { HearthButton } from "../HearthButton";
import { Person } from "../../types/person";
import { TouchableOpacity, TouchableWithoutFeedback, View } from "react-native";
import { useFavouritesContext } from "../../context.ts/favouritesContext";
import { PeopleTableCell } from "./PeopleTableCell";

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
      <PeopleTableCell width={100}>
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

      <View>
        <PeopleTableCell width={324}>{person.name}</PeopleTableCell>
        <TouchableOpacity className="absolute top-0 bottom-0 left-0 right-0 bg-red-500 opacity-10" />
      </View>
      <PeopleTableCell width={150}>{person.birth_year}</PeopleTableCell>
      <PeopleTableCell width={150}>{person.gender}</PeopleTableCell>
      <View>
        <PeopleTableCell width={150}>{person.homeworld_name}</PeopleTableCell>
        <TouchableOpacity className="absolute top-0 bottom-0 left-0 right-0 bg-red-500 opacity-10" />
      </View>
      <View>
        <PeopleTableCell width={150}>
          {person.species_names.join(", ")}
        </PeopleTableCell>
        <TouchableOpacity className="absolute top-0 bottom-0 left-0 right-0 bg-red-500 opacity-10" />
      </View>
    </View>
  );
};
