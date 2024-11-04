// components/Logo.js
import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

// Import your local image
const logoImage = require('../assets/aldea.png');

const Logo = () => {
    return (
        <View style={styles.container}>
            <Image 
                source={logoImage}
                style={styles.logo}
            />
            <Text style={styles.companyName}>Aldea App</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    logo: {
        width: 100,
        height: 100,
        marginBottom: 20,
    },
    companyName: {
        fontSize: 24,
        fontWeight: 'bold',
    },
});

export default Logo;
