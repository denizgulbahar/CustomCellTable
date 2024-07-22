export const cellTrimmer = ({ maxLength, value, setText }) => {
  
  if (value && value.length > maxLength) {
      setText(`${value.slice(0, maxLength)}...`);
  } else if (value) {
      setText(value);
  }
};
