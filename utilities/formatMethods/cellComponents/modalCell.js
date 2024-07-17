import { Text, View, ScrollView, Dimensions } from "react-native";
import { useState, useEffect } from "react";
import { cellTrimmer } from "./cellTrimmer";
import globalStyles from "../../../styles/globalStyles";

const { width } = Dimensions.get("window")

const ModalCell = ({ item }) => {
     // CustomModalle sarılıp, modal içerikleri eklenecek (Flatlist col'lu).
      const generalStyles = globalStyles(width)
      const [value, setValue] = useState(item)
      const[textValue, setText] = useState("")
      const maxLength = 40

      useEffect(() => {
        cellTrimmer({maxLength, value, setText})
      },[value])
     
      return(
        <View style={generalStyles.cellOutView}>
            <ScrollView horizontal contentContainerStyle={generalStyles.cellWidth}>
                <View style={[generalStyles.cellView]}>
                    <Text style={generalStyles.cellComponent}>
                        {textValue}
                    </Text>
                </View>
            </ScrollView>
        </View>
      )
}
  export default ModalCell;