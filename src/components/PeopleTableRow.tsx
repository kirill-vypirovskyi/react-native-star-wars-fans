import React, { useCallback } from "react";
import { Row } from "react-native-table-component";
import { HearthButton } from "./HearthButton";
import { Person } from "../types/person";
import { StyleSheet } from "react-native";
import { useFavouritesContext } from "../context.ts/favouritesContext";

type Props = {
  person: Person;
  index: number;
};

export const widthArr = [100, 324, 150, 150, 150, 150];

export const PeopleTableRow = ({ person, index }: Props) => {
  const { addFavourite, removeFavourite, isInFavourites } =
    useFavouritesContext();

  const handleHeartButton = useCallback(
    ({ url, gender }: Person, isFavourite: boolean) => {
      isFavourite ? removeFavourite(url) : addFavourite({ url, gender });
    },
    []
  );

  const rowStyle = [
    styles.row,
    index % 2 === 0 ? { backgroundColor: "transparent" } : {},
  ];

  const isFavourite = isInFavourites(person.url);

  const hearth = (
    <HearthButton
      onClick={() => {
        handleHeartButton(person, isFavourite);
      }}
      fill={isFavourite}
      color="#ff0000"
      size={20}
    />
  );

  return (
    <Row
      style={rowStyle}
      textStyle={styles.text}
      widthArr={widthArr}
      data={[
        hearth,
        person.name,
        person.birth_year,
        person.gender,
        person.homeworld_name,
        person.species_names?.join(" "),
      ]}
      key={person.url}
    />
  );
};

const styles = StyleSheet.create({
  text: { lineHeight: 50, paddingLeft: 10 },
  header: { lineHeight: 50, fontWeight: "700", paddingLeft: 10 },
  row: { height: 50, backgroundColor: "#f0f0f0", paddingLeft: 10 },
});
