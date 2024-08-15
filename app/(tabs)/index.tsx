import { Heading } from "@/components/ui/heading";
import { Container } from "@/components/container";
import { Box } from "@/components/ui/box";
import { useCallback } from "react";
import { EarlyDepartureIndicator } from "@/components/home/early-departure-indicator";
import { NextDeparturesList } from "@/components/home/next-departures-list";
import { useSetAtom } from "jotai";
import { currentDateAtom } from "@/atoms/itinenary";
import { useFocusEffect } from "@react-navigation/core";

export default function HomeScreen() {
  const updateCurrentDate = useSetAtom(currentDateAtom);

  useFocusEffect(
    useCallback(() => {
      const interval = setInterval(() => {
        updateCurrentDate(new Date());
      }, 5000);

      return () => clearInterval(interval);
    }, [updateCurrentDate]),
  );

  return (
    <Container>
      <Box className="items-center">
        <Heading size="2xl" className="flex justify-center items-center">
          Ônibus UCSAL
        </Heading>

        <EarlyDepartureIndicator />
        <NextDeparturesList />
      </Box>
    </Container>
  );
}
