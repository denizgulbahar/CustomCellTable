// Text + Modal
import TextCell from "../../components/cellComponents/textCell"
import { LabeledModalCell } from "../../components/cellComponents/labeledModalCell"
import { inputDataWithModal } from "./../formatMethods/insideFormats/inputDataWithModal"

async function formatTM(inputData) {
    // Making data format
    const data = await inputData
    const outputData =  await inputDataWithModal(data)
    // InputData component configurations
    inputData.forEach((item, index) => {
      for (const field in outputData.data) {
        const key = field;
        if(key==="Modal") {
            let previousButtonCells = outputData.data["Modal"]["cells"];
            const labeledModal = <LabeledModalCell item={item} index={index}/>
            outputData.data["Modal"]["cells"] = [...previousButtonCells,labeledModal];
        } else {
            const previousCells = outputData.data[field].cells;
            const textCell = <TextCell data={item} item={item[key]} keyName={key} />;
            outputData.data[field].cells = [...previousCells, textCell];
        }
      }
    });
  
    return outputData;
  }
  export default formatTM;