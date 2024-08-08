import { FlatList, StyleSheet } from 'react-native';
import CellComponent from './cellComponent';

const RowFlatlist = ({ 
  data, 
  columnWidths,
  deleteIndex, 
  setDeleteIndex, 
  listFunction, 
  updateFunction, 
  style, 
  rowIndex 
}) => {

  const renderItem = ({ item, index }) => (
    <CellComponent
      item={item} 
      width={columnWidths[index]}
      rowIndex={rowIndex} 
      style={style}
      deleteIndex={deleteIndex}
      setDeleteIndex={setDeleteIndex}
      listFunction={listFunction} 
      updateFunction={updateFunction}
    />
  );

  return (
    <FlatList
      horizontal
      scrollEnabled={false}
      keyExtractor={(item, index) => `${item}_${index}`}
      contentContainerStyle={styles.container}
      data={data}
      renderItem={renderItem}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%', 
    alignItems: 'center',
  }
})
export default RowFlatlist;
