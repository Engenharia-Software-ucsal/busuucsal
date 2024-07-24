import React from "react";
import { Box } from "@/components/ui/box";
import { tva } from "@gluestack-ui/nativewind-utils/tva";
import { VariantProps } from "@gluestack-ui/nativewind-utils";

const baseStyle = tva({
  base: "flex flex-col mt-20",
});

export interface ContainerProps extends VariantProps<typeof baseStyle> {
  children: React.ReactNode;
  className?: string;
}

export function Container({ children, className, ...props }: ContainerProps) {
  return (
    <Box {...props} className={baseStyle({ class: className })}>
      {children}
    </Box>
  );
}
