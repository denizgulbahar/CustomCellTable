import React,{ useContext } from "react";
import { ThemeContext } from "../../../contexts/ThemeContext";
import { Text, StyleSheet, View, TextInput, Dimensions } from "react-native";
import Loading from "../../../../components/loading/loading"
import globalStyles from "../../../styles/GlobalStyles";
const width = Dimensions.get('window').width;
const generalStyles = globalStyles(width)
// EditableCell && EditableScrollCell
const EditableCellInput = (({onChange,value,isLoading,style}) => {
  const color = useContext(ThemeContext)
  const handleClick = (value) => {
      onChange(value);
  };
  
  return ( isLoading ? 
          (
              <View style={{width:60, height:40, alignSelf:"center"}}>
                  <Loading style="cell" />
              </View>
          ) :
          (
                <TextInput
                  value={value}
                  onChangeText={handleClick}
                  multiline
                  style={[styles.inputComponent,
                  {borderColor:color.inputGreyColor,backgroundColor:color.whiteColor}]}
                  />
               
          )
  );
});

const styles = StyleSheet.create({
  inputComponent: {
    borderWidth: 1,
    ...generalStyles.input,
    paddingVertical:5,
    ...generalStyles.shadowRadiusStyle,
    borderRadius:5,
  }
});

export default EditableCellInput;