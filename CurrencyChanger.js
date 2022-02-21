import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, Button, TextInput, View, Alert, Image } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { PickerItem } from 'react-native/Libraries/Components/Picker/Picker';

export default function CurrencyChanger() {

    const [converted, setConverted] = useState('');
    const [wantedCurrency, setWantedCurrency] = useState();
    const [currencyValues, setCurrencyValues] = useState([]);
    const [amount, setAmount] = useState([]);

    const access_key = `EXPIRED`
    const url = `http://api.exchangeratesapi.io/v1/latest?access_key=${access_key}`

    useEffect(() => {
        getCurrencyValues();
    }, []);

    const getCurrencyValues = () => {
        fetch(url)
            .then(res => res.json())
            .then(data => {
                setCurrencyValues(data.rates)
                console.log(currencyValues)
            })
            .catch(error => {
                Alert.alert('Error', error.message);
            });
    }

    const doConvert = () => {
        const eurValue = Number(amount) / rates[selectedValue];
        setConverted(`${eurValue.toFixed(2)}€`);
    }

    return (

        <View>
            <Text>{converted}</Text>
            <TextInput
                placeholder={'Amount'}
                value={amount}
                onChangeText={text => setAmount(text)}
                keyboardType='numeric'
            />
            <Picker
                selectedValue={wantedCurrency}
                onValueChange={(itemValue, itemIndex) => {
                    setWantedCurrency(itemValue);
                }}>

                {Object.keys(currencyValues).sort().map(key => (<Picker.Item label={key} value={key} key={key} />))}
            </Picker>

            <Button title='CONVERT' onPress={doConvert} />

        </View >

        // <View></View>
    );
}

const styles = StyleSheet.create({
    thumb: {
        width: 400,
        height: 100
    },
    input: {
        paddingTop: 40,
        fontSize: 18,
        width: 200
    }
});