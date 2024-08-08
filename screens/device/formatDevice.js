import {inputDataWithButton} from "../../utilities/formatMethods/insideFormats/inputDataWithButton"
import { objectTransformer } from "../../utilities/formatMethods/insideFormats/objectTransformer";
import ButtonOriginal from "../../components/button/buttonOriginal";
import { color } from "../../styles/color";
import { Ionicons } from "@expo/vector-icons";
import SwitchOriginal from "../../components/switch/switchOriginal";
import ModalCell from "../../components/tableCard/cellComponents/modalCell";
import EditableCell from "../../components/tableCard/cellComponents/editableCell/editableCell";

async function formatDevice(inputData, updateFunction, deleteFunction) {
    // İşlem sırası düzeltilince yapılacak.
    const data = await inputData
    const outputData =  await inputDataWithButton(data)
    // First loop - Row Data
    inputData.forEach((item, index) => {
       // Second loop - Cell Data
      for(let key in outputData.data) {
        let transformedItem = objectTransformer(item[key])
       if(key === "accessInfo") {
          // Buradaki componentin, normal editableCell'den tek farkı, üstüne tıklandığında aşağı doğru scroll edecek.
          let previousScrollCells = outputData.data["accessInfo"]["cells"];
          const editableScrollCell = (
            <EditableCell
              data={item}
              item={transformedItem} 
              keyName={key} 
              updateFunction={updateFunction} 
            />
          )
          outputData.data["accessInfo"]["cells"] = [...previousScrollCells, editableScrollCell]
        }
        else if (key === "Sil") {
          let previousButtonCells = outputData.data["Sil"]["cells"];
          const closeButton = (
            <ButtonOriginal
              onPress={() => deleteFunction(item)} 
            >
              <Ionicons name='close-circle' size={50} color={color.red} />
            </ButtonOriginal>
          )
          outputData.data["Sil"]["cells"] = [...previousButtonCells, closeButton];
        } 
        else if (key === "Status") {
          const previousCells = outputData.data[field].cells;
          const switchCell = (
            <SwitchOriginal
              status={item.status} 
              changeSwitch={() => changeSwitch(index)} 
            />
          )
          outputData.data[field].cells = [...previousCells, switchCell];
        } 
        else if (key === "Modal") {
            let previousButtonCells = outputData.data["Modal"]["cells"];
            
            const modalCell = <ModalCell item={item} index={index} />
            outputData.data["Modal"]["cells"] = [...previousButtonCells, modalCell];
        } 
        else {
          const previousCells = outputData.data[key].cells;
          const editableCell = (
            <EditableCell 
              data={item} 
              horizontal
              item={transformedItem} 
              keyName={key} 
              updateFunction={updateFunction} 
            />
          )
          outputData.data[key].cells = [...previousCells, editableCell];
        }
      }
    });
    
    return outputData;
  }
  export default formatDevice;