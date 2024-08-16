import { Container } from "@/components/container";
import { Text } from "@/components/ui/text";
import { Card } from "@/components/ui/card";
import { Center } from "@/components/ui/center";
import { Heading } from "@/components/ui/heading";
import { VStack } from "@/components/ui/vstack";
import { useAtomValue, useSetAtom } from "jotai";
import {
  currentClassRoomByDateAtom,
  currentDateAtom,
  currentEarlyClassAtom,
} from "@/atoms/classes";
import { useFocusEffect } from "@react-navigation/core";
import React, { useCallback } from "react";
import { HStack } from "@/components/ui/hstack";
import { Box } from "@/components/ui/box";

interface TextWithLabelProps {
  label: string;
  value: string;
}

function TextWithLabel({ label, value }: TextWithLabelProps) {
  return (
    <HStack space="xs">
      <Text>{label}</Text>
      <Text className="font-bold">{value}</Text>
    </HStack>
  );
}

export default function ClassesScreen() {
  const currentClassRoomToday = useAtomValue(currentClassRoomByDateAtom);

  const refreshDate = useSetAtom(currentDateAtom);

  useFocusEffect(
    useCallback(() => {
      refreshDate(new Date());
    }, [refreshDate]),
  );

  const earlyClass = useAtomValue(currentEarlyClassAtom);

  return (
    <Container>
      <VStack space="lg">
        <Center>
          <Heading className="text-2xl">Aula(s) de Hoje</Heading>
        </Center>

        <Center>
          <Box className="mt-10 w-[200px] h-[200px] border border-blue-400 rounded-full">
            <VStack space="md" className="justify-center items-center flex-1">
              <Text className="text-2xl">Sala</Text>
              <Heading className="text-3xl tracking-wider">
                {earlyClass?.room}
              </Heading>
              <Text className="text-xl ">{earlyClass?.date}</Text>
            </VStack>
          </Box>
        </Center>

        <VStack space="2xl" className="mt-10">
          {currentClassRoomToday.classes.map((classRoom) => (
            <Card
              className="mx-2"
              key={`${classRoom.startAt}-${classRoom.endAt}`}
            >
              <VStack space="md">
                <Heading>{classRoom.name}</Heading>

                <TextWithLabel label={"Professor:"} value={classRoom.teacher} />

                <TextWithLabel
                  label={"Horário:"}
                  value={`${classRoom.startAt} - ${classRoom.endAt}`}
                />

                <TextWithLabel label={"Sala:"} value={classRoom.room} />
              </VStack>
            </Card>
          ))}
        </VStack>
      </VStack>
    </Container>
  );
}
