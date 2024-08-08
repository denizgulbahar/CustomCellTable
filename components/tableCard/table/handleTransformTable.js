export function handleTransformTable(tableData) {
    const data = Object.values(tableData.data)
    let maxLength = Math.max(...data.map(obj => obj.cells.length));
    // Transpose the arrays
    let transposedArray = Array.from({ length: maxLength }, (_, index) =>
        data.map(obj => obj.cells[index])
    );
    return transposedArray;
  }