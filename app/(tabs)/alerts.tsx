import { Container } from "@/components/container";
import { Box } from "@/components/ui/box";
import { Button, ButtonIcon, ButtonText } from "@/components/ui/button";
import { Heading } from "@/components/ui/heading";
import {
  Select,
  SelectBackdrop,
  SelectContent,
  SelectDragIndicator,
  SelectDragIndicatorWrapper,
  SelectIcon,
  SelectInput,
  SelectItem,
  SelectPortal,
  SelectTrigger,
} from "@/components/ui/select";
import { Text } from "@/components/ui/text";
import { VStack } from "@/components/ui/vstack";
import { ArrowRight, ChevronDownIcon } from "lucide-react-native";

export default function AlertsScreen() {
  function handleSendAlert() {}

  return (
    <Container>
      <Box className="justify-center items-center">
        <Heading className="text-3xl">Alertas</Heading>
        <Text className="text-xl px-10 text-center">Avise outros estudantes sobre o status do Busu ucsal</Text>

        <VStack space="md" className="mt-10">
          <Select>
            <SelectTrigger variant="outline" size="lg">
              <SelectInput placeholder="Selecione um opção" />
              <SelectIcon className="mr-3" as={ChevronDownIcon} />
            </SelectTrigger>
            <SelectPortal>
              <SelectBackdrop />
              <SelectContent>
                <SelectDragIndicatorWrapper>
                  <SelectDragIndicator />
                </SelectDragIndicatorWrapper>
                <SelectItem label="Busu UCSAL indisponível (Uso da Van)" value="van" />
                <SelectItem label="Busu UCSAL atrasado" value="buss-late" />
              </SelectContent>
            </SelectPortal>
          </Select>

          <Button size="md" variant="solid" action="primary" onPress={handleSendAlert}>
            <ButtonText>Enviar</ButtonText>
            <ButtonIcon as={ArrowRight} />
          </Button>
        </VStack>
      </Box>
    </Container>
  );
}
