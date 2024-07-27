import React from "react";
import { Box } from "@/components/ui/box";
import { Card } from "@/components/ui/card";
import { VStack } from "@/components/ui/vstack";
import { Heading } from "@/components/ui/heading";
import { FlatList } from "react-native";
import { Text } from "@/components/ui/text";
import { useAtomValue } from "jotai";
import { nextDeparturesAtom } from "@/atoms/itinenary";
import { map, tail } from "lodash";

function EmptyList() {
  return (
    <Box className="flex justify-center items-center w-full h-[100px]">
      <Text>Nenhum horário disponível</Text>
    </Box>
  );
}

export function NextDeparturesList() {
  const nextDepartures = useAtomValue(nextDeparturesAtom);

  const parsedNextDeparturesList = tail(
    map(nextDepartures, (item) => ({
      departure: item.departure.replace(/:/, "h"),
      arrival: item.arrival.replace(/:/, "h"),
    })),
  );

  return (
    <>
      <Heading size="xl" className="flex justify-center items-center mt-20 ">
        Próximos horários
      </Heading>
      <Box className="w-full px-10 mt-10 mb-14">
        <Card size="lg" className="w-full max-h-[200px]">
          <VStack space="2xl">
            <Box className="flex-row justify-between">
              <Heading>Saída</Heading>
              <Heading>Chegada</Heading>
            </Box>

            <FlatList
              style={{ maxHeight: 100 }}
              keyExtractor={({ departure, arrival }, index) =>
                `${index}-${departure}-${arrival}`
              }
              data={parsedNextDeparturesList}
              ItemSeparatorComponent={() => <Box className="mt-4" />}
              renderItem={({ item }) => (
                <Box className="flex-row justify-between">
                  <Text>{item.departure}</Text>
                  <Text>{item.arrival}</Text>
                </Box>
              )}
              ListEmptyComponent={<EmptyList />}
            />
          </VStack>
        </Card>
      </Box>
    </>
  );
}
