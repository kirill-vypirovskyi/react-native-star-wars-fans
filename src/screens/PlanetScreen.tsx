import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useState, useEffect } from "react";
import { ScrollView, Text } from "react-native";
import { Screen } from "../types/Screen";
import { StackParams } from "../../App";
import { getFilms, getPersons } from "../api/requests";
import { Container } from "../components/Container";
import { InfoCard } from "../components/InfoCard";
import { showToast } from "../helpers/functions";
import { ErrorMessage } from "../types/ErrorMessage";
import { Person } from "../types/Person";
import { Film } from "../types/Film";
import { InfoTableRow } from "../components/InfoTableRow";

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
        <Text className={`${textClass} font-bold mb-2`}>Parameters:</Text>

        <InfoTableRow title="Climate" value={climate} />
        <InfoTableRow title="Diameter" value={diameter} />
        <InfoTableRow title="Gravity" value={gravity} />
        <InfoTableRow title="Orbital period" value={orbital_period + " days"} />

        <InfoTableRow
          title="Rotation period"
          value={rotation_period + " ours"}
        />

        <InfoTableRow title="Surface water" value={surface_water} last />
      </Container>

      <InfoCard objects={charsFull} to={Screen.PERSON} title="Characters:" />

      <InfoCard objects={filmsFull} to={Screen.FILM} />
    </ScrollView>
  );
};
