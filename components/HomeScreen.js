import {Button, Image, StyleSheet, Text, View, ScrollView, Pressable} from "react-native";
import * as React from "react";
import {NavigationContainer} from "@react-navigation/native";
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import Ionicons from "react-native-vector-icons/Ionicons";
import {Linking} from "react-native";
import { createStackNavigator } from '@react-navigation/stack';
import {useState} from "react";
import Modal from "react-native-modal";

// Importerer komponenter
import ProfileScreen from "./ProfileScreen";
import GroceryList from "./GroceryList";
import Kurv from './Kurv';
import Priser from './Priser';
import Map from './Map';


// Laver en stacknavigator for knappen Liste i navigationen og pop-up screen Modal
const Stack = createStackNavigator();
const stackNavigation = () =>{
  return (
    <Stack.Navigator>
        <Stack.Screen name="Indkøbsliste" component={GroceryList} />
        <Stack.Screen name="Kurv" component={Kurv} />
        <Stack.Screen name="Priser" component={Priser} />
        <Stack.Screen name="Maps" component={Map} />
    </Stack.Navigator>
  );
}

// Importerer billeder
import pandekager from "../Pictures/Pandekager.jpg";
import gnocchi from "../Pictures/Gnocchi.jpg";
import paella from "../Pictures/Paella.jpg";
import dahl from "../Pictures/dahl.jpg";
import pasta from "../Pictures/pasta.png"
import snurrer from "../Pictures/snurrer.png"

// på HomeScreen laves en pop-up, der kommer frem ved login. Modal bruges som component til at vise content på eksisterende view
// Modal er lavet med inspiration fra: https:// github.com/react-native-modal/react-native-modal
function HomeScreen() {
    const [isModalVisible, setModalVisible] = useState(true);
    const toggleModal = () => {
        setModalVisible(!isModalVisible);}
        return (
        // returnerer pop-uppen og giver den text og styling
        //<> fragments lader mig gruppere en liste af children uden at tilføje ekstra nodes
        // https:// reactjs.org/blog/2017/11/28/react-v16.2.0-fragment-support.html
        // gør modal synlig og transparent, så man stadig kan ane baggrunden. Knappen "Videre til appen" lukker modal igen
        <>
            <Modal isVisible={isModalVisible} transparent={true}>
                    <View style={{backgroundColor: "white"}}>
                        <View style={{margin: 'auto', padding: 15}}>
                            <Text style={{textAlign: "center", color: '#5B757F', fontSize: 20, paddingTop: 20}}> Vejledning til navigationen  </Text>
                            <Text style={{fontSize: 15, paddingBottom: 10, paddingTop: 20}}> - Hjem viser en side med inspiration til madlavning, hvor man kan klikke ind på forksellige opskrifter, hvorefter man navigeres videre til Safari </Text>
                            <Text style={{fontSize: 15, paddingBottom: 10, paddingTop: 20}}> - Liste består af dagligvarer, man kan tilføje til sin kurv, og dermed danne sin indkøbsliste. Ydermere kan man få et overblik over samlet pris for hvert supermarked. Til sidst kan man klikke sig hen på et kort, hvorpå supermarkederne kan ses </Text>
                            <Text style={{fontSize: 15, paddingBottom: 10, paddingTop: 20}}> - Profil består af brugerens profil, som indeholder en log-ud knap </Text>
                            <Button title="Videre til appen" onPress={toggleModal}/>
                        </View>
                    </View>
                </Modal>

            {/*Hjælpetekst øverst på siden*/}
            <View>
                <Text style={{fontSize: 30, textAlign: "center", paddingTop: 40, color: "#5B757F"}}> Inspiration til Madlavning </Text>
                <Text style = {styles.klik}> Klik på billederne for at gå ind på opskriften</Text>
            </View>

            {/*scrollview oprettes for, at man ikke kan trykke ind på billederne ved at scrolle, men skal trykke lige på
            Linking bruges til at henvise til browseren ved onPress på billedet*/}
            <ScrollView style={styles.scrollView}>
                    <View style={styles.container}>
                        <Pressable style={{flex:1}}
                            onPress={() => Linking.openURL('https://mummum.dk/indisk-dahl/')}>
                            <Image source={dahl} style={{width:'100%', height: 200}}/>
                        </Pressable>

                        <Pressable style={{flex:1}}
                            onPress={() => Linking.openURL("https://madsvin.com/pandekager/")}>
                            <Image source={pandekager} style={{width:'100%', height: 200}}/>
                        </Pressable>
                    </View>

                    <View style={styles.container}>
                        <Pressable style={{flex:1}}
                            onPress={() => Linking.openURL("https://www.louiogbearnaisen.dk/2020/09/gnocchi.html")}>
                            <Image source={gnocchi} style={{width:'100%', height: 200}}/>
                        </Pressable>

                        <Pressable style={{flex:1}}
                            onPress={() => Linking.openURL("https://madogmonopolet.dk/paelle-opskrift/")}>
                            <Image source={paella} style={{width:'100%', height: 200}}/>
                        </Pressable>
                    </View>

                    <View style={styles.container}>
                        <Pressable style={{flex:1}}
                            onPress={() => Linking.openURL("https://vegetariskhverdag.dk/2020/05/pasta-med-groenkaal-aerter-urter/")}>
                            <Image source={pasta} style={{width:'100%', height: 200}}/>
                        </Pressable>

                        <Pressable style={{flex:1}}
                            onPress={() => {
                                Linking.openURL("https://kiinus.dk/nem-opskrift-paa-de-bedste-kardemommesnurrer/");
                            }}>
                            <Image source={snurrer} style={{width:'100%', height: 200}}/>
                        </Pressable>
                    </View>
            </ScrollView>

            {/*Hjælpetekst nederst på siden*/}
            <View>
                <Text style={{textAlign: "center", paddingBottom: 15, paddingTop: 15}}> Opret din indkøbsliste ved at klikke på Liste nedenfor </Text>
            </View>
        </>
    )
}

// tab navigator for HomeScreen, GroceryList og Profile
// Navigationen er lavet ud fra øvelse i undervisning
const Tab = createBottomTabNavigator();

// Ionicons bruges til at vise små ikoner på navigatoren - de kommer med en størrelse og farve, bestemt af React Native
export default function Nav() {
    return (
        <NavigationContainer>
            <Tab.Navigator screenOptions={({ route }) => ({
                tabBarIcon: ({ color, size }) => {
                    if (route.name === 'Hjem') {
                        return (
                            <Ionicons
                                name={'home-outline'}
                                size={size}
                                color={color}
                            />
                        );
                    } else if (route.name === 'Liste') {
                        return (
                            <Ionicons
                                name='md-list-outline'
                                size={size}
                                color={color}
                            />
                        );
                    }
                    else{
                        return (
                            <Ionicons
                                name='person-outline'
                                size={size}
                                color={color}
                            />
                        );
                    }
                },
            })}
                           // farverne på ikonerne, når man henholdvis er inde på den side eller ej.
                           screenOption={{
                               "tabBarActiveTintColor": "blue",
                               "tabBarInactiveTintColor": "gray",
                               "tabBarStyle": [
                           {
                               "display": "flex"
                           },
                               null
                               ]
                           }}
            >
            {/*Indsætter komponenterne til navigateren*/}
                <Tab.Screen name="Hjem" component={HomeScreen}/>
                <Tab.Screen name="Liste" component={stackNavigation}/>
                <Tab.Screen name="Profil" component={ProfileScreen}/>
            </Tab.Navigator>
        </NavigationContainer>
    );
}

// Lokal styling til HomeScreen.js
const styles = StyleSheet.create({
    klik: {
        paddingTop: 10,
        paddingBottom: 5,
        textAlign: "center",
        color: "#5B757F",
        fontSize: 15
    },
    container: {
        flexDirection: "row",
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingTop: 4,
        paddingLeft: 4,
        paddingRight: 4,
        display: 'flex',
    },
    text: {
        fontSize: 20,
    },
    pictures: {
        display: "flex",
    }
});