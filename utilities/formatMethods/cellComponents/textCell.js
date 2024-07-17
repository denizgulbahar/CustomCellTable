import { Text,View,ScrollView,Dimensions} from "react-native";
import globalStyles from "../../styles/GlobalStyles";
import { useState,useEffect } from "react";
import { cellTrimmer } from "./cellTrimmer";
const TextCell = ({item}) => {
      const width = Dimensions.get('window').width;
      const generalStyles = globalStyles(width)
      const [value,setValue] = useState(item)
      const[textValue,setText] = useState("")
      const maxLength = 40
      useEffect(() => {
      cellTrimmer({maxLength,value,setText})
     },[value])
      return(
      <View style={generalStyles.cellOutView}>
            <ScrollView horizontal contentContainerStyle={generalStyles.cellWidth}>
                  <View style={[generalStyles.cellView]}>
                        <Text 
                              style={[generalStyles.cellComponent,
                              {fontSize:width>=500 ? 14 : 12}]}
                              >
                              {textValue}
                        </Text>
                  </View>
            </ScrollView>
      </View>
      )
}
  export default TextCell;