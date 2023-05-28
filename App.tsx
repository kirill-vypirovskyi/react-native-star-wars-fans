import { StatusBar } from "expo-status-bar";
import { FavouritesProvider } from "./src/context.ts/favouritesContext";
import { MainScreen } from "./src/screens/MainScreen";
import { PersonScreen } from "./src/screens/PersonScreen";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Person } from "./src/types/person";
import { Vehicle } from "./src/types/Vehicle";
import { Starship } from "./src/types/Starship";
import { Film } from "./src/types/Film";
import { VehicleScreen } from "./src/screens/VehicleScreen";
import { BackToHomeButton } from "./src/components/BackToHomeButton";
import { StarshipScreen } from "./src/screens/StarshipScreen";
import { FilmScreen } from "./src/screens/FilmScreen";
import { PlanetScreen } from "./src/screens/PlanetScreen";
import { Planet } from "./src/types/Planet";

export type StackParams = {
  Main: undefined;
  Person: {
    person: Person;
  };
  Vehicle: {
    vehicle: Vehicle;
  };
  Starship: {
    starship: Starship;
  };
  Film: {
    film: Film;
  };
  Planet: {
    planet: Planet;
  };
};

const Stack = createNativeStackNavigator<StackParams>();

export default function App() {
  return (
    <FavouritesProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Main">
          <Stack.Screen
            name="Main"
            component={MainScreen}
            options={{ headerShown: false }}
          />

          <Stack.Screen
            name="Person"
            component={PersonScreen}
            options={{
              headerTitle: "Character",
              headerRight: () => <BackToHomeButton />,
            }}
          />

          <Stack.Screen
            name="Vehicle"
            component={VehicleScreen}
            options={{
              headerRight: () => <BackToHomeButton />,
            }}
          />

          <Stack.Screen
            name="Starship"
            component={StarshipScreen}
            options={{
              headerRight: () => <BackToHomeButton />,
            }}
          />

          <Stack.Screen
            name="Film"
            component={FilmScreen}
            options={{
              headerRight: () => <BackToHomeButton />,
            }}
          />

          <Stack.Screen
            name="Planet"
            component={PlanetScreen}
            options={{
              headerRight: () => <BackToHomeButton />,
            }}
          />
        </Stack.Navigator>

        <StatusBar style="auto" />
      </NavigationContainer>
    </FavouritesProvider>
  );
}
