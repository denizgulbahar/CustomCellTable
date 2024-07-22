import { FlatList } from 'react-native';
import CellComponent from './cellComponent';

const RowFlatlist = ({ 
  data, 
  deleteIndex, 
  setDeleteIndex, 
  listFunction, 
  updateFunction, 
  style, 
  rowIndex 
}) => {

  const renderItem = ({ item }) => (
    <CellComponent
      deleteIndex={deleteIndex}
      setDeleteIndex={setDeleteIndex}
      item={item} 
      rowIndex={rowIndex} 
      style={style}
      listFunction={listFunction} 
      updateFunction={updateFunction}
    />
  );

  return (
    <FlatList
      horizontal
      keyExtractor={(item, index) => `${item}_${index}`}
      style={{ flex: 1 }}
      contentContainerStyle={{ flex: 1 }}
      data={data}
      renderItem={renderItem}
    />
  );
};

export default RowFlatlist;
