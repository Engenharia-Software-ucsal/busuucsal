import { HStack } from "./ui/hstack/index";
import { Text } from "./ui/text";

export interface TextWithLabelProps {
  label: string;
  value: string;
  icon?: React.ReactNode;
}

export function TextWithLabel({ label, value, icon }: TextWithLabelProps) {
  return (
    <HStack space="xs" className="items-center">
      {icon}
      <Text>{label}</Text>
      <Text className="font-bold">{value}</Text>
    </HStack>
  );
}
