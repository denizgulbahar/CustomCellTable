import React, { useContext, useEffect, useState } from 'react';
import { Text, View,TouchableOpacity, StyleSheet,Dimensions, ScrollView } from 'react-native';
import { ThemeContext } from '../../contexts/ThemeContext';
import { EditCellButton } from './childs/editCellButton';
import EditableCellInput from './childs/editableCellInput';
import globalStyles from '../../styles/GlobalStyles';
import { cellTrimmer } from './cellTrimmer';

const width = Dimensions.get('window').width;
const EditableScrollCell = ({data, item,keyName, updateFunction}) => {
  // console.log(item)
  const generalStyles = globalStyles(width)
  const color = useContext(ThemeContext)
  const [edit, setEdit] = useState(false);
  const [value,setValue] = useState(item)
  const[textValue,setText] = useState("")
  const cancelValue = item
  const [isLoadingUpdate,setIsLoadingUpdate] = useState(false)
   const closeEdit = () => {
    setEdit(false)
   }
   const cancelEdit = () => {
    setValue(cancelValue)
    closeEdit()
   }
   const handleButtonClick = () => {
    console.log(value)
    if (updateFunction) {
      setIsLoadingUpdate(true);
      updateFunction(data,value,keyName)
        .then(() => {
          setIsLoadingUpdate(false);
          closeEdit()
          // Promise success
          // console.log('Update successful for the item');
        })
        .catch(error => {
         // Promise false
          console.error('Error updating item:', error);
        })
    }
  };
  const handleInputChange = (value) => {
    setValue(value)
   };

   const maxLength = 30
   useEffect(() => {
    cellTrimmer({maxLength,value,setText})
  },[value])
  return (
      <React.Fragment>
        {edit ? 
        (
          <View style={[generalStyles.cellOutView,{height:"auto"}]}>
              <ScrollView contentContainerStyle={generalStyles.cellInputWidth}>
                <EditCellButton label="Kaydet" onPress={() => handleButtonClick()}/>
                      <EditableCellInput 
                        value={value} 
                        onChange={(value) => handleInputChange(value)} 
                        isLoading={isLoadingUpdate} 
                        style="editableScroll" 
                        />
                  <EditCellButton label="Vazgeç" onPress={cancelEdit}/>
              </ScrollView>
          </View>
        ) : 
        (
          <View style={generalStyles.cellOutView}>
             <ScrollView horizontal contentContainerStyle={generalStyles.cellWidth}>
                  <TouchableOpacity 
                    activeOpacity={0.8} 
                    style={{flex:1,alignSelf:"center"}} 
                    onPress={() => setEdit(true)}
                    > 
                      <View style={generalStyles.cellView}>
                          <Text style={[generalStyles.cellComponent,
                            {color: color.textColor,fontSize:width>=500 ? 14 : 12}]}
                            >
                            {textValue}
                          </Text>
                        </View>
                  </TouchableOpacity>
              </ScrollView>
            </View>
        )}
      </React.Fragment>
      )
}


export default EditableScrollCell;