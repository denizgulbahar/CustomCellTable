import constants from "../resources/constants";
async function createDevice(data) {
    const response = await fetch(`${constants.API_URL_USER}/create-device`, {
        method: 'POST',
        body: JSON.stringify(data),
    });
    const responseData = await response.json();
    return responseData;
}
const createDeviceData = async (informations,setIsLoadingCreate) => {
    console.log("Before setIsLoadingCreate(true)")
    // Data ve dataRaw keyleri değişebilir.
    setIsLoadingCreate(true);
    const createData = {
            ...informations,
            createdAt: {
                $date: {
                    $numberLong: "1722958200000"
                }
            },
            updatedAt: {
                $date: {
                    $numberLong: "1722958200000"
                }
            }
    };
    const dataRaw = {
        newDevice: createData
    };
   
    try {
        // console.log("Before createDevice call")
        await createDevice(dataRaw);
        // console.log("After createDevice call")
    } catch (error) {
        console.log('error', error);
    } 
};
export default createDeviceData;