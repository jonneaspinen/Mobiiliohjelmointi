import React, { useState } from 'react';
import { StyleSheet, Text, Button, TextInput, View, FlatList } from 'react-native';
import { StatusBar } from 'expo-status-bar';


export default function CalculatorHistory({ route }) {

    const { data } = route.params;

    return (
        <View style={styles.container}>
            <Text style={styles.title}>History</Text>
            <FlatList
                data={data}
                renderItem={({ item }) =>
                    <Text>{item.key}</Text>
                }
                keyExtractor={(item, index) => index}
            />
            <StatusBar hidden={true} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        paddingTop: 50,
        flex: 1,
        backgroundColor: '#e6bbbb',
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
    title: {
        textDecorationLine: 'underline',
        marginTop: 20,
        fontWeight: 'bold'
    }
});