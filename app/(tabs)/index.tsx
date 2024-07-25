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
import { chain, map, reduce } from "lodash";
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

  const nextDepartures = chain(currentItinerary)
    .map((item) => {
      const [hour, minute] = item.departure.split(":").map(Number);
      return {
        time: item,
        queryDate: localeDateWithTimezone
          .set("hours", hour)
          .set("minutes", minute),
      };
    })
    .filter(({ queryDate, time }) => queryDate.isAfter(localeDateWithTimezone))
    .value();

  const earlyNextDeparture = reduce(nextDepartures, (acc, item) => {
    acc =
      item.queryDate.diff(localeDateWithTimezone) <
      acc.queryDate.diff(localeDateWithTimezone)
        ? item
        : acc;

    return acc;
  });

  const parsedNextDepartures = chain(nextDepartures)
    .tail()
    .map((item) => ({
      departure: parseTime(item.time.departure),
      arrival: parseTime(item.time.arrival),
    }))
    .value();

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
            <Text size="4xl">{earlyNextDeparture?.time.departure}</Text>
          </VStack>
        </Box>
        <Heading size="xl" className="flex justify-center items-center mt-20 ">
          Próximos horários
        </Heading>
        <Box className="w-full px-10 mt-10 mb-14">
          <Card size="lg" className="w-full">
            <VStack space="2xl">
              <Box className="flex-row justify-between">
                <Heading>Saida</Heading>
                <Heading>Chegada</Heading>
              </Box>

              <VStack space="lg">
                <FlatList
                  style={{ maxHeight: 200, paddingBottom: 20 }}
                  keyExtractor={({ departure, arrival }, index) =>
                    `${index}-${departure}-${arrival}`
                  }
                  showsVerticalScrollIndicator={false}
                  data={parsedNextDepartures}
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
