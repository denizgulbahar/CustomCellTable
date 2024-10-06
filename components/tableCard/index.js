import { View, Text, FlatList, Dimensions, StyleSheet, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import RowFlatlist from './table/subComponents/rowFlatlist'
import { TableHeaderComponent } from './table/subComponents/TableHeaderComponent'
import { handleTransformCard } from './card/handleTransformCard'
import { handleTransformTable } from './table/handleTransformTable'
import globalStyles from '../../styles/globalStyles'
import Loading from '../loading/loading'
import { calculateMaxWidths } from '../../utilities/tableCard/calculateMaxWidths'
import { dataSource } from '../../data/dataSource'
import CellComponent from './table/subComponents/cellComponent'

const { width } = Dimensions.get('window');

const ResponsiveTableCard = (props) => {
  const { data: tableData, isLoadingTable } = props;
  const [deleteIndex, setDeleteIndex] = useState(-1);
  const [selectedIndex, setSelectedIndex] = useState(-2);
  const [tableAllData, setTableAllData] = useState([]);
  
  // Calculate Max Column Width Properties
  // Burada, datasource çiftkatlı array yapılıp fonksiyonda props.array yerine geçecek.
  const [columnWidths, setColumnWidths] = useState([]);
  useEffect(() => {
    const widths = calculateMaxWidths(dataSource);
    setColumnWidths(widths);
  }, [tableData]);

  // Data Transformation Depend on Screen Size
  useEffect(() => {
    const transformedData = width >= 500 ? handleTransformTable(tableData) : handleTransformCard(tableData);
    setTableAllData(transformedData);
  }, [tableData]);

  const handleCellFunction = async (cellItem) => {
    try {
      await cellItem.onPress();
    } catch (e) {
      Alert.alert("Veri silinemedi.");
    } finally {
      setDeleteIndex(-1);
      setSelectedIndex(-2);
    }
  };

  const handleDeleteFunction = (cellItem, innerIndex) => {
    if (cellItem.onPress) {
      setSelectedIndex(innerIndex);
      setDeleteIndex(innerIndex);
      handleCellFunction(cellItem);
    }
  };
  // Render Items for Flatlists
  const renderItemLarge = ({ item, index }) => (
    <RowFlatlist 
      key={`${item.id}_${index}`}
      data={item} 
      columnWidths={columnWidths} 
      rowIndex={index} 
      deleteIndex={deleteIndex}
      setDeleteIndex={setDeleteIndex}
    />
  );

  const renderItemSmall = ({ item, index }) => {
    const keys = Object.keys(item);
    const values = Object.values(item);
    console.log("value", values[0])
    return (
      <View style={styles.renderItemPhone}>
        {keys.map((key, innerIndex) => (
          index === selectedIndex ? (
            <Loading key={innerIndex} message="Veri siliniyor..." />
          ) : (
            <View key={innerIndex} style={{ flex:1, flexDirection: "row", padding: 8, alignItems:"center" }}>
              <Text style={styles.textKey}>{key}:</Text>
              <CellComponent
                width={width/2}
                item={values[innerIndex]} 
                setDeleteIndex={setDeleteIndex}
                rowIndex={1} 
                deleteIndex={2}
              />
            </View>
          )
        ))}
      </View>
    );
  };

  // Render for large screens - Tablets && PCs
  const renderLargeScreen = () => (
    <FlatList
      data={tableAllData}
      renderItem={renderItemLarge}
      contentContainerStyle={styles.tableViewStyle}
      ListHeaderComponent={<TableHeaderComponent data={tableData} />}
      ListFooterComponent={isLoadingTable && <Loading message="Tablo Yükleniyor, lütfen bekleyin..." />}
    />
  );

  // Render for small screens - Phones
  const renderSmallScreen = () => (
    <View style={styles.cardViewStyle}>
      <FlatList
        style={{ flex: 1, flexDirection: "row" }}
        data={tableAllData}
        renderItem={renderItemSmall}
      />
    </View>
  );

  return width >= 500 ? renderLargeScreen() : renderSmallScreen();
};

const styles = StyleSheet.create({
  textKey: {
    flex: 1,
    marginVertical: "auto",
    fontWeight: "bold",
    fontSize: 12,
    textAlign: "left",
    padding: 8,
  },
  renderItemPhone: {
    borderWidth: 0.5,
    flex: 1,
    borderRadius: 30,
    marginVertical: 6,
    paddingHorizontal: 10 
  },
  cardViewStyle: { 
    flex: 1, 
    flexDirection: "row", 
    paddingVertical: 10 
  },
  tableViewStyle: {
    margin: 0,
    flexGrow: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    ...globalStyles(width).mediumShadowStyle,
  }
})
export default ResponsiveTableCard;