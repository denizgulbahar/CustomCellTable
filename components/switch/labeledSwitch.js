import React from "react";
import { View, Text, StyleSheet,Dimensions } from 'react-native';
import SwitchOriginal from "./switchOriginal";

const width = Dimensions.get('window').width;

const LabeledSwitch = ({ 
  title = "Switch",  // Default values
  status = false,         
  labelStyle = {},
  switchViewStyle = {},
  changeSwitch
}) => {
    
  return (
    <View style={[ styles.switchViewStyle, switchViewStyle]}>
        <Text style={[styles.switchLabel, labelStyle]} >{title}</Text>
        <SwitchOriginal 
          status={status} 
          changeSwitch={changeSwitch} 
        />
    </View>
  );
};

const styles = StyleSheet.create({
  switchViewStyle : {
    flex:1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
  },
  switchLabel: {
    flex: 1,
    textAlign: 'left',
    fontSize: width > 500 ? 20 : 15,
    padding: 7,
  },
})

export default LabeledSwitch;