import { FlatList, View, ScrollView, Dimensions } from "react-native";
import { useEffect } from "react";
import { cellTrimmer } from "./cellTrimmer";
import globalStyles from "../../../styles/globalStyles";
import CustomModal from "../../../modal/customModal";

const { width } = Dimensions.get("window")

const ModalCell = ({ item }) => {
      const generalStyles = globalStyles(width)

      useEffect(() => {
        cellTrimmer({maxLength, item, setText})
      },[item])
     // ModalData, gelen dataya göre dönüştürülecek.
      return(
        <View style={generalStyles.cellOutView}>
            <ScrollView horizontal contentContainerStyle={generalStyles.cellWidth}>
              <View style={[generalStyles.cellView]}>
                <CustomModal>
                  <FlatList
                    data={modalData}
                    keyExtractor={(item, index) => `${item}_${index}`}
                    renderItem={HeaderItem}
                  />
                </CustomModal>
              </View>
            </ScrollView>
        </View>
      )
}
  export default ModalCell;