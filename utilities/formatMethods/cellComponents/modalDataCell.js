import React ,{ useState,useEffect, useContext } from "react";
import ObjectFlatlist from "../flatlists/ObjectFlatlist";
import { View, Dimensions, Text, StyleSheet, TouchableOpacity, ScrollView } from "react-native";
import globalStyles from "../../styles/GlobalStyles";
import AddModal from "../modals/addModal"
import { ThemeContext } from "../../contexts/ThemeContext";
import { getAllKeys } from "../../utilities/objectMethods/objToArray/getAllKeys";
import { getAllValues } from "../../utilities/objectMethods/objToArray/getAllValues";
import { cellTrimmer } from "./cellTrimmer";

const width = Dimensions.get('window').width;
const generalStyles = globalStyles(width)
const ModalDataCell = ({data,item}) => {
    const [isModalVisible, setModalVisible] = useState(false);
    const color = useContext(ThemeContext)
    const [value,setValue] = useState(item)
    const[textValue,setText] = useState("")
    const [userPermData, setUserPermData] = useState(data);
    const keys = getAllKeys(data.readout)
    const values = getAllValues(data.readout)
    const maxLength = 40
   useEffect(() => {
    cellTrimmer({maxLength,value,setText})
  },[value])
    return (
        <View style={generalStyles.cellWidth}>
            <View style={generalStyles.cellOutView}>
             <ScrollView horizontal contentContainerStyle={generalStyles.cellWidth}>
                  <TouchableOpacity 
                    activeOpacity={0.8} 
                    style={{flex:1,alignSelf:"center"}} 
                    onPress={() => setModalVisible(true)}
                    > 
                      <View style={generalStyles.cellView}>
                          <Text style={[generalStyles.cellComponent,
                            {color: color.textColor,fontSize:width>=500 ? 14 : 12}]}
                            >
                            {textValue}
                          </Text>
                        </View>
                  </TouchableOpacity>
              </ScrollView>
            </View>
            <AddModal isModalVisible={isModalVisible} setModalVisible={setModalVisible}>
                <Text style={[generalStyles.centeredMidText,{marginTop:20,fontWeight:"bold"}]}>Cihaz Okuma Sonuçları</Text>
                <View style={[styles.container,{backgroundColor:color.whiteColor}]}>
                        <ObjectFlatlist style="modalCell" data={keys} />
                        <ObjectFlatlist style="modalCell" data={values} />
                </View>
            </AddModal>
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        flexDirection:"row",
      ...globalStyles(width).shadowRadiusStyle,
      marginTop:20,
      padding:6,
      borderRadius:20, 
      alignSelf:"center",
      width:width>=500 ? width/2 : width
    }
  })
export default ModalDataCell