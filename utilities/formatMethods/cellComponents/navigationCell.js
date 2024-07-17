import { TouchableOpacity, Text, ScrollView, View, Dimensions } from "react-native";
import globalStyles from '../../styles/GlobalStyles';
import { useNavigation } from "@react-navigation/native";
import { useState,useEffect } from "react";
import { cellTrimmer } from "./cellTrimmer";
const NavigationCell = ({data,routeName,screen, style}) => {
    const navigation = useNavigation()
    const width = Dimensions.get('window').width;
    const generalStyles = globalStyles(width)
    const[textValue,setText] = useState("")
    const [value,setValue] = useState(data._id)
    function userNavigate() {
        console.log("navigate edildi.")
        navigation.navigate(routeName, {
            screen: screen,
        });
    }
    function deviceNavigate() {
        navigation.navigate(routeName,{ data })
    }
    const maxLength = 20
    useEffect(() => {
    cellTrimmer({maxLength,value,setText})
   },[value])
   
    return(
        <ScrollView horizontal contentContainerStyle={generalStyles.cellWidth}>
        <TouchableOpacity 
            style={generalStyles.cellOutView} 
            onPress={style==="User" ? userNavigate : deviceNavigate}
            >
                <View style={generalStyles.cellView}>
                    <Text style={[generalStyles.cellComponent,
                        {fontSize:width>=500 ? 14 : 12}]}
                        >
                        {textValue}
                    </Text>
                </View>
        </TouchableOpacity>
        </ScrollView>
       
    )
}
  export default NavigationCell;