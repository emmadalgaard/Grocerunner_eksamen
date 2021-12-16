const csv = require('csv-parser')
const fs = require('fs')
const firebase = require("firebase");
const results = [];

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: 'AIzaSyClQWnEQTL39vKXBGg9LrK4Xu9f8-MpX1I',
    authDomain: 'godkendelse-b7742.firebaseapp.com',
    databaseURL: 'https:// godkendelse-b7742-default-rtdb.firebaseio.com',
    projectId: 'godkendelse-b7742',
    storageBucket: 'godkendelse-b7742.appspot.com',
    messagingSenderId: '933884807969',
    appId: '1:933884807969:web:df0f908eee62a1578ecc60'
}

// sikrer at der kun initieres én firebase
if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig)
}

fs.createReadStream('./priser.csv')
    .pipe(csv({separator: ';'}))
    .on('data', (data) => {
        const newProduct = {
            name: data['﻿name'],
            prices: {
                normal: {
                    "rema1000": data.rema1000,
                    "fakta": data.fakta,
                    "meny": data.meny,
                    "irma": data.irma,
                    "netto": data.netto,
                    "fotex": data.fotex,
                },
                eco: {
                    "rema1000": data.rema1000_eco,
                    "fakta": data.fakta_eco,
                    "meny": data.meny_eco,
                    "irma": data.irma_eco,
                    "netto": data.netto_eco,
                    "fotex": data.fakta_eco,
                },
            },
            imageId: data['﻿name'].split(' ')[0].toLowerCase()
        }

        results.push(newProduct)


    })
    .on('end', () => {
        firebase.auth()
        firebase
            .database()
            .ref('/Items/')
            .set({})
        for(let i = 0; i<results.length; i++) {
            const element = results[i];
            const ref = firebase
                .database()
                .ref('/Items/')
                .push(element)
        }
    });



