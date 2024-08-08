import React from 'react';
import { Text, View, StyleSheet, Dimensions, Alert } from 'react-native';
import { color } from '../../../../styles/color';
import globalStyles from '../../../../styles/globalStyles';
import ButtonOriginal from '../../../button/buttonOriginal';
import Loading from '../../../loading/loading';

const width = Dimensions.get("window").width;

const CellComponent = (props) => {
  // Determine if the row index is even or odd to apply different styling
  const isEvenRow = props.rowIndex % 2 === 0;
  const cellClasses = isEvenRow ? styles.even : styles.odd;

  const handleCellFunction = async () => {
    const cellItem = props.item.props;
    try {
      await cellItem.onPress();
    } catch (e) {
      Alert.alert("Veri silinemedi.");
    } finally {
      props.setDeleteIndex(-1);
    }
  };

  const handleDeleteFunction = () => {
    const isDeleteButton = props.item.type.name === "DeleteButton";
    if (isDeleteButton) {
      props.setDeleteIndex(props.rowIndex);
      handleCellFunction();
    }
  };

  return (
    <View style={[styles.container, cellClasses, { width: props.width }]}>
      {/* ButtonOriginal component handling delete action */}
      <ButtonOriginal buttonStyle={{ flex: 1, justifyContent: "center", padding: 0 }} onPress={handleDeleteFunction}>
        {/* Conditionally render Loading component or Text component */}
        {props.deleteIndex === props.rowIndex ? (
          <Loading
            containerStyle={globalStyles(width).getCellWidth + 10}
            message="Veri siliniyor..."
            loadingSize={width >= 768 ? 40 : 20}
            textStyle={{ fontSize: width >= 768 ? 15 : 12 }}
          />
        ) : (
          <Text style={{ width: props.width }}>{props.item} </Text>
        )}
      </ButtonOriginal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    height: 100,
    margin: 0,
  },
  even: {
    backgroundColor: color.white,
  },
  odd: {
    backgroundColor: color.odd,
  },
});

export default CellComponent;


