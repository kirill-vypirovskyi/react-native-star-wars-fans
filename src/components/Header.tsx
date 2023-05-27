import { View, Text, TouchableNativeFeedback } from "react-native";
import { CountCard } from "./CountCard";
import { useFavouritesContext } from "../context.ts/favouritesContext";

export const Header = () => {
  const { 
    clearAllFavourites, 
    maleCount, 
    femaleCount, 
    otherCount,
  } = useFavouritesContext();

  return (
    <>
      <View className="mb-6">
        <View className="flex flex-row justify-between">
          <Text className="text-xl">Star Wars Fans</Text>

          <TouchableNativeFeedback onPress={() => clearAllFavourites()}>
            <View className="border border-red-400 py-1 px-4 rounded">
              <Text className="text-red-400 uppercase">Clear fans</Text>
            </View>
          </TouchableNativeFeedback>
        </View>
      </View>

      <View className="flex flex-row justify-between">
        <CountCard number={femaleCount} title="Female Fans" />

        <CountCard number={maleCount} title="Male Fans" />

        <CountCard number={otherCount} title="Others" />
      </View>
    </>
  );
};
