import {inputDataWithButton} from "../../utilities/formatMethods/insideFormats/inputDataWithButton"
import { objectTransformer } from "../../utilities/formatMethods/insideFormats/objectTransformer";
import { color } from "../../styles/color";
import { Ionicons } from "@expo/vector-icons";
import SwitchOriginal from "../../components/switch/switchOriginal";
import ModalCell from "../../components/tableCard/cellComponents/modalCell";
import { IconButton } from "react-native-paper";
import TextCell from "../../components/tableCard/cellComponents/textCell";

async function formatDevice(inputData, updateFunction, deleteFunction) {
    // İşlem sırası düzeltilince yapılacak.
    const data = await inputData
    const outputData =  await inputDataWithButton(data)
    // First loop - Row Data
    inputData.forEach((item, index) => {
       // Second loop - Cell Data
      for(let key in outputData.data) {
        let transformedItem = objectTransformer(item[key])
        if (key === "Sil") {
          let previousButtonCells = outputData.data[key]["cells"];
          const closeButton = (
             <IconButton
              icon={() => <Ionicons name='close-circle' size={60} color={color.red} />}
              style= {{ width: 100, height: 100 }}
              onPress={() => deleteFunction(item)}
            />
          )
          outputData.data[key]["cells"] = [...previousButtonCells, closeButton];
        } 
        // else if (key === "status") {
        //   const previousCells = outputData.data[key].cells;
        //   const switchCell = (
        //     <SwitchOriginal
        //       status={item.status} 
        //       changeSwitch={() => changeSwitch(index)} 
        //     />
        //   )
        //   outputData.data[key].cells = [...previousCells, switchCell];
        // } 
        // else if (key === "creationDate") {
        //     let previousButtonCells = outputData.data[key]["cells"];
            
        //     const modalCell = <ModalCell item={item} index={index} />
        //     outputData.data[key]["cells"] = [...previousButtonCells, modalCell];
        // } 
        else {
          const previousCells = outputData.data[key].cells;
          const textCell = <TextCell item={item} />
          outputData.data[key].cells = [...previousCells, textCell];
        }
      }
    });
    
    return outputData;
  }
  export default formatDevice;