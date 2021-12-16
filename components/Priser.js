import React from 'react';
import {Button, StyleSheet, Text, View, Switch} from 'react-native';
import { useState, useEffect } from 'react'

// Skal hente produkter fra GroceryList, der er tjekket af MED priser
// States sættes og en toggleSwitch defineres, så brugeren kan skifte mellem billigst(normale) og øko-priser
export default function Priser({route, navigation}){
    const [normalPrices, setNormalPrices] = useState([]);
    const [ecoPrices, setEcoPrices] = useState([]);
    // pricesToShow bruges til at holde styr på hvilken liste der skal vises. Hvis det er øko er pricesToShow = ecoPrices, hvis det er normale er pricesToShow = normalPrices
    const [pricesToShow, setPricesToShow] = useState([]);
    const [showEco, setShowEco] = useState(false);
    // funktion til at skifte state mellem øko og normale priser. Bruger staten ovenover.
    const toggleSwitch = () => {
        const newValue = !showEco
        setShowEco(newValue);
        setPricesToShow(newValue ? ecoPrices : normalPrices);
    }

    // henter selected products, og udregner samlet pris for alle supermarkeder - både for øko og normal
    useEffect(() => {
        const selectedProducts = route.params.selectedProducts;
        // reduce tager hvert element og trækker en given attribut ud fra dem - i øverste tilfælde rema1000. Laver denne om til et tal, og så lægger den sammen med den forrige. Og starter med 0.
        const rema1000Prices = selectedProducts.reduce((acc, curr) => acc + Number(curr.prices.normal.rema1000), 0);
        const faktaPrices = selectedProducts.reduce((acc, curr) => acc + Number(curr.prices.normal.fakta), 0);
        const menyPrices = selectedProducts.reduce((acc, curr) => acc + Number(curr.prices.normal.meny), 0);
        const irmaPrices = selectedProducts.reduce((acc, curr) => acc + Number(curr.prices.normal.irma), 0);
        const nettoPrices = selectedProducts.reduce((acc, curr) => acc + Number(curr.prices.normal.netto), 0);
        const fotexPrices = selectedProducts.reduce((acc, curr) => acc + Number(curr.prices.normal.fotex), 0);
        const normalPrices = [{name: "rema1000", price: rema1000Prices.toFixed(2)}, {name: "fakta", price: faktaPrices.toFixed(2)}, {name: "meny", price: menyPrices.toFixed(2)}, {name: "irma", price: irmaPrices.toFixed(2)}, {name: "netto", price: nettoPrices.toFixed(2)}, {name: "fotex", price: fotexPrices.toFixed(2)}];
        setNormalPrices(normalPrices);
        setPricesToShow(normalPrices); // vi defaulter til vise normale priser
        const rema1000PricesEco = selectedProducts.reduce((acc, curr) => acc + Number(curr.prices.eco.rema1000), 0);
        const faktaPricesEco = selectedProducts.reduce((acc, curr) => acc + Number(curr.prices.eco.fakta), 0);
        const menyPricesEco = selectedProducts.reduce((acc, curr) => acc + Number(curr.prices.eco.meny), 0);
        const irmaPricesEco = selectedProducts.reduce((acc, curr) => acc + Number(curr.prices.eco.irma), 0);
        const nettoPricesEco = selectedProducts.reduce((acc, curr) => acc + Number(curr.prices.eco.netto), 0);
        const fotexPricesEco = selectedProducts.reduce((acc, curr) => acc + Number(curr.prices.eco.fotex), 0);
        const ecoPrices = [{name: "rema1000", price: rema1000PricesEco}, {name: "fakta", price: faktaPricesEco.toFixed(2)}, {name: "meny", price: menyPricesEco.toFixed(2)}, {name: "irma", price: irmaPricesEco.toFixed(2)}, {name: "netto", price: nettoPricesEco.toFixed(2)}, {name: "fotex", price: fotexPricesEco.toFixed(2)}];
        setEcoPrices(ecoPrices);
    }, []); // Dette bruges for at undgå infinity loop. Se: https://stackoverflow.com/questions/53070970/infinite-loop-in-useeffect

    // returnerer det, der skal vises på siden
    return(
        <>
            <View style={styles.container}>
                <Text style={{color: "#5B757F", fontSize: 20, paddingBottom: 20}}> Samlet pris for hvert supermarked </Text>
                <Text style={{color: "#5B757F", fontSize: 15, paddingBottom: 10}}> Præferencer </Text>
                <View style={{flexDirection: 'row'}}>

                    {/*styler Switchen*/}
                    <Text>Normal</Text>
                    <Switch
                        trackColor={{ false: "#767577", true: "#81b0ff" }}
                        thumbColor={showEco ? "#5B757F" : "#5B757F"}
                        ios_backgroundColor="#3e3e3e"
                        onValueChange={toggleSwitch}
                        value={showEco}
                        />
                    <Text style={{paddingBottom: 60}}>Øko</Text>
                </View>

                {/*får priserne frem på skærmen*/}
                {pricesToShow.map((price, i) => {
                    return (
                        <Text key={i} style={styles.item}>{price.name}: {price.price}</Text>
                    )
                })}
            </View>

            {/*kort til maps */}
             <Button
                title="Se på kortet, hvor supermarkederne ligger"
                onPress={() => {
                   navigation.navigate('Maps')
                }}
            />
            </>
    );
}

// Lokal styling til Priser.js
const styles = StyleSheet.create({
    container: {
        paddingTop: 22,
        alignItems: "center",
        paddingBottom: 100,
    },
    item: {
        padding: 10,
        fontSize: 15,
    },
});