import React, { useState, useEffect } from "react";
import { TouchableOpacity, Text, ScrollView, View, Dimensions } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { cellTrimmer } from "./cellTrimmer";
import globalStyles from "../../../styles/globalStyles";

const NavigationCell = ({ data, routeName, screen, style }) => {
  const navigation = useNavigation();
  const width = Dimensions.get('window').width;
  const generalStyles = globalStyles(width);
  const [textValue, setTextValue] = useState("");

  // Truncate text if exceeds maxLength characters
  useEffect(() => {
    const maxLength = 20;
    cellTrimmer({ maxLength, value: data._id, setText: setTextValue });
  }, [data._id]);

  const handlePress = () => {
    if (style === "User") {
      console.log("User navigation");
      navigation.navigate(routeName, { screen: screen });
    } else {
      console.log("Device navigation");
      navigation.navigate(routeName, { data });
    }
  };

  return (
    <ScrollView horizontal contentContainerStyle={generalStyles.cellWidth}>
      <TouchableOpacity
        style={generalStyles.cellOutView}
        onPress={handlePress}
      >
        <View style={generalStyles.cellView}>
          <Text style={generalStyles.cellComponent}>
            {textValue}
          </Text>
        </View>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default NavigationCell;
