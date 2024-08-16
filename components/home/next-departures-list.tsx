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
import { Icon } from "@/components/ui/icon";
import { Clock } from "lucide-react-native";
import { HStack } from "@/components/ui/hstack";

export function NextDeparturesList() {
  const nextDepartures = useAtomValue(nextDeparturesAtom);

  const parsedNextDeparturesList = tail(
    map(nextDepartures, (item) => ({
      departure: item.departure,
      arrival: item.arrival,
    })),
  );

  return (
    <>
      <HStack className="mt-20 items-center" space="sm">
        <Icon as={Clock} size="xl" />
        <Heading size="xl" className="flex justify-center items-center  ">
          Próximos horários
        </Heading>
      </HStack>
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
              ListEmptyComponent={() => (
                <Box className="flex justify-center items-center w-full h-[100px]">
                  <Text>Nenhum horário disponível</Text>
                </Box>
              )}
            />
          </VStack>
        </Card>
      </Box>
    </>
  );
}
