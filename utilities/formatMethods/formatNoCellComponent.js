import TextCell from "../../components/cellComponents/textCell"
import {inputDataOnly} from "./insideFormats/inputDataOnly"
import { objectTransformer } from "./insideFormats/objectTransformer";
// Only Text 
async function formatNoCellComponent(inputData) {
    // Making data format
    const data = await inputData
    const outputData =  await inputDataOnly(data)
    // InputData component configurations
    inputData.forEach((item, index) => {
      for (let key in outputData.data) {
        let transformedItem = objectTransformer(item[key])
        const previousCells = outputData.data[key].cells;
        outputData.data[key].cells = [...previousCells, transformedItem];
      }
    });
  
    return outputData;
  }
  export default formatNoCellComponent;