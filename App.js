import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { CreateStackNavigator, createStackNavigator } from '@react-navigation/stack';
import login from './pages/login'
import index from './pages/geo/index'


const stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <stack.Navigator initialRouteName='login'>
        <stack.Screen name='login' component={login}/>
        <stack.Screen name='home' component={index}/>

      </stack.Navigator>

    </NavigationContainer>
  );
}

