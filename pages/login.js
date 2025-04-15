import { useState } from "react";
import Axios from "axios";
import { useRouter } from 'next/router';
import Nav from "../components/Nav";

export default function() {

    const router = useRouter()

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const loginHandle = (e) => {
        e.preventDefault()

        Axios.post("https://bd83-223-31-218-223.ngrok-free.app/users/login", {
            email,
            password
        }, {
            headers: {
                'ngrok-skip-browser-warning': 'sandesh'
            }
        }).then((res) => {
            if(res.data != null) {
                localStorage.setItem('name', res.data.name);
                localStorage.setItem('email', res.data.email);
                localStorage.setItem('id', res.data.id);
                localStorage.setItem('role', res.data.role);
                console.log(res.data);
            } else {
                alert("Credentials dont match.")
            }
        }).then(() => {
            router.push('/');
        }).catch((err) => {
            console.log(err);
            
        })
    }
    return (
        <div>
            <Nav />
            <form onSubmit={loginHandle}>
                <span>Login</span>
                <input onChange={(e) => setEmail(e.target.value)} type="email" placeholder="Email" />
                <input onChange={(e) => setPassword(e.target.value)} type="password" placeholder="Password" />
                <button type="submit">Login</button>
            </form>
        </div>
    )
}