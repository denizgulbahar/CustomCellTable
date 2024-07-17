import React, { useContext, useState, useEffect } from 'react';
import { Text, View,TouchableOpacity, StyleSheet,Dimensions,ScrollView } from 'react-native';
import { ThemeContext } from '../../contexts/ThemeContext';
import EditableCellInput from './childs/editableCellInput';
import { EditCellButton } from './childs/editCellButton';
import globalStyles from '../../styles/GlobalStyles';
import { cellTrimmer } from './cellTrimmer';

const width = Dimensions.get('window').width;
const EditableCell = ({data,item, keyName,updateFunction, style}) => {
  const color = useContext(ThemeContext)
  const [edit, setEdit] = useState(false);
  const [value,setValue] = useState(item)
  const[textValue,setText] = useState("")
  const cancelValue = item
  const [isLoadingUpdate,setIsLoadingUpdate] = useState(false)
  const generalStyles = globalStyles(width)
  
  const handleButtonClick = () => {
    setIsLoadingUpdate(true);
    if (updateFunction) {
      updateFunction(data,value,keyName)
        .then(() => {
          // Promise success
          console.log('Update successful for the item');
        })
        .catch(error => {
         // Promise false
          console.error('Error updating item:', error);
        })
        .finally(() => {
          setIsLoadingUpdate(false);
          closeEdit()
        });
    }
  };
  
  const handleInputChange = (value) => {
    setValue(value)
   };
   const closeEdit = () => {
    setEdit(false)
   }
   const cancelEdit = () => {
    setValue(cancelValue)
    closeEdit()
   }
   const maxLength = 30
   useEffect(() => {
    cellTrimmer({maxLength,value,setText})
  },[value])
  return (
    <React.Fragment>
        {edit ? 
        ( 
        <View style={generalStyles.cellOutView}>
            <View style={{flex:1}}>
            <ScrollView contentContainerStyle={generalStyles.cellInputWidth}>
                <EditCellButton label="Kaydet" onPress={() => handleButtonClick()}/>
                    <EditableCellInput 
                      value={value} 
                      onChange={(value) => handleInputChange(value)} 
                      isLoading={isLoadingUpdate} 
                      />
                </ScrollView>
                <EditCellButton label="Vazgeç" onPress={cancelEdit}/>
            </View>
        </View>
        ) : 
        ( 
        <View style={[generalStyles.cellOutView]}>
           <ScrollView horizontal contentContainerStyle={generalStyles.cellWidth}>
            <TouchableOpacity 
                  activeOpacity={0.8} 
                  style={{flex:1,alignSelf:"center"}} 
                  onPress={() => setEdit(true)}
                  >
                    <View style={generalStyles.cellView}>
                      <Text 
                      style={[generalStyles.cellComponent,
                        { color: color.textColor,
                        fontSize:width>=500 ? 14 : 12}]}
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

export default EditableCell;