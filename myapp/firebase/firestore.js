import { collection, addDoc, doc, getDoc, setDoc, updateDoc, arrayUnion, arrayRemove, deleteDoc } from "firebase/firestore";
import { auth, firestore } from "./firebase-setup";

export const createUserToDB = async (data) => {
    console.log("Write User to DB in firestore.js for user ID: ", auth.currentUser.uid)
    try {
        await setDoc(doc(firestore, "users", auth.currentUser.uid), {
            username: data.username,
            email: data.email,
            location: "null",

        });
        console.log("Create User in db sucessfully. Users' data is: ", data)
    } catch (error) {
        console.log("Error when writing into db", error)
    }
}

export async function writeUserProfileToDB(profileData) {
    try {
        const docRef = await updateDoc(doc(firestore, "users", profileData.key), {
            username: profileData.username,
            gender: profileData.gender,
        });
    } catch (err) {
        console.log(err);
    }
}

export async function saveUser(user) {
    try {
        await updateDoc(doc(firestore, "users", auth.currentUser.uid), {
            country: user.country,
            location: user.location
        });
        console.log('update country and location success')
    } catch (err) {
        console.log("save user ", err);
    }
}

export async function deleteFromDB(key) {
    try {
        await deleteDoc(doc(firestore, "recipes", key));
    } catch (err) {
        console.log(err);
    }
}

export async function getUser() {
    try {
        const docRef = doc(firestore, "users", auth.currentUser.uid);
        const docSnap = await getDoc(docRef);
        console.log("Cached document data:", docSnap.data());

    } catch (err) {
        console.log(err);
    }
}

export const uploadRecipeToDB = async (recipe) => {
    try {
        await addDoc(collection(firestore, "recipes"), {
            ...recipe,
            user: auth.currentUser.uid,
            like: 28,

        });
    } catch (error) {
        console.log("Error when writing into db", error)
    }
}

export const uploadDogToDB = async (recipe) => {
    try {
        await addDoc(collection(firestore, "dogs"), {
            ...recipe,
            user: auth.currentUser.uid,
        });
    } catch (error) {
        console.log("Error when writing into db", error)
    }
}



