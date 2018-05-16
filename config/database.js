/**
 * Created by MakerSpace on 24.02.2018.
 */

const crypto = require('crypto').randomBytes(256).toString('hex');


module.exports = {
    apiKey: "AIzaSyBGwg5hAT4ABbppZbkKpWdl36l0HFZ3gC8",
    authDomain: "makerspace-b61c0.firebaseapp.com",
    databaseURL: "https://makerspace-b61c0.firebaseio.com",
    projectId: "makerspace-b61c0",
    storageBucket: "makerspace-b61c0.appspot.com",
    messagingSenderId: "161463253412",
    secret: crypto
}
