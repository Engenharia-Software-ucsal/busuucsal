import React from "react";

import { Heading } from "@/components/ui/heading";
import { Box } from "@/components/ui/box";
import { VStack } from "@/components/ui/vstack";
import { Text } from "@/components/ui/text";

import { useAtomValue } from "jotai";
import {
  distanceToNextDepartureAtom,
  earlyDepartureTimeAtom,
  formattedDateAtom,
} from "@/atoms/itinenary";

export function EarlyDepartureIndicator() {
  const todayTitle = useAtomValue(formattedDateAtom);
  const earlyNextDeparture = useAtomValue(earlyDepartureTimeAtom);
  const distanceToNextDeparture = useAtomValue(distanceToNextDepartureAtom);

  return (
    <>
      <Heading size="xl" className="flex justify-center items-center mt-10">
        {todayTitle}
      </Heading>
      <Box className="mt-10 w-[250px] h-[250px] border border-blue-400 rounded-full">
        <VStack space="lg" className="justify-center items-center flex-1">
          {earlyNextDeparture && <Text size="xl">Próxima saída</Text>}

          <Text size="4xl">{earlyNextDeparture ?? "Sem horários"}</Text>

          <Text>
            Faltam <Text className="font-bold">{distanceToNextDeparture}</Text>
          </Text>
        </VStack>
      </Box>
    </>
  );
}
