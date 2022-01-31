import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, Button, TextInput, View, Alert } from 'react-native';
import { StatusBar } from 'expo-status-bar';

export default function NumberGuess() {

    const [input, setInput] = useState('');
    const [tip, setTip] = useState('');
    const [answer, setAnswer] = useState('');
    const [guessAmount, setGuessAmount] = useState('');

    const setup = () => {
        setAnswer(Math.floor(Math.random() * 101));
        setTip('Guess a number between 0-100');
        setGuessAmount(1);
    }

    useEffect(() => {
        setup();
    }, []);

    const guess = () => {

        const inputNum = Number(input);
        setGuessAmount(guessAmount + 1);

        if (inputNum < answer) {
            setTip('The right number is higher!');
        } else if (inputNum > answer) {
            setTip('The right number is lower!')
        } else {
            Alert.alert(`You guessed the number in ${guessAmount} guesses!`)
            setup();
        }
        setInput('');
    }

    return (
        <View style={styles.container}>
            <Text>{tip}</Text>
            <TextInput
                style={styles.input}
                onChangeText={text => setInput(text)}
                value={input}
            />
            <Button
                onPress={guess}
                title="Guess"
            />

            <StatusBar hidden={true} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        paddingTop: 100,
        flex: 1,
        backgroundColor: '#e6bbbb',
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
    input: {
        marginTop: 20,
        marginBottom: 5,
        width: 200,
        borderColor: 'gray',
        borderWidth: 1,
        backgroundColor: '#fff'
    },
    button: {
        width: '10%',
        margin: 10
    }
});