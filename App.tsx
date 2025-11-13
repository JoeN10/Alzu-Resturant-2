import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import { MenuProvider } from './src/context/MenuContext';
import { FilterMenuScreen } from './src/screens/FilterMenuScreen';
import { HomeScreen } from './src/screens/HomeScreen';
import { ManageMenuScreen } from './src/screens/ManageMenuScreen';

export type RootStackParamList = {
  Home: undefined;
  ManageMenu: undefined;
  FilterMenu: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

const App = () => (
  <MenuProvider>
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{
          headerStyle: { backgroundColor: '#004D40' },
          headerTintColor: '#FFFFFF',
          headerTitleStyle: { fontWeight: '700' },
        }}
      >
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ title: 'Alzu Restaurant' }}
        />
        <Stack.Screen
          name="ManageMenu"
          component={ManageMenuScreen}
          options={{ title: 'Chef Menu Management' }}
        />
        <Stack.Screen
          name="FilterMenu"
          component={FilterMenuScreen}
          options={{ title: 'Guest Menu Explorer' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  </MenuProvider>
);

export default App;