import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { SafeAreaView } from "react-native-safe-area-context";
import { ScrollView, Text } from "react-native";
import { StackParams } from "../../App";
import { useEffect, useState } from "react";
import { getStarships, getFilms, getPerson, getPersons } from "../api/requests";
import { showToast } from "../helpers/functions";
import { ErrorMessage } from "../types/ErrorMessage";
import { Film } from "../types/Film";
import { Screen } from "../types/Screen";
import { Container } from "../components/Container";
import { InfoCard } from "../components/InfoCard";
import { Person } from "../types/person";

type Props = NativeStackScreenProps<StackParams, "Starship">;

const textClass = "text-xl";

export const StarshipScreen = ({ route }: Props) => {
  const {
    films,
    cargo_capacity,
    consumables,
    cost_in_credits,
    crew,
    length,
    manufacturer,
    max_atmosphering_speed,
    model,
    passengers,
    pilots,
    name,
    hyperdrive_rating,
    starship_class,
  } = route.params.starship;

  const [filmsFull, setFilmsFull] = useState<Film[]>([]);
  const [pilotsFull, setPilotsFull] = useState<Person[]>([]);

  useEffect(() => {
    (async () => {
      try {
        const fullFilms = await getFilms(films);

        setFilmsFull(fullFilms);

        const fullPerson = await getPersons(pilots);

        setPilotsFull(fullPerson);
      } catch {
        showToast(ErrorMessage.REQUEST);
      }
    })();
  }, []);

  return (
    <ScrollView>
      <Container>
        <Text className="text-3xl mb-3">{name}</Text>

        <Text className={textClass}>
          Model: {model}, {starship_class}
        </Text>

        <Text className={textClass}>Hyperdrive rating: {hyperdrive_rating} </Text>
        
        <Text className={textClass}>Price: {cost_in_credits}{cost_in_credits === 'unknown' ? '': ' GSC'} </Text>

        <Text className={textClass}>Manufacturer: {manufacturer}</Text>
      </Container>

      <Container>
        <Text className={`${textClass} font-bold`}>Specs:</Text>

        <Text className={textClass}>Cargo capacity: {cargo_capacity}kg</Text>

        <Text className={textClass}>Consumables: {consumables}</Text>

        <Text className={textClass}>Length: {length}m</Text>

        <Text className={textClass}>
          Max speed: {max_atmosphering_speed}kmh
        </Text>

        <Text className={textClass}>Passengers: {passengers}</Text>

        <Text className={textClass}>Crew: {crew}</Text>
      </Container>

      <InfoCard objects={pilotsFull} to={Screen.PERSON} title="Pilots:" />

      <InfoCard objects={filmsFull} to={Screen.FILM} />
    </ScrollView>
  );
};