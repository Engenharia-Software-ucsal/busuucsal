import { Tabs } from "expo-router";
import React from "react";

import { TabBarIcon } from "@/components/navigation/TabBarIcon";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Ônibus",
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon
              name={focused ? "bus-sharp" : "bus-outline"}
              color={color}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="classes"
        options={{
          title: "Aulas",
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon
              name={focused ? "calendar" : "calendar-outline"}
              color={color}
            />
          ),
        }}
      />


  <Tabs.Screen
        name="alerts"
        options={{
          title: "Alertas",
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon
              name={focused ? "alert-circle" : "alert-circle-outline"}
              color={color}
            />
          ),
        }}
      />

    </Tabs>
  );
}
