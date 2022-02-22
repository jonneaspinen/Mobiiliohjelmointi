import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, Button, TextInput, View, Alert, Image, StatusBar } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { backgroundColor } from 'react-native/Libraries/Components/View/ReactNativeStyleAttributes';

export default function FindAddress() {

    const [address, setAddress] = useState('');
    const [latitude, setLatitude] = useState(60.166628); // Helsinki as default
    const [longitude, setLongitude] = useState(24.943508);

    const key = 'INSERT KEY HERE'

    const url = `http://www.mapquestapi.com/geocoding/v1/address?key=${key}&location=${address}`

    getLocation = async () => {
        try {
            const response = await fetch(url);
            const data = await response.json();

            setLatitude(data.results[0].locations[0].latLng.lat)
            setLongitude(data.results[0].locations[0].latLng.lng)

            console.log(latitude)
            console.log(longitude)
        }
        catch (error) {
            console.error(error);
        }
    }

    const mapCord = {
        latitude: latitude,
        longitude: longitude,
        latitudeDelta: 0.0322,
        longitudeDelta: 0.0221,
    };

    const markCord = {
        latitude: latitude,
        longitude: longitude,
    };

    return (
        <View style={styles.container}>
            <MapView
                style={styles.map}
                region={mapCord}
            >
                <Marker
                    coordinate={markCord}
                    title='Haaga-Helia'
                />
            </MapView>
            < TextInput
                style={styles.input}
                placeholder='address'
                onChangeText={text => setAddress(text)} />
            <Button title='Search' onPress={getLocation} />

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        paddingTop: StatusBar.currentHeight,
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center'
    },
    input: {
        fontSize: 18,
        paddingBottom: 10,
        paddingTop: 10
    },
    map: {
        flex: 1,
        width: '100%',
        height: '100%'
    }
});