import React, { useState } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, ScrollView } from 'react-native';
import { TextInput, Button, Snackbar } from 'react-native-paper';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Picker } from '@react-native-picker/picker';
import { registerUser } from '../api/authRegister';

export default function RegisterScreen({ navigation }) {
  const [cedula, setCedula] = useState('');
  const [nombre, setNombre] = useState('');
  const [apellidos, setApellidos] = useState('');
  const [fechaNacimiento, setFechaNacimiento] = useState(null);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [tipoResidencia, setTipoResidencia] = useState('');
  const [numeroResidencia, setNumeroResidencia] = useState('');
  const [customResidencia, setCustomResidencia] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [snackbarVisible, setSnackbarVisible] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarColor, setSnackbarColor] = useState('#ff7713');

  const handleRegister = async () => {
    if (!cedula || !nombre || !apellidos || !fechaNacimiento || !tipoResidencia || !numeroResidencia || !email || !password || !confirmPassword) {
      showSnackbar('Por favor, llena todos los campos', '#ff3d00');
      return;
    }
    if (password !== confirmPassword) {
      showSnackbar('Las contraseñas no coinciden', '#ff3d00');
      return;
    }

    const userData = {
      cedula,
      name: nombre,
      apellidos,
      email,
      fechaNacimiento: fechaNacimiento.toISOString().split('T')[0],
      tipoResidencia: tipoResidencia === 'otro' ? customResidencia : tipoResidencia,
      numeroResidencia,
      password,
    };


    try {
      await registerUser(userData);
      showSnackbar('Registro exitoso', '#4CAF50');
      setTimeout(() => navigation.navigate('Login'), 1500);
    } catch (error) {
      showSnackbar(error.message, '#ff3d00');
    }
  };


  const showSnackbar = (message, color) => {
    setSnackbarMessage(message);
    setSnackbarColor(color);
    setSnackbarVisible(true);
  };

  const onDateChange = (event, selectedDate) => {
    setShowDatePicker(false);
    if (selectedDate) {
      setFechaNacimiento(selectedDate);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.innerContainer}>
        <Text style={styles.title}>Registro de Usuario</Text>
        <View style={styles.formContainer}>
          <TextInput
            label="Cédula"
            mode="outlined"
            style={styles.input}
            value={cedula}
            onChangeText={setCedula}
            keyboardType="numeric"
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
            label="Nombre"
            mode="outlined"
            style={styles.input}
            value={nombre}
            onChangeText={setNombre}
            autoCapitalize="words"
            theme={{
              colors: {
                primary: '#ff7713',
                placeholder: '#444444',
                underlineColor: 'transparent',
              },
            }}
          />
          <TextInput
            label="Apellidos"
            mode="outlined"
            style={styles.input}
            value={apellidos}
            onChangeText={setApellidos}
            autoCapitalize="words"
            theme={{
              colors: {
                primary: '#ff7713',
                placeholder: '#444444',
                underlineColor: 'transparent',
              },
            }}
          />
          <TouchableOpacity onPress={() => setShowDatePicker(true)} style={styles.dateInput}>
            <Text style={{ color: fechaNacimiento ? '#000' : '#888' }}>
              {fechaNacimiento ? fechaNacimiento.toLocaleDateString() : 'Selecciona Fecha de Nacimiento'}
            </Text>
          </TouchableOpacity>
          {showDatePicker && (
            <DateTimePicker
              value={fechaNacimiento || new Date()}
              mode="date"
              display="default"
              onChange={onDateChange}
              maximumDate={new Date()}
              textColor="#444444"
            />
          )}

          <Text style={styles.label}>Tipo de Residencia</Text>
          <Picker
            selectedValue={tipoResidencia}
            onValueChange={(itemValue) => {
              setTipoResidencia(itemValue);
              if (itemValue !== 'otro') setCustomResidencia('');
            }}
            style={[styles.picker, { color: '#444444' }]}
          >
            <Picker.Item label="Selecciona..." value="" />
            <Picker.Item label="Manzana" value="manzana" />
            <Picker.Item label="Torre" value="torre" />
            <Picker.Item label="Cuadra" value="cuadra" />
            <Picker.Item label="Otro" value="otro" />
          </Picker>
          {tipoResidencia === 'otro' && (
            <TextInput
              label="Especifica tu tipo de residencia"
              mode="outlined"
              style={styles.input}
              value={customResidencia}
              onChangeText={setCustomResidencia}
              autoCapitalize="words"
              theme={{
                colors: {
                  primary: '#ff7713',
                  placeholder: '#444444',
                  underlineColor: 'transparent',
                },
              }}
            />
          )}
          <TextInput
            label="Número de Casa, Apartamento o Condominio"
            mode="outlined"
            style={styles.input}
            value={numeroResidencia}
            onChangeText={setNumeroResidencia}
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
          <TextInput
            label="Confirmar Contraseña"
            mode="outlined"
            secureTextEntry
            style={styles.input}
            value={confirmPassword}
            onChangeText={setConfirmPassword}
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
            onPress={handleRegister}
            style={styles.registerButton}
            labelStyle={{ color: '#ffffff' }}
            theme={{ colors: { primary: '#ff7713' } }}
          >
            Registrarse
          </Button>
          <Text style={styles.switchText}>
            ¿Ya tienes cuenta?
            <TouchableOpacity onPress={() => navigation.navigate('Login')}>
              <Text style={styles.switchTextInfo}>Inicia sesión</Text>
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
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 25,
    backgroundColor: '#bebebe',
  },
  innerContainer: {
    width: '100%',
    backgroundColor: '#ffffff',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  formContainer: {
    width: '100%',
  },
  input: {
    marginBottom: 10,
    backgroundColor: '#fff',
  },
  dateInput: {
    marginBottom: 10,
    padding: 15,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#ccc',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
  },
  picker: {
    marginBottom: 10,
    backgroundColor: '#fff',
  },
  registerButton: {
    marginTop: 20,
    width: '100%',
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
