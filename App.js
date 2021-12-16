import { StatusBar } from 'expo-status-bar'
import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View, Image, ScrollView, KeyboardAvoidingView, Platform } from 'react-native'
import firebase from 'firebase'
import cart from './Pictures/cart.png'
import {createStackNavigator} from "@react-navigation/stack";

// Importerer komponenter
import SignUpForm from './components/SignUpForm'
import LoginForm from './components/LoginForm'
import HomeScreen from './components/HomeScreen'

// Your web app's Firebase configuration
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyClQWnEQTL39vKXBGg9LrK4Xu9f8-MpX1I',
  authDomain: 'godkendelse-b7742.firebaseapp.com',
  databaseURL: 'https://godkendelse-b7742-default-rtdb.firebaseio.com',
  projectId: 'godkendelse-b7742',
  storageBucket: 'godkendelse-b7742.appspot.com',
  messagingSenderId: '933884807969',
  appId: '1:933884807969:web:df0f908eee62a1578ecc60'
}

export default function App () {
  // opretter bruger variablen
  const [user, setUser] = useState({ loggedIn: false })

  // sikrer at der kun initieres én firebase
  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig)
  }

  // https://johnwcassidy.medium.com/firebase-authentication-hooks-and-context-d0e47395f402
  function onAuthStateChange (callback) {
    return firebase.auth().onAuthStateChanged(user => {
      if (user) {
        callback({ loggedIn: true, user: user })
      } else {
        callback({ loggedIn: false })
      }
    })
  }

  // ohnwcassidy.medium.com/firebase-authentication-hooks-and-context-d0e47395f402
  useEffect(() => {
    const unsubscribe = onAuthStateChange(setUser)
    return () => {
      unsubscribe()
    }
  }, [])

  // Starsiden oprettes, som består af login og signup
  const StartPage = () => {
    return (
        <KeyboardAvoidingView style={{ flex: 1, flexDirection: 'column',justifyContent: 'center',}} behavior={Platform.OS === "ios" ? "padding" : "height"}>
            <ScrollView>
                    <View /* Tastaturet går væk, når man trykker på skærmen - taget fra: https://reactnative.dev/docs/keyboardavoidingview */
                        style={styles.container}>
                        <Image source={cart} style={{ width: 220, height: 285, marginLeft: 40 }} />
                        <Text style = {styles.title}> GROCERUNNER </Text>
                        <StatusBar style="auto" />
                        <LoginForm/>
                        <SignUpForm/>
                    </View>
            </ScrollView>
        </KeyboardAvoidingView>
    )
  }
  // når der er logget ind skal den gå til hjemside, og hvis ikke blive på startside
  return user.loggedIn ? <HomeScreen/> : <StartPage/>
}

// lokal styling
const styles = StyleSheet.create({
  container: {
    backgroundColor: '#B7C3C7',
    alignItems: 'center',
    paddingTop: 20,
    paddingBottom: 20
  },
  scrollView: {
    backgroundColor: '#B7C3C7'
  },
  title: {
    color: '#5B757F',
    fontWeight: 'normal',
    fontSize: 40,
    paddingTop: 20,
    textAlign: 'center'
  },
  paragraph: {
    margin: 24,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center'
  }
})
