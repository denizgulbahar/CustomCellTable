
import DeleteButton from "../../components/buttons/deleteButton";
import TextCell from "../../components/cellComponents/textCell";
import {inputDataWithButton} from "./insideFormats/inputDataWithButton"
import { objectTransformer } from "./insideFormats/objectTransformer";
async function formatUserPermission(formatData,deleteFunction) {
    // Initialize the output object
    const data = await formatData
    const outputData =  await inputDataWithButton(data)
    // Data by using headings and keys
    formatData.forEach((item, index) => {
      for (let key in outputData.data) {
        let transformedItem = objectTransformer(item[key])
        if(key==="Sil") {
          let previousButtonCells = outputData.data["Sil"]["cells"];
          const closeButton = (
            <DeleteButton 
              item={item}
              rowIndex={index}
              onPress={() => deleteFunction(item)} 
              />
          )
          outputData.data["Sil"]["cells"] = [...previousButtonCells, closeButton];
        } else {
          const previousCells = outputData.data[key].cells;
          const textCell = <TextCell item={transformedItem}/>
          outputData.data[key].cells = [...previousCells, textCell];
        }
      }
    });
    
    return outputData;
  }
  export default formatUserPermission;