import { createStackNavigator } from '@react-navigation/stack';
import { StatusBar } from 'react-native';
import DeviceScreen from '../screens/device/DeviceScreen';
const Stack = createStackNavigator();

export default function MainStack() {
    
    return (
        <>
            <StatusBar style="auto" />
            <Stack.Navigator
            >
                <Stack.Screen
                    options={() => ({
                        title: "Device Screen",
                    })}
                    name="devices"
                    component={DeviceScreen}
                />
            </Stack.Navigator >
        </>
    );
}
