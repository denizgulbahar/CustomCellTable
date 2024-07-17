import EditableCell from "../../components/cellComponents/editableCell"
import TextCell from "../../components/cellComponents/textCell"
import {inputDataWithButton} from "./insideFormats/inputDataWithButton"
import DeleteButton from "../../components/buttons/deleteButton"
import { objectTransformer } from "./insideFormats/objectTransformer";
async function formatList(inputData,updateFunction, deleteFunction) {
    // Making data format
    const data = await inputData
    const outputData =  await inputDataWithButton(data)
    // InputData component configurations
    inputData.forEach((item, index) => {
      for (let key in outputData.data) {
        let transformedItem = objectTransformer(item[key])
        if(key==="Sil") {
          let previousButtonCells = outputData.data["Sil"]["cells"];
          outputData.data["Sil"]["cells"] = [...previousButtonCells, <DeleteButton item={item}
          onPress={() => deleteFunction(item)} />];
        } else if(key==="_id") {
          const previousCells = outputData.data[key].cells;
          const textCell = <TextCell item={transformedItem}/>
          outputData.data[key].cells = [...previousCells, textCell];
        } else {
          const previousCells = outputData.data[key].cells;
          const editableCell = (
            <EditableCell 
              data={item} 
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
  export default formatList;