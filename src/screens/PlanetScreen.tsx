import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useState, useEffect } from "react";
import {
  ScrollView,
  Text,
  View,
  TouchableOpacity,
  Modal,
  Button,
} from "react-native";
import { Screen } from "../types/Screen";
import { StackParams } from "../../App";
import {
  getFilms,
  getPersons,
  getPlanets,
  getStarships,
  getVehicles,
} from "../api/requests";
import { Container } from "../components/Container";
import { InfoCard } from "../components/InfoCard";
import { formatDate, showToast } from "../helpers/functions";
import { ErrorMessage } from "../types/ErrorMessage";
import { Person } from "../types/person";
import { Starship } from "../types/Starship";
import { Vehicle } from "../types/Vehicle";
import { Planet } from "../types/Planet";
import { Film } from "../types/Film";

type Props = NativeStackScreenProps<StackParams, "Planet">;

const textClass = "text-xl";

export const PlanetScreen = ({ route }: Props) => {
  const {
    name,
    climate,
    diameter,
    films,
    gravity,
    orbital_period,
    population,
    rotation_period,
    surface_water,
    residents,
    terrain,
  } = route.params.planet;

  const [charsFull, setCharsFull] = useState<Person[]>([]);
  const [filmsFull, setFilmsFull] = useState<Film[]>([]);

  useEffect(() => {
    (async () => {
      try {
        const fullPersons = await getPersons(residents);
        setCharsFull(fullPersons);

        const fullFilms = await getFilms(films);
        setFilmsFull(fullFilms);
      } catch {
        showToast(ErrorMessage.REQUEST);
      }
    })();
  }, []);

  return (
    <ScrollView>
      <Container>
        <Text className="text-3xl mb-3">{name}</Text>

        <Text className={textClass}>Population: {population}</Text>

        <Text className={textClass}>Terrain: {terrain}</Text>
      </Container>

      <Container>
        <Text className={`${textClass} font-bold`}>Parameters:</Text>

        <Text className={textClass}>Climate: {climate}</Text>

        <Text className={textClass}>Diameter: {diameter}</Text>

        <Text className={textClass}>Gravity: {gravity}</Text>

        <Text className={textClass}>Orbital period: {orbital_period} days</Text>

        <Text className={textClass}>Rotation period: {rotation_period} hours</Text>

        <Text className={textClass}>Surface water: {surface_water}</Text>



      </Container>

      <InfoCard objects={charsFull} to={Screen.PERSON} title="Characters:" />

      <InfoCard objects={filmsFull} to={Screen.FILM} />
    </ScrollView>
  );
};
