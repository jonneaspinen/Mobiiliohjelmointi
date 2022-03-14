import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, FlatList } from 'react-native';
import * as Contacts from 'expo-contacts';

export default function App() {
    const [hasPermission, setHasPermission] = useState(null);
    const [contacts, setContacts] = useState([]);
    const [allContact, setAllContact] = useState([]);

    useEffect(() => {
        getContacts();
    }, []);

    const getContacts = async () => {
        const { status } = await Contacts.requestPermissionsAsync();
        setHasPermission(status === 'granted');

        if (status === 'granted') {
            const { data } = await Contacts.getContactsAsync({
                fields: [Contacts.Fields.PhoneNumbers]
            })

            setContacts(data);
        }
    }

    return (

        <View style={styles.container} >
            <StatusBar style="auto" />
            {
                hasPermission ? (
                    <View style={styles.container}>
                        <Text>Contacts:</Text>
                        <FlatList
                            style={{ marginLeft: "5%" }}
                            keyExtractor={item => item.id.toString()}
                            renderItem={({ item }) =>
                                <View style={styles.listcontainer}>
                                    <Text style={{ fontSize: 18 }}>
                                        {item.firstName} {item.lastName}
                                    </Text>
                                    <Text style={{ fontSize: 18 }}>
                                        {item.phoneNumbers[0].number}
                                    </Text>
                                </View>}
                            data={contacts}
                        />
                    </View>
                ) : (
                    <Text>No permission to use Contacts</Text>
                )
            }
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        paddingTop: 50,
        alignItems: 'center'
    },
    listcontainer: {
        flexDirection: "row",
        justifyContent: 'space-between',
        alignSelf: 'center',
        width: '80%'
    },
});