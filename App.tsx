import { StatusBar } from "expo-status-bar";
import { FavouritesProvider } from "./src/context.ts/favouritesContext";
import { MainScreen } from "./src/screens/mainScreen";

export default function App() {
  return (
    <FavouritesProvider>
      <MainScreen />

      <StatusBar style="auto" />
    </FavouritesProvider>
  );
}
