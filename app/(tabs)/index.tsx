import { Heading } from "@/components/ui/heading";
import { Container } from "@/components/container";
import { Box } from "@/components/ui/box";
import { useEffect } from "react";
import { EarlyDepartureIndicator } from "@/components/home/early-departure-indicator";
import { NextDeparturesList } from "@/components/home/next-departures-list";
import { useSetAtom } from "jotai";
import { currentDateAtom } from "@/atoms/itinenary";

export default function HomeScreen() {
  const updateCurrentDate = useSetAtom(currentDateAtom);

  useEffect(() => {
    const interval = setInterval(() => {
      updateCurrentDate(new Date());
    }, 5000);

    return () => clearInterval(interval);
  }, []);

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
