import React,{useContext} from "react";
import { TouchableOpacity, Text, StyleSheet, Dimensions } from "react-native";
import { ThemeContext } from "../../../contexts/ThemeContext";
import { buttonStyler,buttonTextStyler } from "../../../utilities/styleMethods/buttonStyleFunctions";
import globalStyles from "../../../styles/GlobalStyles";

const width = Dimensions.get('window').width;
const generalStyles = globalStyles(width)
// formatTB and DoubleButton(in Cell Components)
const TableButton = ({ background,onPress,title}) => {
  const color = useContext(ThemeContext)

  function handlePress() {
    onPress();
  }
  let buttonStyle
  let buttonTextStyle;
  let backgroundColor;
 // Button && Button Text Style
    if(background==="red"){
      backgroundColor = color.redbtnColor
    } else {
      backgroundColor = color.greenbtnColor
    }
    if(width>=500){
      buttonStyle = buttonStyler(styles.tableButton,backgroundColor, 60, 55)
      buttonTextStyle = buttonTextStyler(styles.buttonText,color.whiteColor,11)
    } else {
      buttonStyle = buttonStyler(styles.tableButtonLittle,backgroundColor, 45, 40)
      buttonTextStyle = buttonTextStyler(styles.buttonText,color.whiteColor,9)
    }
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={handlePress}
      style={buttonStyle}
    >
      <Text style={buttonTextStyle}>{title}</Text>
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  tableButton: {
    ...generalStyles.mediumShadowStyle,
    margin:5,
    borderRadius: 15,
    justifyContent: "center",
    padding:5,
  },
  tableButtonLittle: {
    ...generalStyles.mediumShadowStyle,
    margin:5,
    borderRadius: 12,
    justifyContent: "center",
    padding:5,
  },
  buttonText: {
    textAlign: "center",
    marginVertical:10,
  },
});

export default TableButton;