import { StatusBar } from "expo-status-bar";
import { FavouritesProvider } from "./src/context.ts/favouritesContext";
import { MainScreen } from "./src/screens/MainScreen";
import { PersonScreen } from "./src/screens/PersonScreen";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Person } from "./src/types/person";

export type StackParams = {
  Main: undefined;
  Person: {
    person: Person;
  };
}

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
            options={{ headerShown: false }}
          />
        </Stack.Navigator>

        <StatusBar style="auto" />
      </NavigationContainer>
    </FavouritesProvider>
  );
}
