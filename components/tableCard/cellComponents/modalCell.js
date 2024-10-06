import { FlatList, View, ScrollView, Dimensions } from "react-native";
import globalStyles from "../../../styles/globalStyles";
import CustomModal from "../../../components/modal/customModal";

const { width } = Dimensions.get("window")

const ModalCell = ({ item }) => {
  const generalStyles = globalStyles(width)
  // ModalData, gelen dataya göre dönüştürülecek.
  return(
    <View style={generalStyles.cellOutView}>
      <CustomModal>
        <FlatList
          data={modalData}
          keyExtractor={(item, index) => `${item}_${index}`}
          renderItem={HeaderItem}
        />
      </CustomModal>
    </View>
  )
}
  export default ModalCell;