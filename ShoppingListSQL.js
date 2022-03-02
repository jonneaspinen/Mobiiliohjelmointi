import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, TextInput, View, Button, FlatList } from 'react-native';
import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabase('shoppinglistdb.db');

export default function App() {
    const [amount, setAmount] = useState('');
    const [product, setProduct] = useState('');
    const [shoppinglist, setShoppinglist] = useState([]);

    useEffect(() => {
        db.transaction(tx => {
            tx.executeSql('create table if not exists shoppinglist (id integer primary key not null unique, amount text, product text);');
        });
        updateList();
    }, []);

    // SAVE/ADD product
    const saveItem = () => {
        db.transaction(tx => {
            tx.executeSql('insert into shoppinglist (amount, product) values (?, ?);', [amount, product]);
        }, null, updateList
        )
        setAmount('');
        setProduct('');
    }

    // Update shoppinglist
    const updateList = () => {
        db.transaction(tx => {
            tx.executeSql('select * from shoppinglist;', [], (_, { rows }) =>
                setShoppinglist(rows._array)
            );
        });
    }

    // Delete product
    const deleteItem = (id) => {
        db.transaction(
            tx => {
                tx.executeSql(`delete from shoppinglist where id = ?;`, [id]);
            }, null, updateList
        )
    }

    const listSeparator = () => {
        return (
            <View
                style={{
                    height: 5,
                    width: "80%",
                    backgroundColor: "#fff",
                    marginLeft: "10%"
                }}
            />
        );
    };

    return (
        <View style={styles.container}>
            <TextInput placeholder='Product' style={{ marginTop: 30, fontSize: 18, width: 200, borderColor: 'gray', borderWidth: 1 }}
                onChangeText={(product) => setProduct(product)}
                value={product} />
            <TextInput placeholder='Amount' style={{ marginTop: 5, marginBottom: 5, fontSize: 18, width: 200, borderColor: 'gray', borderWidth: 1 }}
                onChangeText={(amount) => setAmount(amount)}
                value={amount} />
            <Button onPress={saveItem} title="ADD/SAVE" />
            <Text style={{ marginTop: 30, marginBottom: 10, fontSize: 20 }}>Shoppinglist:</Text>
            <FlatList
                style={{ marginLeft: "5%" }}
                keyExtractor={item => item.id.toString()}
                renderItem={({ item }) => <View style={styles.listcontainer}><Text style={{ fontSize: 18 }}>{item.amount}, {item.product}</Text>
                    <Text style={{ fontSize: 18, color: '#0000ff' }} onPress={() => deleteItem(item.id)}> bought</Text></View>}
                data={shoppinglist}
                ItemSeparatorComponent={listSeparator}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        paddingTop: 50,
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    listcontainer: {
        flexDirection: 'row',
        backgroundColor: '#fff',
        alignItems: 'center'
    },
});