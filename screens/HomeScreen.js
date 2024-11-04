import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, AccessibilityInfo } from 'react-native';
import { useAuth } from '../navigation/AuthContext';

export default function HomeScreen({ navigation }) {
  const { user } = useAuth();

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.navigate('Profile')}
          accessible={true}
          accessibilityLabel="Ir a perfil"
        >
          <Image
            source={require('../assets/user.png')}
            style={styles.profileImage}
            accessible={true}
            accessibilityLabel="Imagen de perfil"
          />
        </TouchableOpacity>
        <Text style={styles.greetingText}>Hola, {user ? user.name : 'Invitado'}</Text>
      </View>

      <View style={styles.servicesGrid}>
        {[
          { title: 'Servicios', icon: require('../assets/service.png'), route: 'Services' },
          { title: 'Reservaciones', icon: require('../assets/reservations.png'), route: 'Reservations' },
          { title: 'Correspondencias', icon: require('../assets/correspondence.png'), route: 'Correspondence' },
          { title: 'Llamar a Portería', icon: require('../assets/callReception.png'), route: 'CallReception' },
          { title: 'Atención al Cliente', icon: require('../assets/customerService.png'), route: 'CustomerService' },
          { title: 'Pagos', icon: require('../assets/pay.png'), route: 'Pay' },
        ].map((service, index) => (
          <TouchableOpacity
            key={index}
            style={styles.serviceSquare}
            onPress={() => navigation.navigate(service.route)}
            accessible={true}
            accessibilityLabel={`Ir a ${service.title}`}
          >
            <Image source={service.icon} style={styles.icon} />
            <Text style={styles.buttonText}>{service.title}</Text>
          </TouchableOpacity>
        ))}
      </View>
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
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#cac1b2',
    width: '100%',
    justifyContent: 'space-between',
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  greetingText: {
    fontSize: 20,
    color: '#ffffff',
    fontWeight: 'bold',
  },
  servicesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginTop: 20,
  },
  serviceSquare: {
    backgroundColor: '#ff7713',
    width: 120,
    height: 120,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    marginHorizontal: 10,
    marginVertical: 10,
  },
  icon: {
    width: 65,
    height: 65,
    marginBottom: 5,
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 15,
    textAlign: 'center',
  },
});
