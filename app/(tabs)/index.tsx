import { Heading } from "@/components/ui/heading";
import { Container } from "@/components/container";
import { Box } from "@/components/ui/box";
import { Text } from "@/components/ui/text";
import { VStack } from "@/components/ui/vstack";
import { Card } from "@/components/ui/card";

import dayjs from "dayjs";
import ptBrLocale from "dayjs/locale/pt-br";

import {
  busItinerary,
  defaultTimeZone,
  parseTime,
  parseWeekDay,
} from "@/constants/busItinerary";
import { FlatList } from "react-native";
import { chain, map } from "lodash";
import { useEffect, useState } from "react";

const getCurrentDateQuery = () =>
  dayjs().tz(defaultTimeZone, true).utc().locale(ptBrLocale);

export default function HomeScreen() {
  const [localeDateWithTimezone, setLocaleDateWithTimezone] = useState(
    getCurrentDateQuery(),
  );

  const todayTitle = localeDateWithTimezone
    .format("dddd, D [de] MMMM")
    .replace(/^\w/, (c) => c.toUpperCase());

  const currentDayInWeek = parseWeekDay(localeDateWithTimezone.day());
  const currentItinerary = busItinerary[currentDayInWeek];

  const formattedItinerary = map(currentItinerary, (item) => ({
    departure: parseTime(item.departure),
    arrival: parseTime(item.arrival),
  }));

  const nextDeparture =
    chain(currentItinerary)
      .map("departure")
      .map((item) => {
        const [hour, minute] = item.split(":").map(Number);
        return {
          time: item,
          queryDate: localeDateWithTimezone
            .set("hours", hour)
            .set("minutes", minute),
        };
      })
      .filter(({ queryDate, time }) =>
        queryDate.isAfter(localeDateWithTimezone),
      )
      .reduce((acc, item) => {
        acc =
          item.queryDate.diff(localeDateWithTimezone) <
          acc.queryDate.diff(localeDateWithTimezone)
            ? item
            : acc;

        return acc;
      })
      .value()?.time ?? "Sem horários";

  useEffect(() => {
    const interval = setInterval(() => {
      setLocaleDateWithTimezone(getCurrentDateQuery());
    }, 5000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <Container>
      <Box className="items-center">
        <Heading size="2xl" className="flex justify-center items-center">
          Ônibus UCSAL
        </Heading>
        <Heading size="xl" className="flex justify-center items-center mt-10">
          {todayTitle}
        </Heading>
        <Box className="mt-10 w-[250px] h-[250px] border border-blue-400 rounded-full">
          <VStack space="lg" className="justify-center items-center flex-1">
            <Text size="xl">Próxima saída</Text>
            <Text size="4xl">{nextDeparture}</Text>
          </VStack>
        </Box>
        <Heading size="xl" className="flex justify-center items-center mt-20 ">
          Próximos horários
        </Heading>
        <Box className="w-full px-10 mt-10">
          <Card size="lg" className="w-full">
            <VStack space="2xl">
              <Box className="flex-row justify-between">
                <Heading>Saida</Heading>
                <Heading>Chegada</Heading>
              </Box>

              <VStack space="lg" className="max-h-[200px]">
                <FlatList
                  keyExtractor={(item, index) =>
                    `${index}-${item.departure}-${item.arrival}`
                  }
                  showsVerticalScrollIndicator={false}
                  data={formattedItinerary}
                  ItemSeparatorComponent={() => <Box className="mt-4" />}
                  renderItem={({ item }) => (
                    <Box className="flex-row justify-between">
                      <Text>{item.departure}</Text>
                      <Text>{item.arrival}</Text>
                    </Box>
                  )}
                />
              </VStack>
            </VStack>
          </Card>
        </Box>
      </Box>
    </Container>
  );
}
