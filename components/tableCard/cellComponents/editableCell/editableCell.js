import React, { useState } from 'react';
import { View, Dimensions, StyleSheet } from 'react-native';
import EditableCellInput from './childs/editableCellInput';
import { cellTrimmer } from '../cellTrimmer';
import globalStyles from '../../../../styles/globalStyles';
import ButtonOriginal from '../../../button/buttonOriginal';
import { color } from '../../../../styles/color';

const width = Dimensions.get('window').width;

const EditableCell = ({ data, horizontal, item, keyName, updateFunction }) => {
  const [edit, setEdit] = useState(false);
  const initialValue = item
  const [value, setValue] = useState(initialValue);
  const [textValue, setTextValue] = useState(initialValue); // Trimmed Value
  const [isLoadingUpdate, setIsLoadingUpdate] = useState(false);
  const maxLength = 30;

  const generalStyles = globalStyles(width);

  // useEffect(() => {
  //   cellTrimmer({ maxLength, value, setTextValue });
  // }, [value]);

  const handleUpdateValue = async () => {
    setIsLoadingUpdate(true);
    try {
      if (updateFunction) {
        await updateFunction(data, value, keyName);
        console.log('Update successful for the item');
      }
    } catch (error) {
      console.error('Error updating item:', error);
    } finally {
      setIsLoadingUpdate(false);
      setEdit(false)
    }
  };

  const cancelEdit = () => {
    setValue(initialValue); // Dont save changing value and return initial value
    setEdit(false);
  };

  const commonStyles = {
    width: 50,
    height: width >= 500 ? 50 : 30,
    borderRadius: width >= 500 ? "auto" : 8,
    borderWidth: 1,
    padding: 3
  }
  return (
  <View style={generalStyles.cellOutView}>
    {/* 
    Conditional rendering: 
    - Edit mode shows save/cancel buttons and editable input. 
    - View mode shows a scrollable view with a single text component inside a button.
    */}
    {edit ? (
    <View style={{ flex: 1 }} pointerEvents="box-none">
      <ButtonOriginal 
        title="Kaydet" 
        onPress={handleUpdateValue} 
        buttonStyle= {[styles.saveButton, commonStyles]}
        textStyle={{ fontSize: width >= 500 ? 16 : 12 }}
      />
      <EditableCellInput 
        value={value} 
        onChange={(v) => setValue(v)} 
        isLoading={isLoadingUpdate} 
      />
      <ButtonOriginal 
        title="Vazgeç" 
        onPress={cancelEdit} 
        buttonStyle= {[styles.cancelButton, commonStyles]}
        textStyle={{ fontSize: width >= 500 ? 16 : 12 }}
      />
    </View>
    ) : (
      <ButtonOriginal
        buttonStyle={{ flex: 1, backgroundColor: "transparent" }}
        onPress={() => setEdit(true)}
        title={textValue}
        textStyle={generalStyles.cellComponent}
      />
    )
    }
  </View>
  )
};

const styles = StyleSheet.create({
  saveButton:{
    backgroundColor: color.green,
    alignSelf: 'flex-end',
  },
  cancelButton: {
    backgroundColor: color.red,
    alignSelf: 'flex-start',
  }
});
export default EditableCell;
