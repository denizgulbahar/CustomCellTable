import React, { useState, useEffect } from "react";
import { Text, View, Dimensions } from "react-native";
import globalStyles from "../../../styles/globalStyles";
import { cellTrimmer } from "./cellTrimmer";

const TextCell = ({ item }) => {
  const width = Dimensions.get('window').width;
  const generalStyles = globalStyles(width);

  const [textValue, setTextValue] = useState(item);

  const maxLength = 40;

  useEffect(() => {
    cellTrimmer({ maxLength, value: textValue, setText: setTextValue });
  }, [textValue]);

  return (
    <View style={generalStyles.cellOutView}>
      <Text style={generalStyles.cellComponent}>
        {textValue}
      </Text>
    </View>
  );
}

export default TextCell;
