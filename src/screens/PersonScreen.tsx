import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableNativeFeedback,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Person } from "../types/person";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { StackParams } from "../../App";
import { getFilm, getStarship, getVehicle } from "../api/requests";
import { useEffect, useState } from "react";
import { showToast } from "../helpers/functions";
import { ErrorMessage } from "../types/ErrorMessage";
import { Vehicle } from "../types/Vehicle";
import { Starship } from "../types/Starship";
import { Film } from "../types/Film";

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
    species_names,
    vehicles,
    starships,
    films,
  } = route.params.person;

  const [vehiclesFull, setVehiclesFull] = useState<Vehicle[]>([]);
  const [starshipsFull, setStarshipsFull] = useState<Starship[]>([]);
  const [filmsFull, setFilmsFull] = useState<Film[]>([]);

  useEffect(() => {
    (async () => {
      try {
        const fullVehicles = await Promise.all(
          vehicles.map((vehicle) => getVehicle(vehicle))
        );
        
        setVehiclesFull(fullVehicles);

        const fullStarships = await Promise.all(
          starships.map((starship) => getStarship(starship))
        );

        setStarshipsFull(fullStarships);

        const fullFilms = await Promise.all(
          films.map((film) => getFilm(film))
        );

        setFilmsFull(fullFilms);

      } catch {
        showToast(ErrorMessage.REQUEST);
      }
    })();
  }, []);

  return (
    <SafeAreaView className="flex-1 bg-gray-100">
      <ScrollView>
        <View style={styles.container} className="m-3 p-3 rounded bg-white">
          <Text className="text-3xl mb-3">{name}</Text>

          <Text className={textClass}>
            Year of birth: {birth_year}, {homeworld_name}
          </Text>
        </View>

        <View style={styles.container} className="m-3 p-3 rounded bg-white">
          <Text className={`${textClass} font-bold`}>Body parameters:</Text>

          <Text className={textClass}>Gender: {gender}</Text>

          <Text className={textClass}>Height: {height}cm </Text>

          <Text className={textClass}>Mass: {mass}kg</Text>

          <Text className={textClass}>Skin color: {skin_color}</Text>

          <Text className={textClass}>Eyes color: {eye_color}</Text>

          <Text className={textClass}>Hair color: {hair_color}</Text>

          <Text className={textClass}>
            Species: {species_names.length === 0 ? "none" : species_names}
          </Text>
        </View>

        <View style={styles.container} className="m-3 p-3 rounded bg-white">
          <Text className={`${textClass} font-bold mb-2`}>Vehicles:</Text>

          <View className="flex flex-row flex-wrap">
            {vehiclesFull.map((vehicle) => (
              <TouchableNativeFeedback key={vehicle.name} onPress={() => console.log("press")}>
                <View className="bg-gray-300 rounded py-1 px-3 m-1">
                  <Text>{vehicle.name}</Text>
                </View>
              </TouchableNativeFeedback>
            ))}
          </View>
        </View>

        <View style={styles.container} className="m-3 p-3 rounded bg-white">
          <Text className={`${textClass} font-bold mb-2`}>Starships:</Text>

          <View className="flex flex-row flex-wrap">
            {starshipsFull.map((starship) => (
              <TouchableNativeFeedback key={starship.name} onPress={() => console.log("press")}>
                <View className="bg-gray-300 rounded py-1 px-3 m-1">
                  <Text>{starship.name}</Text>
                </View>
              </TouchableNativeFeedback>
            ))}
          </View>
        </View>

        <View style={styles.container} className="m-3 p-3 rounded bg-white">
          <Text className={`${textClass} font-bold mb-2`}>Films:</Text>

          <View className="flex flex-row flex-wrap">
            {filmsFull.map((film) => (
              <TouchableNativeFeedback key={film.episode_id} onPress={() => console.log("press")}>
                <View className="bg-gray-300 rounded py-1 px-3 m-1">
                  <Text>{film.title}</Text>
                </View>
              </TouchableNativeFeedback>
            ))}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.25,
    shadowRadius: 2,
    elevation: 5,
  },
});
