import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import "react-native-reanimated";

import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import weekday from "dayjs/plugin/weekday";
import { Provider as JotaiProvider } from "jotai";

import { GluestackUIProvider } from "@/components/ui/gluestack-ui-provider";

import "../global.css";
import { AppLoading } from "@/components/app-loading";

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.extend(weekday);

void SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });

  const isDark = true;

  useEffect(() => {
    if (loaded) {
      void SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return <AppLoading />;
  }

  return (
    <GluestackUIProvider mode={isDark ? "dark" : "light"}>
      <ThemeProvider value={isDark ? DarkTheme : DefaultTheme}>
        <JotaiProvider>
          <Stack>
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            <Stack.Screen name="+not-found" />
          </Stack>
        </JotaiProvider>
      </ThemeProvider>
    </GluestackUIProvider>
  );
}
