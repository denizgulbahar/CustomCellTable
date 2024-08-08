import {inputDataWithButton} from "../../utilities/formatMethods/insideFormats/inputDataWithButton"
import { objectTransformer } from "../../utilities/formatMethods/insideFormats/objectTransformer";
import EditableCell from "../../components/tableCard/cellComponents/editableCell/editableCell";

async function formatDeviceMock(inputData, updateFunction, handleDeleteTableData) {
    // İşlem sırası düzeltilince yapılacak.
    const data = await inputData
    const outputData =  await inputDataWithButton(data)
    // First loop - Row Data
    inputData.forEach((item, index) => {
       // Second loop - Cell Data
      for(let key in outputData.data) {
        let transformedItem = objectTransformer(item[key])
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
    });
    
    return outputData;
  }
  export default formatDeviceMock;