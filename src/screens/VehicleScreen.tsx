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
import { Person } from "../types/Person";
import { InfoTableRow } from "../components/InfoTableRow";

type Props = NativeStackScreenProps<StackParams, "Vehicle">;

const textClass = "text-xl";

export const VehicleScreen = ({ route }: Props) => {
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
    vehicle_class,
    name,
  } = route.params.vehicle;

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
          Model: {model}, {vehicle_class}
        </Text>

        <Text className={textClass}>
          Price: {cost_in_credits}
          {cost_in_credits === "unknown" ? "" : " GSC"}{" "}
        </Text>

        <Text className={textClass}>Manufacturer: {manufacturer}</Text>
      </Container>

      <Container>
        <Text className={`${textClass} font-bold`}>Specs:</Text>
        <InfoTableRow title="Cargo capacity" value={cargo_capacity} />
        <InfoTableRow title="cargo_capacity" value={consumables} />
        <InfoTableRow title="Length" value={length + "m"} />

        <InfoTableRow
          title="Max speed"
          value={max_atmosphering_speed + "kmh"}
        />

        <InfoTableRow title="passengers" value={passengers} />
        <InfoTableRow title="Crew" value={crew} last/>
      </Container>

      <InfoCard objects={pilotsFull} to={Screen.PERSON} title="Pilots:" />

      <InfoCard objects={filmsFull} to={Screen.FILM} />
    </ScrollView>
  );
};
