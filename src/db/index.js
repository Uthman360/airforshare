import { initializeApp } from "firebase/app";
import { getDatabase, set, ref, onValue, remove } from "firebase/database";
import {
    getStorage,
    ref as storageRef,
    uploadBytesResumable,
    getDownloadURL,

} from "firebase/storage";
const firebaseConfig = {
    apiKey: "AIzaSyCobkP8rChp12K75ks9zsXDRsnblr47C3E",
    authDomain: "airforshare-beff5.firebaseapp.com",
    databaseURL: "https://airforshare-beff5-default-rtdb.asia-southeast1.firebasedatabase.app/",
    projectId: "airforshare-beff5",
    storageBucket: "airforshare-beff5.appspot.com",
    messagingSenderId: "406009533055",
    appId: "1:406009533055:web:4613bb3c1a69450e0d654a",
    measurementId: "G-LRDTTP2YRN"
};

const app = initializeApp(firebaseConfig)
const db = getDatabase()
const storage = getStorage(app);

export {
    app,
    db,
    set,
    ref,
    onValue,
    remove,
    storage,
    storageRef,
    uploadBytesResumable,
    getDownloadURL,
    getStorage
}