import React from "react";
import { Text, View, TouchableNativeFeedback } from "react-native";
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

type Props = {
  objects: Vehicle[] | Person[] | Starship[] | Film[] | Planet[];
  to: Screen;
  title?: string;
};

const textClass = "text-xl";

export const InfoCard = ({ objects, to, title }: Props) => {
  const navigation = useNavigation<NativeStackNavigationProp<StackParams>>();

  return (
    <Container>
      <Text className={`${textClass} font-bold mb-2`}>{`${title ?? `${to}s:`}`}</Text>

      <View className="flex flex-row flex-wrap">
        {objects.map((object) => {
          return (
            <TouchableNativeFeedback
              key={object.created}
              onPress={() => navigation.push(to as any, { [to.toLowerCase()]: object })}
            >
              <View className="bg-gray-300 rounded py-1 px-3 m-1">
                <Text>{object.name}</Text>
              </View>
            </TouchableNativeFeedback>
          );
        })}
      </View>
    </Container>
  );
};
