import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from '../screens/HomeScreen';
import Services from '../screens/ServicesScreen';
import Login from '../screens/LoginScreen';
import Register from '../screens/RegisterScreen';
import Profile from '../screens/ProfileScreen';
import Reservations from '../screens/ReservaScreen';

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
    return (
        <Stack.Navigator
            initialRouteName="Login" // Pantalla inicial de la app
            screenOptions={{
                headerShown: false, // Ocultar el encabezado en todas las pantallas
                animation: 'none', // Animación al cambiar de pantalla
            }}
        >
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="Register" component={Register} />
            <Stack.Screen name="Home" component={Home} />
            <Stack.Screen name="Profile" component={Profile} />
            <Stack.Screen name="Services" component={Services} />
            <Stack.Screen name="Reservations" component={Reservations} />
        </Stack.Navigator>
    );
}
