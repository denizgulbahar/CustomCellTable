import { FlatList, View, Dimensions, StyleSheet } from "react-native";
import CustomModal from "../../../components/modal/customModal";

const ModalCell = ({ item }) => {
  // ModalData, gelen dataya göre dönüştürülecek.
  return(
    <View style={styles.cellOutView}>
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
const styles = StyleSheet.create({
  cellOutView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: "center",
  },
})
  export default ModalCell;