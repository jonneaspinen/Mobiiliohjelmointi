import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import * as Contacts from 'expo-contacts';
import * as SMS from 'expo-sms';


export default function App() {
    const [hasPermission, setHasPermission] = useState(null);
    const [contacts, setContacts] = useState([]);
    const [currentContact, setCurrentContact] = useState({});

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
            if (data.length > 0) {
                setCurrentContact(data[0]);
                console.log(data[0]);
            }
        }
    }

    const sendSms = async () => {
        const isSMSAvailable = await SMS.isAvailableAsync();

        if (isSMSAvailable && currentContact && currentContact.phoneNumbers) {
            const { result } = await SMS.sendSMSAsync(
                [currentContact.phoneNumbers[0].number],
                `Hello ${currentContact.name}`
            )
        }
    }

    return (

        <View style={styles.container} >
            <StatusBar style="auto" />
            {
                hasPermission ? (
                    <View>
                        <Text>Number of contacts found: {contacts.length}</Text>
                        <Text>
                            {contacts.length ? (
                                <Text>Current contact: {currentContact.name}</Text>
                            ) : (
                                <Text>Get some contacts!</Text>
                            )}
                        </Text>
                        <Button title="Send SMS" onPress={sendSms} />
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
        alignItems: 'center',
        justifyContent: 'center',
    },
});