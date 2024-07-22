import { View, Text, FlatList, Dimensions, StyleSheet, Alert, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import RowFlatlist from './subComponents/rowFlatlist'
import { TableHeaderComponent } from './subComponents/TableHeaderComponent'
import { handleTransformCard } from './functions/handleTransformCard'
import { handleTransformTable } from './functions/handleTransformTable'
import globalStyles from '../../styles/globalStyles'
import Loading from '../loading/loading'
import ButtonOriginal from '../button/buttonOriginal'

const { width } = Dimensions.get('window');

const TableComponent = (props) => {
  const { data: tableData, isLoadingTable } = props;
  const [deleteIndex, setDeleteIndex] = useState(-1);
  const [selectedIndex, setSelectedIndex] = useState(-2);
  const [tableAllData, setTableAllData] = useState([]);

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
      rowIndex={index} 
      deleteIndex={deleteIndex}
      setDeleteIndex={setDeleteIndex}
    />
  );

  const renderItemSmall = ({ item, index }) => {
    const keys = Object.keys(item);
    const values = Object.values(item);

    return (
      <View style={styles.renderItemPhone}>
        {keys.map((key, innerIndex) => (
          index === selectedIndex ? (
            <Loading key={innerIndex} message="Veri siliniyor..." />
          ) : (
            <View key={innerIndex} style={{ flexDirection: "row" }}>
              <Text style={styles.textKey}>{key}:</Text>
              <ButtonOriginal 
                onPress={() => handleDeleteFunction(values[innerIndex].props, innerIndex)} 
                title={values[innerIndex]} 
              />
            </View>
          )
        ))}
      </View>
    );
  };

  // Render for large screens - Tablets && PCs
  const renderLargeScreen = () => (
    <ScrollView horizontal style={{ flex: 1, flexDirection: "row" }}>
      <FlatList
        data={tableAllData}
        renderItem={renderItemLarge}
        style={styles.tableViewStyle}
        ListHeaderComponent={<TableHeaderComponent data={tableData} />}
        ListFooterComponent={isLoadingTable && <Loading message="Tablo Yükleniyor, lütfen bekleyin..." />}
      />
    </ScrollView>
  );

  // Render for small screens - Phones
  const renderSmallScreen = () => (
    <View style={styles.cardViewStyle}>
      <FlatList
        style={{ flexDirection: row }}
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
    ...globalStyles(width).mediumShadowStyle,
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
    flex: 1,
    ...globalStyles(width).mediumShadowStyle,
    borderRadius: 20,
  }
})
export default TableComponent;