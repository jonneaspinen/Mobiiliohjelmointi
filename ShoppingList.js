import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, View, Button, TextInput, FlatList } from 'react-native';

export default function ShoppingList() {
    const [text, setText] = useState('');
    const [data, setData] = useState([]);

    const addToList = () => {
        setData([...data, { key: text }]);
        setText('');
    }

    return (
        <View style={styles.container}>
            <TextInput style={styles.input} onChangeText={text => setText(text)} value={text} />
            <View style={styles.operators}>
                <View style={styles.button}>
                    <Button
                        onPress={addToList}
                        title="Add to list"
                    />
                </View>
                <View style={styles.button}>
                    <Button
                        onPress={() => setData([])}
                        title="Clear list"
                    />
                </View>
            </View>
            <Text style={styles.title}>Shopping list</Text>
            <FlatList style={styles.list}
                data={data}
                renderItem={({ item }) =>
                    <Text>{item.key}</Text>
                }
                keyExtractor={(item, index) => index}
            />
            <StatusBar style="auto" />
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
        margin: 10
    },
    title: {
        textDecorationLine: 'underline',
        fontWeight: 'bold',
        marginTop: 20,
    }
});