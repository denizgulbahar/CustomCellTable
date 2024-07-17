import Cookies from "js-cookie";
import constants from "../../resources/constants";
async function deleteDevice(data) {
    const response = await fetch(`${constants.API_URL_USER}/delete-device`, {
        method: 'POST',
        body: JSON.stringify(data),
    });
    const responseData = await response.json();
    return responseData;
}

const deleteDeviceData = async (item) => {
    const clientToken = Cookies.get('clientToken');
    const dataRaw = {
        token: clientToken,
        deviceId: item._id,
    }
    try {
        console.log("Before delete call:",dataRaw.deviceId)
        await deleteDevice(dataRaw);
    } catch (error) {
        console.log('error', error);
    }
};
export default deleteDeviceData;