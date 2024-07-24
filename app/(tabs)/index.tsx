import { Heading } from "@/components/ui/heading";
import { Container } from "@/components/container";
import { Box } from "@/components/ui/box";
import { Text } from "@/components/ui/text";
import { VStack } from "@/components/ui/vstack";
import { Card } from "@/components/ui/card";

export default function HomeScreen() {
  return (
    <Container>
      <Box className="items-center">
        <Heading size="2xl" className="flex justify-center items-center">
          Ônibus UCSAL
        </Heading>
        <Heading size="xl" className="flex justify-center items-center mt-10">
          Sexta-Feira, 12 de Novembro
        </Heading>
        <Box className="mt-10 w-[250px] h-[250px] border border-blue-400 rounded-full">
          <VStack space="lg" className="justify-center items-center flex-1">
            <Text size="xl">Próxima Saída</Text>
            <Text size="4xl">12:00</Text>
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

              <VStack space="lg">
                <Box className="flex-row justify-between">
                  <Text>16:00</Text>
                  <Text>16:00</Text>
                </Box>
                <Box className="flex-row justify-between">
                  <Text>16:00</Text>
                  <Text>16:00</Text>
                </Box>
                <Box className="flex-row justify-between">
                  <Text>16:00</Text>
                  <Text>16:00</Text>
                </Box>
                <Box className="flex-row justify-between">
                  <Text>16:00</Text>
                  <Text>16:00</Text>
                </Box>
              </VStack>
            </VStack>
          </Card>
        </Box>
      </Box>
    </Container>
  );
}
