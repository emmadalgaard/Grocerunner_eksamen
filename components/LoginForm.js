// Filen er lavet ud fra øvelse i undervisningen
import React, {useState} from 'react';
import { Button, StyleSheet, Text, View, TextInput } from 'react-native';
import firebase from "firebase";

// Opretter en login-funktion
export default function LoginForm() {
    // Statevariabler, der skal bruges til at logge ind
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isCompleted, setCompleted] = useState(false);
    const [errorMessage, setErrorMessage] = useState(null);

    /* laver en loginknap - handleSubmit aktiverer login i firebase*/
    const userButton = () => {
        return <Button color="black" onPress={() => handleSubmit()} title="Login"/>;
    }

    // signInWithEmailAndPassword er en firebase-metode, der eksekverer login, og authentication - hvis der opstår fejl, catches de
    const handleSubmit = async () => {
        try {
            await firebase.auth().signInWithEmailAndPassword(email, password).then((data) => {
            });
        } catch (error) {
            setErrorMessage(error.message)
        }
    }

    // inputfelter til at brugeren kan indtaste loginoplysninger
    // Hvis fejl, sendes en fejlbesked
    return (
        <View>
            <Text style = {styles.header1}> Email </Text>
            <TextInput
                placeholder="email"
                value={email}
                onChangeText={(email) => setEmail(email)}
                style={styles.inputField}
            />
            <Text style = {styles.header2}> Password </Text>
            <TextInput
                placeholder="password"
                value={password}
                onChangeText={(password) => setPassword(password)}
                secureTextEntry
                style={styles.inputField}
            />
            {errorMessage && (
                <Text style={styles.error}>Error: {errorMessage}</Text>
            )}
            {userButton()}
        </View>
    );
}

// Lokal styling til LoginForm.js
const styles = StyleSheet.create({
    header1: {
        color: "black",
        fontWeight: "bold",
        fontSize: 15,
        paddingTop: 20,
        textAlign: "left"
    },
    header2: {
        color: "black",
        fontWeight: "bold",
        fontSize: 15,
        paddingTop: 10,
        textAlign: "left",
    },
    inputField: {
        width: 300,
        padding: 10,
        borderWidth:1,
        margin:2,
    },
    error: {
        color: "red",
    }
});