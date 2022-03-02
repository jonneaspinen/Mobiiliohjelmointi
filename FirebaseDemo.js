import { initializeApp } from 'firebase/app';
import { getDatabase, push, ref, onValue } from 'firebase/database';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, TextInput, View, Button, FlatList } from 'react-native';

export default function FirebaseDemo() {

    // Your web app's Firebase configuration

    const firebaseConfig = {

        apiKey: "API KEY",

        authDomain: "DOMAIN",

        databaseURL: "DATABASE URL",

        projectId: "PROJECT ID",

        storageBucket: "STORAGE BUCKET",

        messagingSenderId: "MESSAGING SENDER ID",

        appId: "APP ID"

    };

    // Initialize Firebase

    const app = initializeApp(firebaseConfig);
    const database = getDatabase(app);
    ref(database, 'items/')

    const [amount, setAmount] = useState('');
    const [product, setProduct] = useState('');
    const [items, setItems] = useState([]);


    useEffect(() => {
        const itemsRef = ref(database, 'items/');
        onValue(itemsRef, (snapshot) => {
            const data = snapshot.val();
            setItems(Object.values(data));
        })
    }, []);

    const saveItem = () => {
        push(
            ref(database, 'items/'),
            { 'product': product, 'amount': amount });
        setProduct('');
        setAmount('');
    }

    return (
        <View style={styles.container}>
            <TextInput
                placeholder='Product'
                style={{ marginTop: 30, fontSize: 18, width: 200, borderColor: 'gray', borderWidth: 1 }}
                onChangeText={(product) => setProduct(product)}
                value={product} />

            <TextInput
                placeholder='Amount'
                style={{ marginTop: 5, marginBottom: 5, fontSize: 18, width: 200, borderColor: 'gray', borderWidth: 1 }}
                onChangeText={(amount) => setAmount(amount)}
                value={amount} />

            <Button onPress={saveItem} title="ADD/SAVE" />

            <Text style={{ marginTop: 30, marginBottom: 10, fontSize: 20 }}>Shoppinglist:</Text>

            <FlatList
                style={{ marginLeft: "5%" }}
                keyExtractor={(item) => item.product.toString()}
                renderItem={({ item }) =>
                    <View style={styles.listcontainer} key={item.product}>
                        <Text style={{ fontSize: 18 }}>
                            {item.amount}, {item.product}
                        </Text>
                    </View>}
                data={items}
            />
        </View>
    )
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