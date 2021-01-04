import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import SignIn from '../components/auth/SignIn';
import CameraScreen from '../screens/CameraScreen';
import ComfirmScreen from '../screens/ComfirmScreen';

const Stack = createStackNavigator();

export default AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        {/* <Stack.Screen name="SignIn" component={SignIn} /> */}
        <Stack.Screen name="Camera" component={CameraScreen} />
        <Stack.Screen name="Comfirm" component={ComfirmScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
