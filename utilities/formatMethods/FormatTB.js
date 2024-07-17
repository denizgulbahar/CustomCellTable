import TextCell from "../../components/cellComponents/textCell"
import TableButton from "../../components/buttons/tableButton"
import { inputDataWithButtonContainer } from "./insideFormats/inputDataWithButtonContainer"

// First Header data change after cellData fill.
// Text + Button
async function formatTB(inputData) {
    const data = await inputData
    // Change Header Format( Header Data Change)
    const outputData =  await inputDataWithButtonContainer(data)
    const handleBack= (index) => {
      console.log(`${index+1}. Button pressed. `)
      }
      // Fill the Cells with 2 loop
    inputData.forEach((item, index) => {
      for (const field in outputData.data) {
        const key = field;
        if(key==="Button") {
          let previousButtonCells = outputData.data["Button"]["cells"];
          // Only delete buttons
          const deleteButton = (
            <TableButton 
              title="Geri Al" 
              background="red" 
              onPress={() => handleBack(index)}
              /> 
          ) 
          outputData.data["Button"]["cells"] = [...previousButtonCells,deleteButton];
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
  export default formatTB;