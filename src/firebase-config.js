import { initializeApp } from 'firebase/app';

const firebaseConfig = {
    apiKey: "**********************",
    authDomain: "**********************",
    projectId: "**********************",
    storageBucket: "**********************",
    messagingSenderId: "**********************",
    appId: "**********************",
    measurementId: "**********************"
};

export function createApp() {
    let app;
	if(!app) {
        app = initializeApp(firebaseConfig);
    }
    return app;
};
