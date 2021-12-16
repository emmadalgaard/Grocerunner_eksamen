// Lavet ud fra øvelse i undervisningen
import React, {useState} from 'react';
import { Button, StyleSheet, Text, View, TextInput } from 'react-native';
import firebase from "firebase";

export default function SignUpForm() {
    // state variabler, der skal benyttes for at signe up.
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState(null);

    /* laver en brugeroprettelsesknap - handleSubmit aktivere en brugeroprettelse i firebase*/
    const userButton = () => {
        return <Button color="black" onPress={() => handleSubmit()} title="Opret bruger" />;
    }

    // createUserWithEmailAndPassword er en prædefineret metode af firebase,som eksekverer en brugeroprettelse
    // Hvis fejl, fanges de i en fejlbesked
    const handleSubmit = async() => {
        try {
            await firebase.auth().createUserWithEmailAndPassword(email, password).then((data) => {
            });
        } catch (error) {
            setErrorMessage(error.message)
        }
    }
    // inputfelter til at indtaste mail og password
    // Gejlbesked udskrives, hvis fejl i inputs
    return(
        <View>
            <Text style = {styles.header}> Ny bruger? </Text>
            <TextInput
                placeholder="email"
                value={email}
                onChangeText={(email) => setEmail(email)}
                style={styles.inputField}
            />
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

// Lokal styling
const styles = StyleSheet.create({
    header: {
        color: "black",
        fontWeight: "bold",
        fontSize: 15,
        paddingTop: 10,
        textAlign: "left"
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