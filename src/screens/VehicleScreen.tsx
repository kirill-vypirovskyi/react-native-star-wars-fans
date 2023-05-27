import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { SafeAreaView } from "react-native-safe-area-context";
import { ScrollView, Text } from "react-native";
import { StackParams } from "../../App";
import { useEffect, useState } from "react";
import { getStarships, getFilms } from "../api/requests";
import { showToast } from "../helpers/functions";
import { ErrorMessage } from "../types/ErrorMessage";
import { Film } from "../types/Film";
import { Starship } from "../types/Starship";
import { Screen } from "../types/Screen";
import { Container } from "../components/Container";
import { InfoCard } from "../components/InfoCard";

type Props = NativeStackScreenProps<StackParams, "Vehicle">;

const textClass = "text-xl";

export const VehicleScreen = ({ route }: Props) => {
  console.log(route.params.vehicle.films);

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

  useEffect(() => {
    (async () => {
      try {
        const fullFilms = await getFilms(films);

        setFilmsFull(fullFilms);
      } catch {
        showToast(ErrorMessage.REQUEST);
      }
    })();
  }, []);
  return (
    <SafeAreaView className="flex-1 bg-gray-100">
      <ScrollView>
        <Container>
          <Text className="text-3xl mb-3">{name}</Text>

          <Text className={textClass}>
            Model: {model}, {vehicle_class}
          </Text>

          <Text className={textClass}>Price: {cost_in_credits} GCS</Text>

          <Text className={textClass}>Manufacturer: {manufacturer} GCS</Text>
        </Container>

        <Container>
          <Text className={`${textClass} font-bold`}>Specs:</Text>

          <Text className={textClass}>Cargo capacity: {cargo_capacity}kg</Text>

          <Text className={textClass}>Consumables: {consumables}</Text>

          <Text className={textClass}>Length: {length}m</Text>

          <Text className={textClass}>Max speed: {max_atmosphering_speed}</Text>

          <Text className={textClass}>Passengers: {passengers} persons</Text>

          <Text className={textClass}>Crew: {crew} persons</Text>
        </Container>

        <InfoCard objects={filmsFull} to={Screen.FILM} />
      </ScrollView>
    </SafeAreaView>
  );
};