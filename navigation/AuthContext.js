// ... your existing imports
import React, { createContext, useState, useContext, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Crear el contexto de autenticación
export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Cargar los datos de usuario al iniciar la aplicación
    const loadUserData = async () => {
      try {
        const storedUser = await AsyncStorage.getItem('user');
        if (storedUser) {
          setUser(JSON.parse(storedUser));
        }
      } catch (error) {
        console.error("Error al cargar los datos de usuario:", error);
      }
    };
    loadUserData();
  }, []);

  // Función para iniciar sesión y guardar los datos del usuario
  const login = async (userData) => {
    try {
      setUser(userData);
      await AsyncStorage.setItem('user', JSON.stringify(userData));
    } catch (error) {
      console.error("Error al guardar los datos de usuario:", error);
    }
  };

  // Función para cerrar sesión y eliminar los datos del usuario
  const logout = async () => {
    try {
      setUser(null);
      await AsyncStorage.removeItem('user');
    } catch (error) {
      console.error("Error al eliminar los datos de usuario:", error);
    }
  };

  // Nueva función para actualizar los datos del usuario
  const updateUser = async (userData) => {
    try {
      // Always replace the user state with a new object
      setUser(prevUser => ({
        ...prevUser,
        ...userData
      }));
      await AsyncStorage.setItem('user', JSON.stringify(userData));
    } catch (error) {
      console.error("Error updating user data:", error);
    }
  };


  return (
    <AuthContext.Provider value={{ user, login, logout, updateUser }}>
      {children}
    </AuthContext.Provider>
  );
}

// Hook personalizado para utilizar el contexto de autenticación
export function useAuth() {
  return useContext(AuthContext);
}
