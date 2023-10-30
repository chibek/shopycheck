import React from "react";
import { TouchableOpacity, TouchableOpacityProps } from "react-native";
import { Ionicons } from "@expo/vector-icons";

type ButtonProps = {
  icon?: React.ComponentProps<typeof Ionicons>["name"];
  text?: string;
  size?: number;
  color?: string;
  onPress?: () => void;
} & TouchableOpacityProps;

export default function Button({
  icon,
  text,
  onPress,
  size = 24,
  color = "black",
  ...rest
}: ButtonProps) {
  return (
    <TouchableOpacity {...rest} onPress={onPress}>
      {icon ? <Ionicons name={icon} size={size} color={color} /> : null}
      {text ? <span>{text}</span> : null}
    </TouchableOpacity>
  );
}
