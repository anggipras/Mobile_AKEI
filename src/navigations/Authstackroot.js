import React from 'react';
import {createStackNavigator} from '@react-navigation/stack'
import LoginScreen from './../screens/LoginScreen'

const Stack = createStackNavigator()

const AuthStackRoot = () => {
    return (
        <Stack.Navigator headerMode='none'>
            <Stack.Screen name='login' component={LoginScreen} />
        </Stack.Navigator>
    )
}

export default AuthStackRoot