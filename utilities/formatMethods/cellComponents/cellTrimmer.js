export const cellTrimmer = ({maxLength,value,setText}) => {
    if(value) {
        if(value.length>maxLength){
          setText(`${value.slice(0, maxLength)}...`)
        } else {
          setText(value)
        }
    }
}