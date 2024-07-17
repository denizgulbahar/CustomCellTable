import { color } from "./color";

const globalStyles = (width) => {
    const getCellWidth = () => {
       if (width >= 1000) {
            return 170;
        } else if (width >= 300) {
            return 110;
        } else {
            return 100;
        }
    };

    const cellWidthValue = getCellWidth();

    return {
        cellOutView: {
            justifyContent: "center",
        },
        cellView: {
            flex: 1,
            width: "auto",
            marginVertical: "auto",
        },
        cellComponent: {
            flex: 1,
            color: color.black,
            fontSize: width > 500 ? 15 : 12,
            textAlign: "center",
            fontWeight: "400",
            padding: 7,
        },
        editableCellButton: {
            flex: 1,
            justifyContent: 'center',
            alignSelf: "center",
        },
        cellWidth: {
            width: cellWidthValue,
            alignItems: "flex-start",
        },
        cellInputWidth: {
            width: cellWidthValue,
        },
    };
};

export default globalStyles;

    