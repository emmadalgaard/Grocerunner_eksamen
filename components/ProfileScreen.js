// LAvet ud fra øvelse i undervisningen
import * as React from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import firebase from "firebase";

// log ud funktion, så brugeren kan logge ud og firbase tjekker med authentication og logger ud.
export default function ProfileScreen() {
    const logOut = async () => {
        await firebase.auth().signOut();
    }

    // Returner View på siden med firebase prædefineret metode, som tjekker current user med authentication
    return (
        <>
        <View>
        <Text style={{textAlign: "center", fontSize: 20, paddingTop: 30, paddingBottom: 10, backgroundColor: "white"}}> Profil </Text>
        </View>
        <View style={styles.container} >
            <Text style={{paddingBottom: 20}}>Current user: {firebase.auth().currentUser.email}</Text>
            <Button color="black" onPress={() => logOut()} title="Log out" />
        </View>
        </>
    );
}
// Lokal styling til ProfileScreen.js
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: "#B7C3C7",
        padding: 8,
    },
});

