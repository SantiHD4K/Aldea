import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { IconButton } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';

export default function BackArrow({ title }) {
    const navigation = useNavigation();

    const goBack = () => {
        navigation.goBack();
    };

    return (
        <View style={styles.headerContainer}>
            <TouchableOpacity onPress={goBack} style={styles.backButton}>
                <IconButton icon="arrow-left" size={35} color="#ffffff" />
            </TouchableOpacity>
            <Text style={styles.title}>{title}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    headerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#cac1b2',
        width: '100%',
        padding: 9,
    },
    backButton: {
        marginRight: 20,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#ffffff',
    },
});
