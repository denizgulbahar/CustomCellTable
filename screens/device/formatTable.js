import { inputDataWithButton } from "../../utilities/formatMethods/insideFormats/inputDataWithButton";
import { objectTransformer } from "../../utilities/formatMethods/insideFormats/objectTransformer";
import SwitchOriginal from "../../components/switch/switchOriginal";
import ModalCell from "../../components/tableCard/cellComponents/modalCell";
import TextCell from "../../components/tableCard/cellComponents/textCell";
import { DeleteButton } from "../../components/tableCard/cellComponents/deleteButton";

async function formatTable(inputData, deleteFunction) {
  const data = await inputData;
  const outputData = await inputDataWithButton(data);
  const headers = Object.keys(data[0] || {});

  for (let key of headers) {
    outputData.data[key]["cells"] = [];
  }

  // Add Header to First Row
  for (let key of headers) {
    const headerCell = <TextCell item={key} isBold />;
    outputData.data[key]["cells"].push(headerCell);
  }

  // Other Rows
  inputData.forEach((item) => {
    for (let key in outputData.data) {
      const transformedItem = objectTransformer(item[key]);

      if (key === "Sil") {
        outputData.data[key]["cells"].push(
          <DeleteButton onDelete={() => deleteFunction(item)} />
        );
      } else {
        outputData.data[key]["cells"].push(
          <TextCell item={transformedItem} />
        );
      }
    }
  });

  return outputData;
}
export default formatTable;