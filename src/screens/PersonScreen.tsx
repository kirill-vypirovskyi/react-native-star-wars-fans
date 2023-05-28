import { View, Text, ScrollView } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { StackParams } from "../../App";
import {
  getFilms,
  getSpeciesNames,
  getStarships,
  getVehicles,
} from "../api/requests";
import { useEffect, useState } from "react";
import { showToast } from "../helpers/functions";
import { ErrorMessage } from "../types/ErrorMessage";
import { Vehicle } from "../types/Vehicle";
import { Starship } from "../types/Starship";
import { Film } from "../types/Film";
import { Container } from "../components/Container";
import { InfoCard } from "../components/InfoCard";
import { Screen } from "../types/Screen";
import { HearthButton } from "../components/HearthButton";
import { useFavouritesContext } from "../context.ts/favouritesContext";
import { InfoTableRow } from "../components/InfoTableRow";
import { Loader } from "../components/Loader";

type Props = NativeStackScreenProps<StackParams, "Person">;

const textClass = "text-xl";

export const PersonScreen = ({ route }: Props) => {
  const {
    name,
    birth_year,
    homeworld_full,
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

  const [areVehiclesLoading, setVehiclesLoading] = useState(false);
  const [areStarshipsLoading, setStarshipsLoading] = useState(false);
  const [areFilmsLoading, setFilmsLoading] = useState(false);
  const [areSpeciesLoading, setSpeciesLoading] = useState(false);

  useEffect(() => {
    (async () => {
      setVehiclesLoading(true);
      setStarshipsLoading(true);
      setFilmsLoading(true);
      setSpeciesLoading(true);

      try {
        const fullVehicles = await getVehicles(vehicles);

        setVehiclesFull(fullVehicles);
        setVehiclesLoading(false);

        const fullStarships = await getStarships(starships);

        setStarshipsFull(fullStarships);
        setStarshipsLoading(false);

        const fullFilms = await getFilms(films);

        setFilmsFull(fullFilms);
        setFilmsLoading(false);

        const speciesNames = await getSpeciesNames(species);

        setSpeciesFull(speciesNames);
        setSpeciesLoading(false);
      } catch {
        showToast(ErrorMessage.REQUEST);
      } finally {
        setVehiclesLoading(false);
        setStarshipsLoading(false);
        setFilmsLoading(false);
        setSpeciesLoading(false);
      }
    })();
  }, []);

  const { addFavourite, removeFavourite, isInFavourites } =
    useFavouritesContext();

  const inFavourites = isInFavourites(url);

  const handleFavourite = () => {
    inFavourites ? removeFavourite(url) : addFavourite({ url, gender });
  };

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
          {homeworld_full ? `, ${homeworld_full.name}` : ""}
        </Text>
      </Container>

      <Container>
        <Text className={`${textClass} font-bold mb-2`}>Body parameters:</Text>

        <InfoTableRow title="Gender" value={gender} />
        <InfoTableRow title="Height" value={height + "cm"} />
        <InfoTableRow title="Mass" value={mass + "kg"} />
        <InfoTableRow title="Skin color" value={skin_color} />
        <InfoTableRow title="Eyes color" value={eye_color} />
        <InfoTableRow title="Hair color" value={hair_color} />

        {areSpeciesLoading ? (
          <View>
            <Text className={`${textClass} py-2`}>Species:</Text>
            <Loader />
          </View>
        ) : (
          <InfoTableRow
            title="Species"
            value={speciesFull.length === 0 ? "none" : speciesFull.join(", ")}
            last
          />
        )}
      </Container>

      <InfoCard
        isLoading={areVehiclesLoading}
        objects={vehiclesFull}
        to={Screen.VEHICLE}
      />

      <InfoCard
        isLoading={areStarshipsLoading}
        objects={starshipsFull}
        to={Screen.STARSHIP}
      />

      <InfoCard
        isLoading={areFilmsLoading}
        objects={filmsFull}
        to={Screen.FILM}
      />
    </ScrollView>
  );
};
