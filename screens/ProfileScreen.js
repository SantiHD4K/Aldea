import React, { useState } from 'react';
import { View, StyleSheet, Text, Modal, TouchableOpacity, ScrollView } from 'react-native';
import { Avatar, TextInput, Button, Snackbar } from 'react-native-paper';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useAuth } from '../navigation/AuthContext';
import BackArrow from '../components/BackArrow';
import { updateUser as updateUserProfile } from '../api/edit';

export default function ProfileScreen({ navigation }) {
    const { user, logout, updateUser } = useAuth();
    const [formData, setFormData] = useState({
        cedula: user?.cedula || '',
        name: user?.name || '',
        apellidos: user?.apellidos || '',
        fechaNacimiento: user?.fechaNacimiento || null,
        tipoResidencia: user?.tipoResidencia || '',
        numeroResidencia: user?.numeroResidencia || '',
        email: user?.email || '',
    });
    const [isEditing, setIsEditing] = useState(false);
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [snackbarVisible, setSnackbarVisible] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [snackbarColor, setSnackbarColor] = useState('#ff7713');

    const handleInputChange = (field, value) => {
        setFormData({ ...formData, [field]: value });
    };

    const handleSave = async () => {
        try {
            const updatedUser = {
                ...formData,
                userId: user.id,
            };
            await updateUserProfile(updatedUser);
            await updateUser(updatedUser);
            setIsEditing(false);
            showSnackbar('Perfil actualizado exitosamente', '#4CAF50');
        } catch (error) {
            showSnackbar(error.message || 'Error al actualizar el perfil', '#ff3d00');
        }
    };

    const showSnackbar = (message, color) => {
        setSnackbarMessage(message);
        setSnackbarColor(color);
        setSnackbarVisible(true);
    };

    const handleLogout = () => {
        logout();
        navigation.navigate('Login');
    };

    const formattedDate = formData.fechaNacimiento
        ? new Date(formData.fechaNacimiento).toLocaleDateString()
        : "Fecha no disponible";

    return (
        <View style={styles.container}>
            <BackArrow title="Perfil" />
            <Avatar.Text
                size={80}
                label={user ? user.name.charAt(0) : 'I'}
                style={styles.avatar}
            />
            <Text style={styles.name}>{`${user?.name || 'Invitado'} ${user?.apellidos || ''}`}</Text>
            <Text style={styles.email}>{user?.email || 'Correo no disponible'}</Text>
            <View style={styles.infoContainer}>
                <Text style={styles.detailText}><Text style={styles.boldText}>Cédula:</Text> {user?.cedula || 'N/A'}</Text>
                <Text style={styles.detailText}><Text style={styles.boldText}>Fecha de Nacimiento:</Text> {user?.fechaNacimiento || 'N/A'}</Text>
                <Text style={styles.detailText}><Text style={styles.boldText}>Tipo de Residencia:</Text> {user?.tipoResidencia || 'N/A'}</Text>
                <Text style={styles.detailText}><Text style={styles.boldText}>Número de Residencia:</Text> {user?.numeroResidencia || 'N/A'}</Text>
                <Button
                    mode="contained"
                    onPress={() => setIsEditing(true)}
                    style={styles.editButton}
                    labelStyle={{ color: '#ffffff' }}
                    theme={{ colors: { primary: '#ff7713' } }}
                >
                    Editar Perfil
                </Button>
            </View>

            <Modal
                visible={isEditing}
                animationType="slide"
                transparent={true}
                onRequestClose={() => setIsEditing(false)}
            >
                <View style={styles.modalContainer}>
                    <ScrollView contentContainerStyle={styles.modalContent}>
                        <Text style={styles.title}>Editar Perfil</Text>

                        <TextInput
                            label="Cédula"
                            value={formData.cedula}
                            onChangeText={(text) => handleInputChange('cedula', text)}
                            mode="outlined"
                            style={styles.input}
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
                            value={formData.name}
                            onChangeText={(text) => handleInputChange('name', text)}
                            mode="outlined"
                            autoCapitalize="words"
                            style={styles.input}
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
                            value={formData.apellidos}
                            onChangeText={(text) => handleInputChange('apellidos', text)}
                            mode="outlined"
                            autoCapitalize="words"
                            style={styles.input}
                            theme={{
                                colors: {
                                    primary: '#ff7713',
                                    placeholder: '#444444',
                                    underlineColor: 'transparent',
                                },
                            }}
                        />

                        <TouchableOpacity onPress={() => setShowDatePicker(true)} style={styles.dateInput}>
                            <Text style={{ color: formData.fechaNacimiento ? '#000' : '#888' }}>
                                {formattedDate}
                            </Text>
                        </TouchableOpacity>

                        {showDatePicker && (
                            <DateTimePicker
                                value={formData.fechaNacimiento ? new Date(formData.fechaNacimiento) : new Date()}
                                mode="date"
                                display="default"
                                onChange={(event, selectedDate) => {
                                    setShowDatePicker(false);
                                    if (selectedDate) handleInputChange('fechaNacimiento', selectedDate);
                                }}
                                maximumDate={new Date()}
                            />
                        )}

                        <TextInput
                            label="Tipo de Residencia"
                            value={formData.tipoResidencia}
                            onChangeText={(text) => handleInputChange('tipoResidencia', text)}
                            mode="outlined"
                            autoCapitalize="none"
                            style={styles.input}
                            theme={{
                                colors: {
                                    primary: '#ff7713',
                                    placeholder: '#444444',
                                    underlineColor: 'transparent',
                                },
                            }}
                        />

                        <TextInput
                            label="Número de Casa, Apartamento o Condominio"
                            value={formData.numeroResidencia}
                            onChangeText={(text) => handleInputChange('numeroResidencia', text)}
                            mode="outlined"
                            autoCapitalize="none"
                            style={styles.input}
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
                            value={formData.email}
                            onChangeText={(text) => handleInputChange('email', text)}
                            mode="outlined"
                            style={styles.input}
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

                        <Button
                            mode="contained"
                            onPress={handleSave}
                            style={styles.saveButton}
                            labelStyle={{ color: '#ffffff' }}
                            theme={{ colors: { primary: 'green' } }}
                        >
                            Guardar Cambios
                        </Button>
                        <Button
                            mode="contained"
                            onPress={() => setIsEditing(false)}
                            style={styles.cancelButton}
                            labelStyle={{ color: '#ffffff' }}
                            theme={{ colors: { primary: 'red' } }}
                        >
                            Cancelar
                        </Button>
                    </ScrollView>
                </View>
            </Modal>


            <Snackbar
                visible={snackbarVisible}
                onDismiss={() => setSnackbarVisible(false)}
                duration={3000}
                style={{
                    backgroundColor: snackbarColor,
                    position: 'absolute',
                    bottom: 100, // Ajusta según el espacio que necesites
                    left: 0,
                    right: 0,
                    marginHorizontal: 20,
                    borderRadius: 5,
                }}
            >
                {snackbarMessage}
            </Snackbar>


            <Button
                mode="contained"
                onPress={handleLogout}
                style={styles.logoutButton}
                labelStyle={{ color: '#ffffff' }}
                theme={{ colors: { primary: '#ff7713' } }}
            >
                Cerrar Sesión
            </Button>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f3f3f1',
        paddingTop: 50,
        alignItems: 'center',
    },
    avatar: {
        backgroundColor: '#ff7713',
        marginBottom: 10,
        marginTop: 20,

    },
    name: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#333333',
    },
    infoContainer: {
        backgroundColor: '#ffffff',
        padding: 20,
        borderRadius: 10,
        width: '90%',
        alignItems: 'flex-start',
    },
    detailText: {
        fontSize: 16,
        color: '#333333',
        marginVertical: 5,
    },
    boldText: {
        fontWeight: 'bold',
    },
    email: {
        fontSize: 18,
        color: '#333333',
        marginBottom: 20,
    },
    editButton: {
        marginBottom: 20,
        width: '80%',
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: 'rgba(0,0,0,0.5)',
        padding: 40,
    },
    modalContent: {
        width: '100%',
        maxWidth: 400,
        backgroundColor: '#ffffff',
        borderRadius: 10,
        padding: 20,
    },
    input: {
        marginBottom: 10,
        backgroundColor: '#fff',
        width: '100%',
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
    saveButton: {
        marginTop: 10,
        width: '100%',
    },
    cancelButton: {
        marginTop: 10,
        width: '100%',
    },
    logoutButton: {
        position: 'absolute',
        bottom: 40,
        width: '80%',
    },
});
