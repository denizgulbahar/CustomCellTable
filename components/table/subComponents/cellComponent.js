import React, { useContext, useEffect, useState } from 'react';
import { Text, View, StyleSheet,Dimensions,TouchableOpacity, Alert } from 'react-native';
import { ThemeContext } from '../../contexts/ThemeContext';
import CustomLoading from '../customComponents/customLoading';

const width = Dimensions.get("window").width

const CellComponent = (props) => {
  const color = useContext(ThemeContext)
  let cellClasses = "";
  if (props.rowIndex % 2 === 0) {
    cellClasses = styles.odd;

  } else {
    cellClasses = styles.even;
  }
 
  async function handleCellFunction () {
    const cellItem = props.item.props
    try{
      await cellItem.onPress()
    } catch(e){
      Alert.alert("Veri silinemedi.")
    } finally {
      props.setDeleteIndex(-1) 
    }
  }
  async function handleDeleteFunction() {
    const condition = props.item.type.name === "DeleteButton" ? true : false
    // console.log("cond:",condition)
    if(condition) {
      props.setDeleteIndex(props.rowIndex) 
      handleCellFunction()
    } 
  }
  // Width belirleme fonksiyonu En dıştaki View'de
  const maxColCount = width>=1000 ? 6 : 4
  const loadingStyle = {
    viewWidth:globalStyles(width).cellInputWidth.width+10,
    indicatorSize:width>=768 ? 40 : 20,
    messageFontSize:width>=768 ? 16 : 14
  }
  return (
    <View style={[styles.container,cellClasses,
      {height:props.style==="singleDevice" || props.style==="modalCell" ? 50 : 85, width:props.colCount>=maxColCount ? "auto" : (width-305)/props.colCount}]}
      >
      <TouchableOpacity onPress={handleDeleteFunction}>
      {(props.deleteIndex === props.rowIndex) ? 
        <CustomLoading style={loadingStyle} message="Veri siliniyor..."/> :
        <Text style={[styles.buttonTextFilter, props.style==="modalCell" && globalStyles(width).centeredMidText ]}>
          {props.item}
        </Text>
      }
      </TouchableOpacity>
    </View>
  )
};

const styles = StyleSheet.create({
  container: {
    margin:0,
    padding:0,
    justifyContent:"center",
  },
  even: {
    backgroundColor: '#eee'
  },
  odd: {
    backgroundColor: '#fff'
  },
  buttonTextFilter: {
    fontSize:width>=500 ? 14 : 12,
    fontWeight:"550",
    textAlign: "center",
    justifyContent:"center",
    alignItems: "center",
    padding:5,
  },
});

export default CellComponent;

