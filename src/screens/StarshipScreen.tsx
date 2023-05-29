import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { ScrollView, Text } from "react-native";
import { StackParams } from "../../App";
import { useEffect, useState } from "react";
import { getFilms, getPersons } from "../api/requests";
import { showToast } from "../helpers/functions";
import { ErrorMessage } from "../types/ErrorMessage";
import { Film } from "../types/Film";
import { Screen } from "../types/Screen";
import { Container } from "../components/Container";
import { InfoCard } from "../components/InfoCard";
import { Person } from "../types/Person";
import { InfoTableRow } from "../components/InfoTableRow";

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
  } = route.params.object;

  const [filmsFull, setFilmsFull] = useState<Film[]>([]);
  const [pilotsFull, setPilotsFull] = useState<Person[]>([]);

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    (async () => {
      setIsLoading(true);

      try {
        const fullFilms = await getFilms(films);

        setFilmsFull(fullFilms);

        const fullPerson = await getPersons(pilots);

        setPilotsFull(fullPerson);
      } catch {
        showToast(ErrorMessage.REQUEST);
      } finally {
        setIsLoading(false);
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

        <Text className={textClass}>
          Hyperdrive rating: {hyperdrive_rating}{" "}
        </Text>

        <Text className={textClass}>
          Price: {cost_in_credits}
          {cost_in_credits === "unknown" ? "" : " GSC"}{" "}
        </Text>

        <Text className={textClass}>Manufacturer: {manufacturer}</Text>
      </Container>

      <Container>
        <Text className={`${textClass} font-bold mb-2`}>Specs:</Text>

        <InfoTableRow title="Cargo capacity" value={cargo_capacity + "kg"} />
        <InfoTableRow title="Consumables" value={consumables} />
        <InfoTableRow title="Length" value={length + "m"} />
        <InfoTableRow title="Passengers" value={passengers} />
        <InfoTableRow
          title="Max speed"
          value={max_atmosphering_speed + "kmh"}
        />
        <InfoTableRow title="Passengers" value={passengers} />
        <InfoTableRow title="Crew" value={crew} last />
      </Container>

      <InfoCard
        isLoading={isLoading}
        objects={pilotsFull}
        to={Screen.PERSON}
        title="Pilots:"
      />

      <InfoCard
        isLoading={isLoading}
        objects={filmsFull}
        to={Screen.FILM}
      />
    </ScrollView>
  );
};
