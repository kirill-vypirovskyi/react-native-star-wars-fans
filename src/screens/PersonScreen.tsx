import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableNativeFeedback,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  NativeStackNavigationProp,
  NativeStackScreenProps,
} from "@react-navigation/native-stack";
import { StackParams } from "../../App";
import {
  getFilm,
  getFilms,
  getSpeciesNames,
  getStarship,
  getStarships,
  getVehicle,
  getVehicles,
} from "../api/requests";
import { useEffect, useState } from "react";
import { showToast } from "../helpers/functions";
import { ErrorMessage } from "../types/ErrorMessage";
import { Vehicle } from "../types/Vehicle";
import { Starship } from "../types/Starship";
import { Film } from "../types/Film";
import { useNavigation } from "@react-navigation/native";
import { Container } from "../components/Container";
import { InfoCard } from "../components/InfoCard";
import { Screen } from "../types/Screen";
import { Specie } from "../types/specie";
import { HearthButton } from "../components/HearthButton";
import { useFavouritesContext } from "../context.ts/favouritesContext";

type Props = NativeStackScreenProps<StackParams, "Person">;

const textClass = "text-xl";

export const PersonScreen = ({ route }: Props) => {
  const {
    name,
    birth_year,
    homeworld_name,
    gender,
    height,
    mass,
    skin_color,
    eye_color,
    hair_color,
    species,
    vehicles,
    starships,
    films,
    url,
  } = route.params.person;

  const [vehiclesFull, setVehiclesFull] = useState<Vehicle[]>([]);
  const [starshipsFull, setStarshipsFull] = useState<Starship[]>([]);
  const [filmsFull, setFilmsFull] = useState<Film[]>([]);
  const [speciesFull, setSpeciesFull] = useState<string[]>([]);

  useEffect(() => {
    (async () => {
      try {
        const fullVehicles = await getVehicles(vehicles);

        setVehiclesFull(fullVehicles);

        const fullStarships = await getStarships(starships);

        setStarshipsFull(fullStarships);

        const fullFilms = await getFilms(films);

        setFilmsFull(fullFilms);

        const speciesNames = await getSpeciesNames(species);

        setSpeciesFull(speciesNames);
      } catch {
        showToast(ErrorMessage.REQUEST);
      }
    })();
  }, []);

  const {
    addFavourite,
    removeFavourite,
    isInFavourites,
  } = useFavouritesContext();

  const inFavourites = isInFavourites(url);

  const handleFavourite = () => {
    inFavourites ? removeFavourite(url) : addFavourite({url, gender})
  }

  return (
    <ScrollView>
      <Container>
        <View className="flex flex-row justify-between">
          <Text className="text-3xl mb-3">{name}</Text>
          <HearthButton
            color="#f00"
            size={20}
            fill={inFavourites}
            onClick={handleFavourite}
          />
        </View>

        <Text className={textClass}>
          Year of birth: {birth_year}
          {homeworld_name ? `, ${homeworld_name}` : ""}
        </Text>
      </Container>

      <Container>
        <Text className={`${textClass} font-bold`}>Body parameters:</Text>

        <Text className={textClass}>Gender: {gender}</Text>

        <Text className={textClass}>Height: {height}cm </Text>

        <Text className={textClass}>Mass: {mass}kg</Text>

        <Text className={textClass}>Skin color: {skin_color}</Text>

        <Text className={textClass}>Eyes color: {eye_color}</Text>

        <Text className={textClass}>Hair color: {hair_color}</Text>

        <Text className={textClass}>
          Species: {speciesFull.length === 0 ? "none" : speciesFull}
        </Text>
      </Container>

      <InfoCard objects={vehiclesFull} to={Screen.VEHICLE} />

      <InfoCard objects={starshipsFull} to={Screen.STARSHIP} />

      <InfoCard objects={filmsFull} to={Screen.FILM} />
    </ScrollView>
  );
};
