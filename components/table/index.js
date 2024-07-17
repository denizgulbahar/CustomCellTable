import { View, Text, FlatList, Dimensions, StyleSheet, Alert, TouchableOpacity, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import RowFlatlist from './subComponents/rowFlatlist'
import FullScreenLoading from '../loading/FullScreenLoading'
import { TableHeaderComponent } from './subComponents/TableHeaderComponent'
import { handleTransformCard } from './functions/handleTransformCard'
import { handleTransformTable } from './functions/handleTransformTable'

const { width } = Dimensions.get('window');

const  TableComponent = (props) => {
  const tableData = props.data
  const handleLoadMore = props.handleLoadMore
  const [deleteIndex,setDeleteIndex] = useState(-1)
  const [selectedIndex,setSelectedIndex] = useState(-2)
  const[colCount,setColCount] = useState(0)
  // Header Style için buna sonra bakılacak.
  const [tableAllData, setTableAllData] = useState([])

  const renderItemPC = ({ item, index }) => (
    <RowFlatlist 
      key={index} 
      data={item} 
      rowIndex={index} 
      deleteIndex={deleteIndex}
      setDeleteIndex={setDeleteIndex}
      isDrawerSmall={props.isDrawerSmall} 
      colCount={colCount}
    />
  )
  let containerWidth = width-80

  const renderItemPhone = ({ item, index }) => {
    // Combine two arrays
    const keys = Object.keys(item)
    const values = Object.values(item)
    // let cellItem = value.props
    async function handleCellFunction (cellItem) {
      try{
        await cellItem.onPress()
      } catch(e){
        Alert.alert("Veri silinemedi.")
      } finally {
        setDeleteIndex(-1) 
        setSelectedIndex(-2)
      }
    }
    function handleDeleteFunction(innerIndex) {
      if(values[innerIndex].props.onPress) {
        setSelectedIndex(index)
        setDeleteIndex(innerIndex) 
        console.log("xd",values[innerIndex].props)
        handleCellFunction(values[innerIndex].props)
      }
    }
  return (
      <View 
        key={index} 
        style={[
          globalStyles(width).shadowDrawerStyle,{borderWidth:0.5,
          width:containerWidth,marginVertical:6,paddingHorizontal:10 }
        ]}
      >
        {keys.map((key,innerIndex) =>  {
          return(
            index === selectedIndex) ? 
            <FullScreenLoading kind="cell" message="Veri siliniyor..."/> :
            <View key={innerIndex} style={{flexDirection:"row"}}>
                <Text style={[styles.textKey,{width:containerWidth/2}]}>{key}:</Text>
                <TouchableOpacity  onPress={() => handleDeleteFunction(innerIndex)}>
                  <Text 
                    style={{ width:"100%", justifyContent: "center", alignItems: "center", textAlign: "center", padding: 8 }}
                  >
                    {values[innerIndex]}
                  </Text>
                </TouchableOpacity>
            </View> 
          }
        )}
      </View>
    )
  }
  
  let cardViewStyle = { flex: 1, flexDirection: "row", paddingVertical: 10 }
  // UseEffect
  function handleTableData() {
    let transformedData = width>=500 ? handleTransformTable(tableData) : handleTransformCard(tableData)
    setTableAllData(transformedData)
  }

  useEffect(() => {
    handleTableData()
    setColCount(Object.keys(tableData.data).length)
     return () => setColCount(0)
  }, [tableData])

  return width>=500 ? (
      <ScrollView horizontal style={{ flex: 1, flexDirection: "row", width: "100%" }}>
        <FlatList
          style={[
            styles.tableViewStyle,{margin: props.kind==="Reading" ? 10 : 0}
          ]}
          ListHeaderComponent={<TableHeaderComponent data={tableData} colCount={colCount} />}
          ListFooterComponent={props.isLoadingTable ?
          <FullScreenLoading message="Tablo Yükleniyor, lütfen bekleyin..."/> :
          null
          }
          contentContainerStyle={{flex:1}}
          data={tableAllData}
          renderItem={renderItemPC}
          onEndReached={ props.kind==="Reading" ? () => handleLoadMore() : null}
          onEndReachedThreshold={0.1}
          />    
      </ScrollView> 
      ): (
      <View style={cardViewStyle}>
        <FlatList
          data={tableAllData}
          renderItem={renderItemPhone}
        />
      </View>
      )
}
const styles = StyleSheet.create({
  textKey: {
    marginVertical: "auto",
    fontWeight: "bold",
    fontSize: 12,
    textAlign: "left",
    padding: 8,
  },
  tableViewStyle: {
    marginVertical: 5,
    width: "100%",
    ...globalStyles(width).shadowDrawerStyle,
    borderRadius: 20,
  }
})
export default TableComponent;