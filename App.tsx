import { StatusBar } from "expo-status-bar";
import { FavouritesProvider } from "./src/context.ts/favouritesContext";
import { MainScreen } from "./src/screens/MainScreen";
import { PersonScreen } from "./src/screens/PersonScreen";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Person } from "./src/types/Person";
import { Vehicle } from "./src/types/Vehicle";
import { Starship } from "./src/types/Starship";
import { Film } from "./src/types/Film";
import { VehicleScreen } from "./src/screens/VehicleScreen";
import { HeaderHomeButton } from "./src/components/HeaderButtons/HeaderHomeButton";
import { StarshipScreen } from "./src/screens/StarshipScreen";
import { FilmScreen } from "./src/screens/FilmScreen";
import { PlanetScreen } from "./src/screens/PlanetScreen";
import { Planet } from "./src/types/Planet";
import { FavoritesScreen } from "./src/screens/FavoritesScreen";
import { HeaderHearthButton } from "./src/components/HeaderButtons/HeaderHeartButton";
import { HeaderTrashButton } from "./src/components/HeaderButtons/HeaderTrashButton";
import { View } from "react-native";

export type StackParams = {
  Main: undefined;
  Favourites: undefined;
  Person: {
    object: Person;
  };
  Vehicle: {
    object: Vehicle;
  };
  Starship: {
    object: Starship;
  };
  Film: {
    object: Film;
  };
  Planet: {
    object: Planet;
  };
};

const Stack = createNativeStackNavigator<StackParams>();

export default function App() {
  return (
    <FavouritesProvider>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Main"
          screenOptions={{
            animation: "slide_from_bottom",
          }}
        >
          <Stack.Screen
            name="Main"
            component={MainScreen}
            options={{
              headerTitle: "Star Wars Fans",
              headerRight: () => <HeaderHearthButton />,
            }}
          />

          <Stack.Screen
            name="Favourites"
            component={FavoritesScreen}
            options={{
              headerTitle: "My Favourites",
              headerRight: () => (
                <View className="flex flex-row">
                  <HeaderTrashButton />
                  <HeaderHomeButton />
                </View>
              ),
            }}
          />

          <Stack.Screen
            name="Person"
            component={PersonScreen}
            options={{
              headerTitle: "Character",
              headerRight: () => <HeaderHomeButton />,
            }}
          />

          <Stack.Screen
            name="Vehicle"
            component={VehicleScreen}
            options={{
              headerRight: () => <HeaderHomeButton />,
            }}
          />

          <Stack.Screen
            name="Starship"
            component={StarshipScreen}
            options={{
              headerRight: () => <HeaderHomeButton />,
            }}
          />

          <Stack.Screen
            name="Film"
            component={FilmScreen}
            options={{
              headerTitle: "Movie",
              headerRight: () => <HeaderHomeButton />,
            }}
          />

          <Stack.Screen
            name="Planet"
            component={PlanetScreen}
            options={{
              headerRight: () => <HeaderHomeButton />,
            }}
          />
        </Stack.Navigator>

        <StatusBar style="auto" />
      </NavigationContainer>
    </FavouritesProvider>
  );
}
