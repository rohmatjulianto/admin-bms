import firebase  from "firebase";

const firebaseConfig = {
    apiKey: "AIzaSyAoUAGkXlYL4NwfAYVpQjAcrO1_4iU5MAE",
    authDomain: "wecrash-f8914.firebaseapp.com",
    databaseURL: "https://wecrash-f8914.firebaseio.com",
    projectId: "wecrash-f8914",
    storageBucket: "wecrash-f8914.appspot.com",
    messagingSenderId: "790449056419",
    appId: "1:790449056419:web:8c479751eb43bfb087ed16",
    measurementId: "G-W2YZ1G6588"
};

const app = firebase.initializeApp(firebaseConfig);

export const db = app.database();
export const storage = app.storage();
export const namesRef = db.ref("logo"); 