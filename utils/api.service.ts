const url = "https://us-central1-health-app-3c1fe.cloudfunctions.net/";
import { collection, addDoc } from 'firebase/firestore/lite';
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
        console.log(email, password);

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
        }

    } catch (error) {
        console.log(error)
    }
}

export { _login, _signup }