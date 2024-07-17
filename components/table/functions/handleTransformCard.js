
export function handleTransformCard(tableData) {
    let heading = tableData ? tableData.headings[0] : [];
    let transformedData = tableData.data[heading].cells.map((cell, index) => {
      const obj = {};
      // Her bir heading(sütun) için tüm hücreler doldurulur.
      tableData.headings.forEach(heading => {
        obj[heading] = tableData.data[heading].cells[index];
      });
      return obj;
    })
    console.log(transformedData)
    return transformedData
  }