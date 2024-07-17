import { DoubleButton } from "../../components/cellComponents/doubleButton"
import TextCell from "../../components/cellComponents/textCell"
import SwitchComponent from "../../components/switch/switch"
import { inputDataWithButtonContainer } from "./insideFormats/inputDataWithButtonContainer"

// Text + Button + Switch
async function formatTBS(inputData) {
    const data = await inputData
    // Change Header Format( Header Data Change)
    const outputData =  await inputDataWithButtonContainer(data)
    console.log(outputData)

   // Fill the Cells with 2 loop
    inputData.forEach((item, index) => {
      for (const field in outputData.data) {
        const key = field;
        if(key==="Button") {
          let previousButtonCells = outputData.data["Button"]["cells"];
          // Edit and delete buttons
          outputData.data["Button"]["cells"] = [...previousButtonCells, <DoubleButton index={index} />];
        } else if(key==="status") {
          // Switch
          const previousCells = outputData.data[field].cells;
          const switchCell = (
            <SwitchComponent 
              status={item.status} 
              style="table"
              onPress={() => changeSwitch(index)} 
              />
          )
          outputData.data[field].cells = [...previousCells, switchCell];
        } else {
          const previousCells = outputData.data[field].cells;
          const textCell = (
            <TextCell 
              data={item} 
              item={item[key]} 
              keyName={key} 
              />
          ) 
          outputData.data[field].cells = [...previousCells, textCell];
        }
      }
    });
  
    return outputData;
  }
  export default formatTBS;