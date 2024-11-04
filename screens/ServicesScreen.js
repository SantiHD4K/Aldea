import React from 'react';
import { View, Text, Button } from 'react-native';

export default function ServicesScreen({ navigation }) {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Pantalla de Servicios</Text>
        <Button
            title="Ir a Inicio"
            onPress={() => navigation.navigate('Home')}
        />
    </View>
  );
}
