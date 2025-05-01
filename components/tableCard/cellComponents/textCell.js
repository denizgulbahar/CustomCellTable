import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet, Dimensions } from "react-native";
import { color } from "../../../styles/color";
import { cellTrimmer } from "./cellTrimmer";


const { width } = Dimensions.get('window');
const TextCell = ({ item, isBold }) => {
  const [textValue, setTextValue] = useState(item);

  const maxLength = 40;

  useEffect(() => {
    cellTrimmer({ maxLength, value: textValue, setText: setTextValue });
  }, [textValue]);

  return (
    <View style={styles.cellOutView}>
      <Text style={[styles.cellComponent, {fontWeight: isBold ? "600" : "400" }]}>
        {textValue}
      </Text>
    </View>
  );
}
const styles = StyleSheet.create({
  cellOutView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: "center",
    minWidth: 60,
  },
  cellComponent: {
    textAlign: "center",
    fontSize: width > 500 ? 15 : 12,
    
    color: color.black,
    padding: 0,
},
})
export default TextCell;
