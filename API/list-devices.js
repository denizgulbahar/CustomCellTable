import Cookies from "js-cookie";
import constants from "../resources/constants";
async function devicePermissionLevels(data) {
    const response = await fetch(`${constants.API_URL_USER}/get-all-devices`, {
        method: 'POST',
        body: JSON.stringify(data),
    });
    const responseData = await response.json();
    return responseData;
}
const listDevicePermissionLevels  = async () => {
    const clientToken = Cookies.get('clientToken');
    const tokenRaw = {
        "token": clientToken
    }
    try {
        // console.log("Before list call")
        const data = await devicePermissionLevels(tokenRaw);
        const tableData = data.result
        // console.log(tableData)
        return  tableData
    } catch (error) {
        console.log('error', error);
    }
}

export default listDevicePermissionLevels;