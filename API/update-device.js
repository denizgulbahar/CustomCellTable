import Cookies from "js-cookie";
import constants from "../resources/constants";
async function updateDevice(data) {
    try {
        const response = await fetch(`${constants.API_URL_USER}/update-device`, {
            method: 'POST',
            body: JSON.stringify(data),
        });
        const responseData = await response.json();
        return responseData;
    } catch (e) {
        console.log(e.message);
    }
   
}
const updateDeviceData = async (data,item,key) => {
    const clientToken = Cookies.get('clientToken');
    const updatedData = {
        [key]:item
    }
    const dataRaw = {
        token: clientToken,
        deviceId: data._id,
        updatedDevice:updatedData
    };
    
    console.log(item)
    console.log(updatedData);
    try {
        await updateDevice(dataRaw);
        // console.log("After update call")
    } catch (error) {
        console.error('Error updating data:', error);
    }
};
export default updateDeviceData;