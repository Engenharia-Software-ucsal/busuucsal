import { Container } from "@/components/container";
import { Text } from "@/components/ui/text";
import { Card } from "@/components/ui/card";
import { Center } from "@/components/ui/center";
import { Heading } from "@/components/ui/heading";
import { VStack } from "@/components/ui/vstack";
import { useAtomValue, useSetAtom } from "jotai";
import {
  currentClassRoomByDateAtom,
  currentEarlyClassAtom,
} from "@/atoms/classes";
import { useFocusEffect } from "@react-navigation/core";
import React, { useCallback } from "react";
import { HStack } from "@/components/ui/hstack";
import { Box } from "@/components/ui/box";
import { currentDateAtom, formattedDateAtom } from "@/atoms/date";
import { Icon } from "@/components/ui/icon";
import { Clock, DoorOpen, GraduationCap } from "lucide-react-native";

interface TextWithLabelProps {
  label: string;
  value: string;
  icon?: React.ReactNode;
}

function TextWithLabel({ label, value, icon }: TextWithLabelProps) {
  return (
    <HStack space="xs" className="items-center">
      {icon}
      <Text>{label}</Text>
      <Text className="font-bold">{value}</Text>
    </HStack>
  );
}

export default function ClassesScreen() {
  const currentClassRoomToday = useAtomValue(currentClassRoomByDateAtom);
  const todayTitle = useAtomValue(formattedDateAtom);

  const refreshDate = useSetAtom(currentDateAtom);

  useFocusEffect(
    useCallback(() => {
      refreshDate(new Date());
    }, [refreshDate]),
  );

  const earlyClass = useAtomValue(currentEarlyClassAtom);

  const hasClasses = !!currentClassRoomToday?.classes?.length;

  return (
    <Container>
      <VStack space="lg">
        <Center>
          <Heading className="text-2xl">Aula(s) de hoje,</Heading>
          <Text className="text-xl mt-2">{todayTitle}</Text>
        </Center>

        <Center>
          <Box className="mt-10 w-[200px] h-[200px] border border-blue-400 rounded-full">
            <VStack space="md" className="justify-center items-center flex-1">
              {earlyClass?.room ? (
                <>
                  <HStack className="" space="md">
                    <Text className="text-2xl ">Sala Atual</Text>
                  </HStack>
                  <Heading className="text-3xl ">{earlyClass?.room}</Heading>

                  <Text className="text-xl ">{earlyClass?.date}</Text>
                </>
              ) : (
                <VStack className="items-center" space="md">
                  <Heading className="max-w-[150px] text-center">
                    Nada por aqui
                  </Heading>
                </VStack>
              )}
            </VStack>
          </Box>
        </Center>

        <VStack space="2xl" className="mt-10">
          {hasClasses &&
            currentClassRoomToday?.classes.map((classRoom) => (
              <Card
                className="mx-2"
                key={`${classRoom.startAt}-${classRoom.endAt}`}
              >
                <VStack space="md">
                  <Heading>{classRoom.name}</Heading>

                  <TextWithLabel
                    icon={<Icon as={GraduationCap} size="md" />}
                    label={"Professor:"}
                    value={classRoom.teacher}
                  />

                  <TextWithLabel
                    icon={<Icon as={Clock} size="md" />}
                    label={"Horário:"}
                    value={`${classRoom.startAt} - ${classRoom.endAt}`}
                  />

                  <TextWithLabel
                    icon={<Icon as={DoorOpen} size="md" />}
                    label={"Sala:"}
                    value={classRoom.room}
                  />
                </VStack>
              </Card>
            ))}
        </VStack>
      </VStack>
    </Container>
  );
}
