import { View, Text, TouchableNativeFeedback } from "react-native";
import { CountCard } from "./CountCard";
import { useFavouritesContext } from "../context.ts/favouritesContext";

export const Header = () => {
  const { maleCount, femaleCount, otherCount } =
    useFavouritesContext();

  return (
    <View className="flex flex-row justify-between">
      <CountCard number={femaleCount} title="Female Fans" />

      <CountCard number={maleCount} title="Male Fans" />

      <CountCard number={otherCount} title="Others" />
    </View>
  );
};
