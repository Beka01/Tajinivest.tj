// Your web app's Firebase configuration
	// For Firebase JS SDK v7.20.0 and later, measurementId is optional
	var firebaseConfig = {
		apiKey: "AIzaSyBMLcSR6ZjtTIgI_-5b8QqDY_TgaBiJ9DQ",
		authDomain: "tajinvest-a77b7.firebaseapp.com",
		databaseURL: "https://tajinvest-a77b7.firebaseio.com",
		projectId: "tajinvest-a77b7",
		storageBucket: "tajinvest-a77b7.appspot.com",
		messagingSenderId: "257184881910",
		appId: "1:257184881910:web:ce9dccac5a8af6e25a20d7",
		measurementId: "G-7EETR5324V"
	};
	// Initialize Firebase
	firebase.initializeApp(firebaseConfig);
	firebase.analytics();
	// auth and firestore references
	const auth = firebase.auth();
	const dbFire = firebase.firestore();
	//const rootRef = database.ref('main-sectors');

	//update firestore settings
	dbFire.settings({ timestampsInSnapshot: true});