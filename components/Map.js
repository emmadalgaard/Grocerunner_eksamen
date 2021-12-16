// Lavet ud fra øvelse i undervisningen
import React, {useState} from'react';
import { SafeAreaView, StyleSheet, Dimensions } from 'react-native';
import MapView, {Marker} from "react-native-maps";
import * as Location from 'expo-location';
import {useEffect} from "react";

// Definerer data, der skal bruges til at sætte initial placering på kortet
const { width, height } = Dimensions.get('window');
const ASPECT_RATIO = width / height;
const LATITUDE = 55.710964142601355;
const LONGITUDE = 12.56262100815096;
const LATITUDE_DELTA = 0.02;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

// Sætter dataene her
const initialRegion = {
    latitude: LATITUDE,
    longitude: LONGITUDE,
    latitudeDelta: LATITUDE_DELTA,
    longitudeDelta: LONGITUDE_DELTA,
}

// Opretter Map funktion med states
export default function Map() {
    const [hasLocationPermission, setLocationPermission] = useState(false);
    const [currentLocation, setCurrentLocation] = useState(null);
    const [userMarkerCoordinates, setUserMarkerCoordinates] = useState([]);

    /* getLocationPermission udnytter den prædefinerede asynkrone metode requestForegroundPermissionsAsync, som requester tilladelse til enhedens lokation
    og værdien af af locationPermission sættes med item.granted */
    const getLocationPermission = async () => {
        await Location.requestForegroundPermissionsAsync().then((item)=>{
            setLocationPermission(item.granted)
        } );

    };

    // useEffect kaldes getlocationPermission, der sikrer at enheden forespørger tilladelse
    useEffect (() => {
        const response = getLocationPermission()
    });

    /* getCurrentPositionAsync er en prædefineret metode, som returnerer den nuværende lokation, som derefter sættes i currentLocation
    Accuracy.Balanced, angiver nøjagtigheden der bruges til at angive positionen */
    const updateLocation = async () => {
        await Location.getCurrentPositionAsync({accuracy: Accuracy.Balanced}).then((item)=>{
            setCurrentLocation(item.coords)
        } );
    };

    // reverseGeocodeAsync omsætter koordinatsættet til data
    const handleLongPress = event => {
        const coordinate = event.nativeEvent.coordinate
        setUserMarkerCoordinates((oldArray) => [...oldArray, coordinate])
    };

// Bruger google som provider og sender alt ovenstående data med i viewet
// Viser  koordinater i mapView med titel
    return (
        <SafeAreaView>
            <MapView
                provider="google"
                style={styles.map}
                showsUserLocation={true}
                onLongPress={handleLongPress}
                region={initialRegion}
                >
                    
                <Marker
                    coordinate = {{latitude: 55.710129047027905, longitude: 12.564009627369503}}
                    title="Meny"
                />
                <Marker
                    coordinate={{ latitude: 55.71251014181874, longitude: 12.562282262782249}}
                    title="Fakta"
                />
                <Marker
                    coordinate={{ latitude: 55.708399353598374, longitude: 12.561338124023488}}
                    title="Føtex"
                />
                <Marker
                    coordinate={{ latitude: 55.70987360480219, longitude: 12.562110599034112}}
                    title="Irma"
                />
                <Marker
                    coordinate={{ latitude: 55.71030818019704, longitude: 12.561552698373363}}
                    title="Netto"
                />
                <Marker
                    coordinate={{ latitude: 55.71162993716682, longitude: 12.56210088698033}}
                    title="Rema1000"
                />
            </MapView>
        </SafeAreaView>
    );
}

// Lokal styling til Map.js
const styles = StyleSheet.create({
    map: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
    },
});
