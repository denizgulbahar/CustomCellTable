import React, { useState, useEffect } from 'react';
import { Text, View, Dimensions, ScrollView, StyleSheet } from 'react-native';
import EditableCellInput from './childs/editableCellInput';
import { cellTrimmer } from '../cellTrimmer';
import globalStyles from '../../../styles/globalStyles';
import ButtonOriginal from '../../../../button/buttonOriginal';
import { color } from '../../../../../styles/color';

const width = Dimensions.get('window').width;

const EditableCell = ({ data, horizontal, item, keyName, updateFunction }) => {
  const [edit, setEdit] = useState(false);
  const initialValue = item
  const [value, setValue] = useState(initialValue);
  const [textValue, setTextValue] = useState(''); // Trimmed Value
  const [isLoadingUpdate, setIsLoadingUpdate] = useState(false);
  const maxLength = 30;

  const generalStyles = globalStyles(width);

  useEffect(() => {
    cellTrimmer({ maxLength, value, setTextValue });
  }, [value]);

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

  return (
  <View style={generalStyles.cellOutView}>
    {/* 
    Conditional rendering: 
    - Edit mode shows save/cancel buttons and editable input. 
    - View mode shows a scrollable view with a single text component inside a button.
    */}
    {edit ? (
    <>
      <ButtonOriginal 
        title="Kaydet" 
        onPress={handleUpdateValue} 
        buttonStyle= {styles.saveButton}
      />
      <ScrollView contentContainerStyle={generalStyles.cellInputWidth}>
        <EditableCellInput 
          value={value} 
          onChange={(v) => setValue(v)} 
          isLoading={isLoadingUpdate} 
        />
      </ScrollView>
      <ButtonOriginal 
        title="Vazgeç" 
        onPress={cancelEdit} 
        buttonStyle= {styles.cancelButton}
      />
    </>
    ) : (
    <ScrollView 
      horizontal={horizontal} 
      contentContainerStyle={generalStyles.cellWidth}
    >
      <ButtonOriginal
        buttonStyle={{ flex: 1, alignSelf: 'center' }}
        onPress={() => setEdit(true)}
      >
        <View style={generalStyles.cellView}>
          <Text style={generalStyles.cellComponent}>
            {textValue}
          </Text>
        </View>

      </ButtonOriginal>
    </ScrollView>
    )
    }
  </View>
  )
};

const styles = StyleSheet.create({
  saveButton:{
    backgroundColor: color.green,
    alignSelf: 'flex-end',
    width: 50,
    borderWidth: 1,
    padding: 3
  },
  cancelButton: {
    backgroundColor: color.red,
    alignSelf: 'flex-start',
    width: 50,
    borderWidth: 1,
    padding: 3
  }
});
export default EditableCell;
