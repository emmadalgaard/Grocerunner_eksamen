import React from 'react';
import {Button, StyleSheet, Text, View} from 'react-native';
import { useState, useEffect } from 'react'

// Hente produkter fra GroceryList, der er tjekket af
export default function Kurv({route, navigation}){
    const [selectedProducts, setSelectedProducts] = useState([]);
    useEffect(() => {
        setSelectedProducts(route.params.selectedProducts);

        /*Når vi forlader screen, tøm object*/
        return () => {
            setSelectedProducts([]);
        }
    });
    // Returnerer de selectede produkter med navn
        return(
            <>
                <View style={styles.container}>
                    {selectedProducts.map((product, index) => (<Text style={styles.item} key={index}>{product.name}</Text>))}
                </View>

                {/*Knap til samlede priser for hvert supermarked, hvor de selectede produkter sendes med*/}
                <Button
                    title="Udregn samlet pris for hvert supermarked"
                    onPress={() => {
                        navigation.navigate('Priser', {selectedProducts})
                    }}
                />
            </>
        );
}

// Lokal styling til Kurv.js
const styles = StyleSheet.create({
    container: {
        paddingTop: 20,
        backgroundColor: '#B7C3C7',
        flex: 1,
        alignItems: "center",
    },
    item: {
        paddingTop: 15,
        fontSize: 15,
    },
});