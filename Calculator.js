import React, { useState } from 'react';
import { StyleSheet, Text, Button, TextInput, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';

export default function Calculator() {

    const [result, setResult] = useState('');
    const [num1, setNum1] = useState('');
    const [num2, setNum2] = useState('');
  
    const calculate = operator => {
  
      let number1 = Number(num1);
      let number2 = Number(num2);
  
      switch (operator) {
        case 'add':
          setResult(number1 + number2);
          break;
        case 'subtract':
          setResult(number1 - number2);
          break;
      }
      // tyhjennetään ruudut seuraavaa laskua varten
      setNum1('');
      setNum2('');
    }
  
    return (
      <View style={styles.container}>
        <Text>Result: {result}</Text>
        <TextInput
          style={styles.input}
          onChangeText={text => setNum1(text)}
          value={num1}
        />
        <TextInput
          style={styles.input}
          onChangeText={text => setNum2(text)}
          value={num2}
        />
        <View style={styles.operators}>
          <View style={styles.button}>
            <Button
              onPress={() => calculate('add')}
              title="+"
            />
          </View>
          <View style={styles.button}>
            <Button
              onPress={() => calculate('subtract')}
              title="-"
            />
          </View>
        </View>
        <StatusBar hidden={true}/>
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
    operators: {
      flexDirection: 'row',
      justifyContent: 'space-evenly',
    },
    button: {
      width: '10%',
      margin: 10
    }
  });