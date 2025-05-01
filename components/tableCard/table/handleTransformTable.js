export function handleTransformTable(tableData) {
    const data = Object.values(tableData.data);
    const maxLength = Math.max(...data.map(obj => obj.cells.length));

    // Transpose the arrays
    const transposedArray = Array.from({ length: maxLength }, (_, rowIndex) =>
        data.map(obj => obj.cells[rowIndex])
    );

    return transposedArray;
}
