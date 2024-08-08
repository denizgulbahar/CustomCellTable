import { dataSource } from "../../data/dataSource";

export const measureText = (text, fontSize = 14) => {
    return text.length * fontSize * 0.6; // This is a rough estimation of character width.
  };
  
//    Calculates the maximum width for each column in a table based on the content.
//    It iterates through each row and each cell to find the maximum width for each column.
   
export const calculateMaxWidths = (data) => {
  if (data.length === 0) return [];

  const numColumns = Object.values(data[0]).length;
  const widths = Array(numColumns).fill(0);

  data.forEach(row => {
    Object.values(row).forEach((cell, index) => {
      const cellWidth = measureText(cell);
      if (cellWidth > widths[index]) {
        widths[index] = cellWidth;
      }
    });
  });

  return widths;
};
  