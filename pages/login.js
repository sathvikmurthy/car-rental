import { useState, useEffect } from "react";
import Axios from "axios";
import { useRouter } from 'next/router';
import Nav from "../components/Nav";
import Link from 'next/link';

export default function() {

    const router = useRouter()

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const loginHandle = (e) => {
        e.preventDefault()

        Axios.post("https://1fb1-223-31-218-223.ngrok-free.app/users/login", {
            email,
            password
        }, {
            headers: {
                'ngrok-skip-browser-warning': 'sandesh'
            }
        }).then((res) => {
            if(res.data.email) {
                localStorage.setItem('name', res.data.name);
                localStorage.setItem('email', res.data.email);
                localStorage.setItem('id', res.data.id);
                localStorage.setItem('role', res.data.role);
                console.log(res.data);
            } else {
                alert("Credentials dont match or user not found.")
            }
        }).then(() => {
            router.push('/');
        }).catch((err) => {
            console.log(err);
            
        })
    }

    useEffect(() => {
        if(localStorage.getItem('email') != null) {
            router.push("/");
        }
    }, [])

    return (
        <div className="flex flex-col items-center w-full h-screen justify-center">
            <Nav />
            <form onSubmit={loginHandle} className="flex flex-col w-[600px] gap-7 items-center">
                <span className="text-lg font-semibold">Login</span>
                <input className="pl-[10px] pr-[10px] h-9 w-3/6 focus:outline-none border-2 border-black rounded-md" onChange={(e) => setEmail(e.target.value)} type="email" placeholder="Email" />
                <input className="pl-[10px] pr-[10px] h-9 w-3/6 focus:outline-none border-2 border-black rounded-md" onChange={(e) => setPassword(e.target.value)} type="password" placeholder="Password" />
                <button className="flex flex-col items-center justify-center cursor-pointer mb-7 w-2/6 bg-black h-9 rounded-md text-white" type="submit">Login</button>
            </form>
            <span className="text-base">Don't have an account yet? <Link className="underline" href="/signup">Signup</Link></span>
        </div>
    )
}