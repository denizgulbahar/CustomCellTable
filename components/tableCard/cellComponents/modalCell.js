import { FlatList, View, ScrollView, Dimensions } from "react-native";
import globalStyles from "../../../styles/globalStyles";
import CustomModal from "../../../components/modal/customModal";

const { width } = Dimensions.get("window")

const ModalCell = ({ item }) => {
      const generalStyles = globalStyles(width)
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