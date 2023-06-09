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
  getPersons,
  getPlanets,
  getStarships,
  getVehicles,
} from "../api/requests";
import { Container } from "../components/Container";
import { InfoCard } from "../components/InfoCard";
import { formatDate, showToast } from "../helpers/functions";
import { ErrorMessage } from "../types/ErrorMessage";
import { Person } from "../types/Person";
import { Starship } from "../types/Starship";
import { Vehicle } from "../types/Vehicle";
import { Planet } from "../types/Planet";

type Props = NativeStackScreenProps<StackParams, "Film">;

const textClass = "text-xl";

export const FilmScreen = ({ route }: Props) => {
  const {
    title,
    characters,
    director,
    producer,
    vehicles,
    starships,
    release_date,
    opening_crawl,
    planets,
  } = route.params.object;

  const [charsFull, setCharsFull] = useState<Person[]>([]);
  const [vehiclesFull, setVehiclesFull] = useState<Vehicle[]>([]);
  const [starshipsFull, setStarshipsFull] = useState<Starship[]>([]);
  const [planetsFull, setPlanetsFull] = useState<Planet[]>([]);
  const [isCrawlOpened, setCrawlOpened] = useState(false);

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    (async () => {
      setIsLoading(true);

      try {
        const fullStarships = await getStarships(starships);
        setStarshipsFull(fullStarships);

        const fullPersons = await getPersons(characters);
        setCharsFull(fullPersons);

        const fullVehicles = await getVehicles(vehicles);
        setVehiclesFull(fullVehicles);

        const fullPlanets = await getPlanets(planets);
        setPlanetsFull(fullPlanets);
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
        <View className="flex flex-row justify-between flex-wrap mb-3">
          <Text className="text-3xl">{title}</Text>
          <Text className={textClass}>{formatDate(release_date)}</Text>
        </View>

        <Text className={textClass}>Director: {director}</Text>

        <Text className={textClass}>Producer: {producer}</Text>

        <TouchableOpacity onPress={() => setCrawlOpened(true)}>
          <View className="py-2 px-4 border rounded mt-6">
            <Text className="text-xl text-center">Read opening crawl</Text>
          </View>
        </TouchableOpacity>

        <Modal visible={isCrawlOpened} animationType="slide">
          <View className="flex flex-col items-center h-screen justify-between p-10">
            <Text className={textClass}>{opening_crawl}</Text>
            <Button title="Close" onPress={() => setCrawlOpened(false)} />
          </View>
        </Modal>
      </Container>

      <InfoCard isLoading={isLoading} objects={charsFull} to={Screen.PERSON} title="Characters:" />

      <InfoCard isLoading={isLoading} objects={planetsFull} to={Screen.PLANET} />

      <InfoCard isLoading={isLoading} objects={vehiclesFull} to={Screen.VEHICLE} />

      <InfoCard isLoading={isLoading} objects={starshipsFull} to={Screen.STARSHIP} />
    </ScrollView>
  );
};
