import {
    Button,
    Image,
    StyleSheet,
    Text,
    View,
    ScrollView,
} from 'react-native'
import React, { useState, useEffect } from 'react'
import BouncyCheckbox from "react-native-bouncy-checkbox";
import firebase from 'firebase'
import { TouchableHighlight } from 'react-native-gesture-handler';

// Importerer billeder af varerne
import skivet from "../Pictures/Varer/skivet.png"
import hakket from "../Pictures/Varer/hakket.png"
import kyllingebrystfillet from "../Pictures/Varer/kyllingebrystfillet.png"
import skinke from "../Pictures/Varer/skinke.png"
import tomatocan from "../Pictures/Varer/tomatocan.png"
import milk from "../Pictures/Varer/milk.png"
import egg from "../Pictures/Varer/egg.png"
import butter from "../Pictures/Varer/butter.png"
import yoghurt from "../Pictures/Varer/yoghurt.png"
import leverpostej from "../Pictures/Varer/leverpostej.png"
import apple from "../Pictures/Varer/apple.png"
import tomater from "../Pictures/Varer/tomater.png"
import agurk from "../Pictures/Varer/agurk.png"
import onion from "../Pictures/Varer/onion.png"
import kartofler from "../Pictures/Varer/kartofler.png"
import carrots from "../Pictures/Varer/carrots.png"
import havregryn from "../Pictures/Varer/havregryn.png"
import hvedemel from "../Pictures/Varer/hvedemel.png"
import spaghetti from "../Pictures/Varer/spaghetti.png"
import sukker from "../Pictures/Varer/sukker.png"
import ris from "../Pictures/Varer/ris.png"
import appelsinjuice from "../Pictures/Varer/appelsinjuice.png"
import kaffe from "../Pictures/Varer/kaffe.png"
import tebreve from "../Pictures/Varer/tebreve.png"
import bananer from "../Pictures/Varer/bananer.png"
import universal from "../Pictures/Varer/universal.png"
import toiletpapir from "../Pictures/Varer/toiletpapir.png"
import tandpasta from "../Pictures/Varer/tandpasta.png"
import flydende from "../Pictures/Varer/flydende.png"
import coca from "../Pictures/Varer/coca.png"
import tun from "../Pictures/Varer/tun.png"

// Definerer billederne ved starten af deres beskrivelse fra csv filen, og giver dem billeder.
// Dette er lavet, s?? vi kan vise billederne dynamisk ud fra produktets imageId
const images = {
    "skivet": skivet,
    "hakket": hakket,
    "kyllingebrystfillet":kyllingebrystfillet,
    "skivesk??ret":skinke,
    "d??setomater": tomatocan,
    "minim??lk":milk,
    "??g":egg,
    "sm??rtbart":butter,
    "yoghurt":yoghurt,
    "leverpostej":leverpostej,
    "??bler":apple,
    "tomater":tomater,
    "agurk":agurk,
    "l??g":onion,
    "kartofler":kartofler,
    "guler??dder":carrots,
    "havregryn":havregryn,
    "hvedemel":hvedemel,
    "spaghetti":spaghetti,
    "sukker":sukker,
    "ris":ris,
    "appelsinjuice":appelsinjuice,
    "kaffe":kaffe,
    "tebreve":tebreve,
    "bananer":bananer,
    "universalreng??ring":universal,
    "toiletpapir":toiletpapir,
    "tandpasta":tandpasta,
    "flydende":flydende,
    "coca":coca,
    "tun":tun,
}

// Extender komponenten for at lave en checkbox-komponent, der g??r det muligt at v??lge til og fra
// Komponenter g??r det muligt at splitte interfacen op i uafh??ngige dele
// constructoren tager en signle property - super er parent class constructor (React.Component)
// Hvis den parset props ikke er valgt, skal bouncyCheckBox v??re tom
class CheckBoxComponent extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            isSelected: false
        }
        this.bouncyCheckboxRef = null;
    }

    // vi skal render, n??r vi har brugt React.Component for at opdatere og rende det p?? siden
    // Returner hvad der skal vises p?? siden - touchableHighlight g??r det muligt at trykke p?? billederne for at krydse checkbox af
    render() {
        return (
            <View style={{width:"50%", textAlign: 'center', background: 'white', alignItems: "center"}}>
                <TouchableHighlight
                    onPress={() => {
                        this.setState({ isSelected: !this.state.isSelected })
                        this.props.product.isSelected = !this.props.product.isSelected
                        }}
                    underlayColor="lightgray"
                >
                    {/*Checkboxen s??ttes med billeder og styles*/}
                    <View style={styles.checkBoxContainer} >
                        <Image source={images[this.props.product.imageId]} style={{width: 100, height: 100, margin: "auto"}}/>
                        <BouncyCheckbox style={styles.checkBox}
                                        fillColor="#5B757F"
                            isChecked={this.state.isSelected}
                            ref={(ref) => (this.bouncyCheckboxRef = ref)} // ref bruges for at s??tte en reference til checkboxen, s?? den kan ??ndre sine state uden for sit eget komponent. 
                            disableBuiltInState // se ovenst??ende. 
                        />
                        <Text style={styles.checkBoxText}>{this.props.name}</Text>
                    </View>
                </TouchableHighlight>
            </View>
        )
    }

}
// Henter varerne fra databasen og s??tter dem p?? siden
export default function GroceryList ({navigation}) {
    [products, setProducts] = useState([])
    useEffect(() => {
        // Henter varerne fra databasen
            firebase
                .database()
                .ref('/Items')
                .on('value', snapshot => {
                    const products = [];
                    const s = snapshot.val()
                    // firebase returnere et object af produkter, som vi konverterer til en array
                    Object.keys(s).forEach((key) => {
                        products.push(s[key])
                    });
                    const mapped = products.map(p => {
                        return {
                                ...p,
                                isSelected: false,
                        }
                        // vi s??tter isSelected til false, p?? alle produkter
                    })
                    setProducts(mapped);

                });
    },[]);

  // Returner scrollView, s?? man kan scrolle ned gennem produkterne - Alt info s??ttes, s?? det kan tages med videre til priser
  return (
    <>
      <ScrollView>
        <Text style={styles.klik}> Klik p?? billederne for at tilf??je dem til din liste</Text>
        <View style={styles.container}>
            {/* For hvert produkt laver vi et checkbox component, s?? man kan trykke p?? hele objektet */}
            {products.map((product, index) => (
               <CheckBoxComponent
                key={index}
                name={product.name}
                isSelected={product.isSelected}
                product={product}
                prices={product.prices}                
               />
            ))}
        </View>
      </ScrollView>

        {/*laver en knap til kurven, hvor de valgte produkter sendes med*/}
      <Button
        title="Gem liste og g?? til kurv"
        onPress={() => {
            // Henter alle produkter, hvor isSelected er true
            const selectedProducts = products.filter(product => product.isSelected)
            navigation.navigate('Kurv', {selectedProducts})
        }}
      />
    </>
  )
}

// Lokal styling for GroceryList
const styles = StyleSheet.create({
  klik: {
      paddingTop: 15,
      paddingBottom: 15,
      textAlign: 'center',
      fontSize: 15,
      color: '#5B757F'
  },
    scrollView: {
        width: "100%",
        alignContent: "center"
  },
    container: {
      flexDirection: "row",
      flexWrap: "wrap",
      display: 'flex',
        alignContent: "center"
  },
  text: {
      fontSize: 20
  },
  checkBoxText: {
      fontSize: 9,
      paddingBottom: 20,
      paddingTop: 0
  },
  checkBox: {
      paddingBottom: 10,
      alignSelf: "center",
    },
})
