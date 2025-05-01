import React from "react";
import { Dimensions, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { IconButton } from "react-native-paper";
import { color } from "../../../styles/color";

const screenWidth = Dimensions.get("window").width;
const isLargeScreen = screenWidth > 500;
const BUTTON_SIZE = isLargeScreen ? 100 : 75;
const ICON_SIZE = isLargeScreen ? 50 : 40;

const styles = StyleSheet.create({
  button: {
    width: BUTTON_SIZE,
    height: BUTTON_SIZE,
  },
});

export const DeleteButton = ({ onDelete }) => (
  <IconButton
    icon={() => (
      <Ionicons name="close-circle" size={ICON_SIZE} color={color.red} />
    )}
    style={styles.button}
    onPress={onDelete}
  />
);
