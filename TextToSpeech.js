import React, { useState } from 'react';
import { StyleSheet, Button, TextInput, View, Item } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import * as Speech from 'expo-speech';

export default function TextToSpeech() {

    const [textToSpeech, setTextToSpeech] = useState('');

    const speak = () => {
        Speech.speak(textToSpeech, speechOptions);
        setTextToSpeech('');
    }

    const speechOptions = {
        rate: 0.8,
        pitch: 0.6,
        language: 'fi-FI'
    };

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.input}
                onChangeText={text => setTextToSpeech(text)}
                value={textToSpeech}
            />
            <Button
                style={styles.button}
                title="TEXT TO SPEECH"
                onPress={speak}
            />
    
            <StatusBar hidden={true} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'lightblue',
        alignItems: 'center',
        justifyContent: 'center',
    },
    input: {
        marginTop: 20,
        marginBottom: 20,
        padding: 10,
        width: 300,
        borderColor: 'gray',
        borderWidth: 1,
        backgroundColor: '#fff'
    },
});