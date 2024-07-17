import { useContext } from 'react';
import { Dimensions,TouchableOpacity,Text,StyleSheet } from 'react-native';
import { ThemeContext } from '../../../contexts/ThemeContext';

const width = Dimensions.get('window').width;
export const EditCellButton = ({label,onPress}) => {
    const color = useContext(ThemeContext)
    let buttonStyle;

    if(label ==="Kaydet") {
      buttonStyle = {
          backgroundColor:color.greenbtnColor,
          alignSelf:"flex-end",
    }
    } else {
      buttonStyle = {
          backgroundColor:color.redbtnColor,
          alignSelf:"flex-start",
      }
    }
    return (
        <TouchableOpacity onPress={onPress} 
          style={[buttonStyle,{width:50,borderWidth:1,padding:0}]}>
            <Text style={styles.littleButtonText}>
              {label}
            </Text>
        </TouchableOpacity>
    )
}
const styles = StyleSheet.create({
    littleButtonText: {
      fontSize:10,
      textAlign: "center",
      padding:2,
    }
  });