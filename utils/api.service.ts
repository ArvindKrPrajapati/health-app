const url = "https://us-central1-health-app-3c1fe.cloudfunctions.net/";
import { collection, addDoc, where, getDocs, query, setDoc, doc } from 'firebase/firestore/lite';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { db } from './firebase-config';

const common = (data, method, token) => {
    if (method === "GET") {
        return {
            method,
            headers: {
                'Authorization': 'Bearer ' + token
            }
        }
    }
    if (token) {
        return {
            method,
            body: JSON.stringify(data),
            headers: {
                "content-type": "application/json",
                'Authorization': 'Bearer ' + token
            }
        }
    }


    return {
        method,
        body: JSON.stringify(data),
        headers: {
            "content-type": "application/json"
        }
    }
}

const _login = async (email: string, password: string) => {
    try {
        // const res = await fetch(url + "signUp", common({ email, password }, "POST", ""))
        const res = true;
        if (res) {
            const coach = collection(db, 'coach');
            const filter = where('email', '==', email);
            const snapshot = await getDocs(query(coach, filter));
            let user = snapshot.docs[0]?.data()
            if (!user) {
                return { login: false }
            }
            user = { ...user, id: snapshot.docs[0].id }
            await AsyncStorage.setItem("LOGGED_IN_USER", JSON.stringify(user))
            return { login: true }
        } else {
            return { login: false }
        }

    } catch (error) {
        console.log(error)
    }
}
const _signup = async (name: string, password: string, email: string, mobile: string) => {
    try {
        // const res = await fetch(url + "signUp", common({ email, password }, "POST", ""))
        const res = true;
        if (res) {
            const fbRes = await addDoc(collection(db, "coach"), { email, mobile, name })
            if (fbRes?.id) {
                await setDoc(doc(db, "userChats", fbRes.id), {})
                const user = { name, email, mobile, id: fbRes.id }
                await AsyncStorage.setItem("LOGGED_IN_USER", JSON.stringify(user))
                console.log(user);

                return { signup: true }
            }
            return { signup: false }
        } else {
            return { signup: false }
        }

    } catch (error) {
        console.log(error)
    }
}

const createCombinedId = (myId, userId) => {
    return myId > userId ? myId + userId : userId + myId
}

export { _login, _signup, createCombinedId }