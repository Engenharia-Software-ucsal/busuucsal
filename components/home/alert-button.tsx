import {
  Select,
  SelectBackdrop,
  SelectContent,
  SelectDragIndicator,
  SelectDragIndicatorWrapper,
  SelectItem,
  SelectPortal,
  SelectTrigger,
} from "@/components/ui/select";

import {
  Toast,
  ToastDescription,
  ToastTitle,
  useToast,
} from "@/components/ui/toast";
import { Text } from "@/components/ui/text";

export enum AlertType {
  BUS_DELAY = "bus_delay",
  BUS_BROKEN = "bus_broken",
  BUS_FULL = "bus_full",
}

export function AlertButton() {
  const toast = useToast();

  function handleSelectAlert(value: AlertType) {
    toast.show({
      id: "alert",
      placement: "top",
      containerStyle: {
        marginTop: 50,
      },
      render({ id }) {
        return (
          <Toast nativeID={id} variant="outline" action="info">
            <ToastTitle>Alerta emitido !</ToastTitle>
            <ToastDescription>
              Avisaremos outros usuários sobre o seu alerta
            </ToastDescription>
          </Toast>
        );
      },
    });
  }

  return (
    <Select
      onValueChange={(value) => {
        handleSelectAlert(value as AlertType);
      }}
    >
      <SelectTrigger variant="outline" size="lg">
        <Text className="p-2 text-lg">Notificar alerta</Text>
      </SelectTrigger>
      <SelectPortal>
        <SelectBackdrop />
        <SelectContent>
          <SelectDragIndicatorWrapper>
            <SelectDragIndicator />
          </SelectDragIndicatorWrapper>
          <SelectItem label="Onibus atrasou" value={AlertType.BUS_DELAY} />
          <SelectItem label="Onbius quebrou" value={AlertType.BUS_BROKEN} />
          <SelectItem label="Onibus cheio" value={AlertType.BUS_FULL} />
        </SelectContent>
      </SelectPortal>
    </Select>
  );
}
