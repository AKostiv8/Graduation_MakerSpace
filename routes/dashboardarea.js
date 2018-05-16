/**
 * Created by Anastasiia on 25.03.2018.
 */

const firebase = require('firebase');
const config = require('../config/database');
firebase.initializeApp(config);
const jwt = require('jsonwebtoken');


module.exports = (router) => {
    router.post('/register', (req, res) => {
        if(!req.body.email){
            res.json({ success: false, message: 'You must provide a valid e-mail' });
        } else {
            // var userRef = firebase.database().ref('users/');
            //     userRef.once("value").then(function(snapshot) {
            //         var emailExist = snapshot.child('email').val();
            //         console.log(emailExist);
            // });
            if(!req.body.password){
                res.json({ success: false, message: 'You must provide a password'});
            } else {
                if (!req.body.username) {
                    res.json({success: false, message: 'You must provide an username'});
                } else {
                    if (!req.body.phoneNumber) {
                        res.json({success: false, message: 'You must provide a telephone number'});
                    } else {

                        firebase.auth().createUserWithEmailAndPassword(req.body.email, req.body.password).then(function(userData){
                            console.log("Successfully created");
                            console.log("Successfully created user with uid:", userData.uid);
                            var user = {
                                uid: userData.uid,
                                email: req.body.email,
                                password: req.body.password,
                                username: req.body.username,
                                phoneNumber: req.body.phoneNumber
                            }

                            var key = userData.uid;
                            var userRef = firebase.database().ref('users/' + key);

                            userRef.set(user);
                            res.json({success: true, message: 'Account registered!'});
                            console.log('Success!');
                        }).catch(function(error) {
                            console.log("Started 2...");
                            if(error){
                                var errorCode = error.code;
                                var errorMessage = error.message;
                                res.json({success: false, message: 'The email address is already in use by another account.'});
                                console.log("Error creating user: ", error, errorCode);
                            } else { }

                        });


                    }
                }
            }
        }

    });


    router.post('/authentication', (req, res) => {
        if(!req.body.email){
            res.json({success: false, message: 'No email was provided'});
        } else {
            if(!req.body.password){
                res.json({success: false, message: 'No password was provided'});
            } else {
                firebase.auth().signInWithEmailAndPassword(req.body.email, req.body.password).then(function(firebaseUser) {
                    var userRef = firebase.database().ref('users/');
                    var userId = firebase.auth().currentUser.uid;

                    const token = jwt.sign({
                        userId: userId
                    }, config.secret, { expiresIn: '48h'});

                    firebase.database().ref('users/' + userId + '/').once('value').then(function(snapshot) {
                        var username = (snapshot.val() && snapshot.val().username) || 'Anonymous';
                        console.log(username)

                        res.json({success: true, message: 'Success!', token: token, user: { username: username }});
                    });


                    console.log('User signed in!');
                }).catch(function(error) {
                    // Handle Errors here.
                    console.log("Started 2...");
                    if(error){
                        var errorCode = error.code;
                        var errorMessage = error.message;
                        res.json({success: false, message: 'The password is invalid or the user does not exist.'});
                        console.log("Error user: ", error);
                    } else {}

                });
            }
        }



});

    router.use((req, res, next) => {
        const token = req.headers['authorization']; // Create token found in headers
    // Check if token was found in headers
    if (!token) {
        res.json({ success: false, message: 'No token provided' }); // Return error
    } else {
        // Verify the token is valid
        jwt.verify(token, config.secret, (err, decoded) => {
            // Check if error is expired or invalid
            if (err) {
                res.json({ success: false, message: 'Token invalid: ' + err }); // Return error for token validation
            } else {
                req.decoded = decoded; // Create global variable to use in any request beyond
        next(); // Exit middleware
    }
    });
    }
});




    return router;

}
