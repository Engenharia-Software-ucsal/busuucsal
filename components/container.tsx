import React from "react";
import { Box } from "@/components/ui/box";
import { tva } from "@gluestack-ui/nativewind-utils/tva";
import { VariantProps } from "@gluestack-ui/nativewind-utils";
import { ScrollView } from "react-native";

const baseStyle = tva({
  base: "flex flex-col mt-20 mb-40",
});

export interface ContainerProps extends VariantProps<typeof baseStyle> {
  children: React.ReactNode;
  className?: string;
  useScrollView?: boolean;
}

export function Container({
  children,
  className,
  useScrollView,
  ...props
}: ContainerProps) {
  return useScrollView ? (
    <ScrollView>
      <Box {...props} className={baseStyle({ class: className })}>
        {children}
      </Box>
    </ScrollView>
  ) : (
    <Box {...props} className={baseStyle({ class: className })}>
      {children}
    </Box>
  );
}
