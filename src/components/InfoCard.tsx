import React from "react";
import {
  Text,
  View,
  TouchableNativeFeedback,
  ActivityIndicator,
} from "react-native";
import { Container } from "./Container";
import { Starship } from "../types/Starship";
import { Film } from "../types/Film";
import { Person } from "../types/Person";
import { Vehicle } from "../types/Vehicle";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { StackParams } from "../../App";
import { Screen } from "../types/Screen";
import { Planet } from "../types/Planet";
import { Loader } from "./Loader";

type Props = {
  objects: Vehicle[] | Person[] | Starship[] | Film[] | Planet[];
  to: Screen;
  title?: string;
  isLoading: boolean;
};

const textClass = "text-xl";

export const InfoCard = ({ objects, to, title, isLoading }: Props) => {
  const navigation = useNavigation<NativeStackNavigationProp<StackParams>>();

  return (
    <Container>
      <Text className={`${textClass} font-bold mb-2`}>{`${
        title ?? `${to}s:`
      }`}</Text>

      {!isLoading && objects.length !== 0 ? (
        <View className="flex flex-row flex-wrap">
          {objects.map((object) => {
            return (
              <TouchableNativeFeedback
                key={object.created}
                onPress={() =>
                  navigation.push(to as any, { object })
                }
              >
                <View className="bg-gray-300 rounded py-1 px-3 m-1 border-b-2 border-b-gray-500">
                  <Text>{object.name}</Text>
                </View>
              </TouchableNativeFeedback>
            );
          })}
        </View>
      ) : (
        <View>
          <Text>No {(title ? title.slice(0, -1) : `${to}s`).toLowerCase()}</Text>
        </View>
      )}

      {isLoading && (
        <Loader />
      )}
    </Container>
  );
};
