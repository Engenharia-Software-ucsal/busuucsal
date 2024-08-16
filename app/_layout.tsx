import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import { useState } from "react";
import "react-native-reanimated";
import { Provider as JotaiProvider } from "jotai";

import { GluestackUIProvider } from "@/components/ui/gluestack-ui-provider";

import "../global.css";
import { AppLoading } from "@/components/app-loading";

export default function RootLayout() {
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });

  const [animationIsFinished, setAnimationIsFinished] = useState(false);

  const isDark = true;

  if (!loaded || !animationIsFinished) {
    return (
      <AppLoading onAnimationFinish={() => setAnimationIsFinished(true)} />
    );
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
