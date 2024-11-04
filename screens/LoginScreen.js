import React, { useState } from 'react';
import { View, StyleSheet, Text, Image, TouchableOpacity } from 'react-native';
import { TextInput, Button, Snackbar } from 'react-native-paper';
import { loggingUser } from '../api/authLogin';
import { CommonActions } from '@react-navigation/native';
import { useAuth } from '../navigation/AuthContext';

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [snackbarVisible, setSnackbarVisible] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarColor, setSnackbarColor] = useState('#ff7713');

  const { login } = useAuth();

  const handleLogin = async () => {
    if (!email || !password) {
      showSnackbar('Por favor, llena todos los campos', '#ff3d00');
      return;
    }
  
    const userData = { email, password };
    try {
      const data = await loggingUser(userData);
  
      login({
        id: data.userId,
        name: data.name,
        email: data.email,
        cedula: data.cedula,
        apellidos: data.apellidos,
        fechaNacimiento: data.fechaNacimiento,
        tipoResidencia: data.tipoResidencia,
        numeroResidencia: data.numeroResidencia,
      });
      showSnackbar('Inicio de sesión exitoso', '#4CAF50');
  
      // Navega a la pantalla principal
      setTimeout(() => {
        navigation.dispatch(
          CommonActions.reset({
            index: 0,
            routes: [{ name: 'Home' }],
          })
        );
      }, 1000);
    } catch (error) {
      // Lógica de manejo de errores
      if (error.message.includes('Contraseña incorrecta')) {
        showSnackbar('Contraseña incorrecta. Intenta de nuevo.', '#ff3d00');
      } else if (error.message.includes('Correo no encontrado')) {
        showSnackbar('No se encontró una cuenta con este correo.', '#ff3d00');
      } else {
        showSnackbar('Error en el inicio de sesión. Inténtalo más tarde.', '#ff3d00');
      }
    }
  };  

  const showSnackbar = (message, color) => {
    setSnackbarMessage(message);
    setSnackbarColor(color);
    setSnackbarVisible(true);
  };

  return (
    <View style={styles.container}>
      <View style={styles.innerContainer}>
        <Text style={styles.welcomeText}>Bienvenido</Text>
        <Image
          source={require('../assets/aldea.png')}
          style={styles.logoImage}
          resizeMode="contain"
        />
        <Text style={styles.welcomeText}>Aldea App</Text>

        <View style={styles.formContainer}>
          <TextInput
            label="Correo"
            mode="outlined"
            style={styles.input}
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
            theme={{
              colors: {
                primary: '#ff7713',
                placeholder: '#444444',
                underlineColor: 'transparent',
              },
            }}
          />
          <TextInput
            label="Contraseña"
            mode="outlined"
            secureTextEntry
            style={styles.input}
            value={password}
            onChangeText={setPassword}
            autoCapitalize="none"
            theme={{
              colors: {
                primary: '#ff7713',
                placeholder: '#444444',
                underlineColor: 'transparent',
              },
            }}
          />
          <Button
            mode="contained"
            onPress={handleLogin}
            labelStyle={{ color: '#ffffff' }}
            theme={{ colors: { primary: '#ff7713' } }}
          >
            Iniciar Sesión
          </Button>
          <Text style={styles.switchText}>
            ¿No tienes cuenta?
            <TouchableOpacity onPress={() => navigation.navigate('Register')}>
              <Text style={styles.switchTextInfo}>Regístrate</Text>
            </TouchableOpacity>
          </Text>
        </View>
      </View>

      <Snackbar
        visible={snackbarVisible}
        onDismiss={() => setSnackbarVisible(false)}
        duration={3000}
        style={{ backgroundColor: snackbarColor }}
      >
        {snackbarMessage}
      </Snackbar>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#bebebe',
  },
  innerContainer: {
    width: '80%',
    backgroundColor: '#ffffff',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
  },
  welcomeText: {
    fontSize: 24,
    marginBottom: 20,
  },
  logoImage: {
    width: '100%',
    height: 150,
    marginBottom: 20,
  },
  formContainer: {
    width: '100%',
  },
  input: {
    marginBottom: 10,
    backgroundColor: '#fff',
  },
  switchText: {
    marginTop: 20,
    fontSize: 16,
    textAlign: 'center',
  },
  switchTextInfo: {
    textDecorationLine: 'underline',
    marginHorizontal: 5,
    marginVertical: -2,
    color: 'blue',
  },
});
