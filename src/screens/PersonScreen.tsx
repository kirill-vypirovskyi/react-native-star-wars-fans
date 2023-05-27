import { View, Text, ScrollView, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Person } from "../types/person";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { StackParams } from "../../App";

type Props = NativeStackScreenProps<StackParams, "Person">;

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

  const textClass = "text-xl";

  return (
    <SafeAreaView className="flex-1 bg-gray-100">
      <ScrollView>
        <View style={styles.container} className="m-3 p-3 rounded bg-white">
          <Text className="text-2xl">{name}</Text>

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
          <Text className={`${textClass} font-bold`}>Vehicles</Text>
          <Text className={textClass}>{vehicles}</Text>
        </View>

        <View style={styles.container} className="m-3 p-3 rounded bg-white">
          <Text className={`${textClass} font-bold`}>Starships</Text>
          <Text className={textClass}>{starships}</Text>
        </View>

        <View style={styles.container} className="m-3 p-3 rounded bg-white">
          <Text className={`${textClass} font-bold`}>Films</Text>
          <Text className={textClass}>{films}</Text>
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
