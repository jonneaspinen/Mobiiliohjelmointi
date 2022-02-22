import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, Button, TextInput, View, Alert, Image, StatusBar } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';

export default function FindAddress() {

    const [location, setLocation] = useState(null);
    const [address, setAddress] = useState('');
    const [latitude, setLatitude] = useState(0);
    const [longitude, setLongitude] = useState(0);

    const key = 'INSERT MAPQUEST KEY HERE'

    const url = `http://www.mapquestapi.com/geocoding/v1/address?key=${key}&location=${address}`

    useEffect(() => {
        (async () => {
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                Alert.alert('No permission to get location')
                return;
            }
            let location = await Location.getCurrentPositionAsync({ accuracy: Location.Accuracy.High});
            setLocation(location);
            console.log('Location: ', location)
            setLatitude(location.coords.latitude)
            setLongitude(location.coords.longitude)
        })();
    }, []);

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
                    title={address}
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