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
        getCellWidth,
        cellOutView: {
            flex: 1,
            justifyContent: 'center',
            alignItems: "center",
        },
        mediumShadowStyle: {
            shadowColor: 'rgba(0, 0, 0, 0.25)',
            shadowOffset: { width: 0, height: 1 },
            shadowOpacity: 1,
            shadowRadius: 3,
            elevation: 3, // Android için shadow
        },
        cellComponent: {
            textAlign: "center",
            fontSize: width > 500 ? 15 : 12,
            color: color.black,
            padding: 0,
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
            width: 100,
            backgroundColor:"orange"
        },
    };
};

export default globalStyles;

    