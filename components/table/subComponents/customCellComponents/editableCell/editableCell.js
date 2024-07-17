import React, { useContext, useState, useEffect } from 'react';
import { Text, View, TouchableOpacity, StyleSheet, Dimensions, ScrollView } from 'react-native';
import { ThemeContext } from '../../contexts/ThemeContext';
import EditableCellInput from './childs/editableCellInput';
import { EditCellButton } from './childs/editCellButton';
import { cellTrimmer } from '../cellTrimmer';
import globalStyles from '../../../styles/globalStyles';

const width = Dimensions.get('window').width;

const EditableCell = ({ data, horizontal, item, keyName, updateFunction }) => {
  const [edit, setEdit] = useState(false);
  const [value, setValue] = useState(item);
  const [textValue, setTextValue] = useState('');
  const [isLoadingUpdate, setIsLoadingUpdate] = useState(false);
  const maxLength = 30;
  const cancelValue = item;

  const generalStyles = globalStyles(width);

  useEffect(() => {
    cellTrimmer({ maxLength, value, setTextValue });
  }, [value]);

  const handleButtonClick = async () => {
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
      closeEdit();
    }
  };

  const handleInputChange = (newValue) => {
    setValue(newValue);
  };

  const closeEdit = () => {
    setEdit(false);
  };

  const cancelEdit = () => {
    setValue(cancelValue);
    closeEdit();
  };

  return edit ? (
        <View style={generalStyles.cellOutView}>
          <ScrollView contentContainerStyle={generalStyles.cellInputWidth}>
            <EditCellButton label="Kaydet" onPress={handleButtonClick} />
            <EditableCellInput value={value} onChange={handleInputChange} isLoading={isLoadingUpdate} />
            <EditCellButton label="Vazgeç" onPress={cancelEdit} />
          </ScrollView>
        </View>
      ) : (
        <View style={generalStyles.cellOutView}>
          <ScrollView horizontal={horizontal} contentContainerStyle={generalStyles.cellWidth}>
            <TouchableOpacity
              activeOpacity={0.8}
              style={{ flex: 1, alignSelf: 'center' }}
              onPress={() => setEdit(true)}
            >
              <View style={generalStyles.cellView}>
                <Text style={generalStyles.cellComponent}>
                  {textValue}
                </Text>
              </View>
            </TouchableOpacity>
          </ScrollView>
        </View>
      )
};

export default EditableCell;
