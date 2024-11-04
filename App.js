import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AppNavigator from './navigation/routes';
import { AuthProvider } from './navigation/AuthContext';

export default function App() {
  return (
    <AuthProvider>
      <NavigationContainer>
        <AppNavigator />
      </NavigationContainer>
    </AuthProvider>
  );
}
