import { FlatList, Dimensions } from 'react-native';
import CellComponent from './cellComponent';

const width = Dimensions.get('window').width;
const RowFlatlist = ({ data, deleteIndex, setDeleteIndex, 
  listFunction,updateFunction,style, rowIndex, colCount }) => {

  const renderItem = ({ item, index }) => (
    <CellComponent
      deleteIndex={deleteIndex}
      setDeleteIndex={setDeleteIndex}
      item={item} 
      rowIndex={rowIndex} 
      style={style}
      colCount={colCount}
      listFunction={listFunction} 
      updateFunction={updateFunction}
      />
  )
  let maxCount;
  if(width>=1800) {
    maxCount = 6
  } else if(width>=1250) {
    maxCount = 5
  } else if(width>=768) {
    maxCount =  3.5
  } else {
    maxCount = 0
  }
  // console.log(data)
  return (
      <FlatList
        horizontal={true}
        style={{ width:"100%" }}
        contentContainerStyle={{ width:"100%" }}
        data={data}
        renderItem={renderItem}
      />
  )
}

export default RowFlatlist;
