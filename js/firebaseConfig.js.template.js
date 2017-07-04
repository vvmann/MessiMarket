// Initialize Firebase
// TODO: Replace with your project's customized code snippet
var config = {
    apiKey: "<API_KEY>",
    authDomain: "<PROJECT_ID>.firebaseapp.com",
    databaseURL: "https://<DATABASE_NAME>.firebaseio.com",
    storageBucket: "<BUCKET>.appspot.com",
    messagingSenderId: "<SENDER_ID>",
};
firebase.initializeApp(config);

firebase.auth().signInWithEmailAndPassword("username", "password").catch(function(error) {
    // Handle Errors here.
    console.log("ERROR ERROR PUERTO RICO!");
    var errorCode = error.code;
    var errorMessage = error.message;
    console.log("code: " + errorCode + ", message: " + errorMessage);
    console.log(app);
});
