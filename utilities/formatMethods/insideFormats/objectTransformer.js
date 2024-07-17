
function objectToStringWithSeparator(obj, separator) {
  const keyValuePairs = Object.entries(obj).map(([key, value]) => `${key}:${value}`);
  const resultString = keyValuePairs.join(separator);
  
  return `{${resultString}}`;
}

export const objectTransformer = (keyItem) => {
if (typeof keyItem === 'object') {
  const result = objectToStringWithSeparator(keyItem,", ")
  return result
} else {
  return keyItem
}
}