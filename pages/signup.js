import { useState } from "react";
import Axios from "axios";
import { useRouter } from 'next/router';

export default function Signup() {

    const router = useRouter()

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [phone, setPhone] = useState("");

    const signUser = (e) => {
        e.preventDefault();

        // fetch("https://19d3-223-31-218-223.ngrok-free.app/users/all", {
        //     method: 'GET',
        //     headers: {
        //         'Content-Type': 'application/json',
        //         'ngrok-skip-browser-warning': 'sandesh'
        //     }
        // }).then(response => response.json()).then(json => console.log(json))
        if(phone.length != 10) {

        } else {
            Axios.post("https://bd83-223-31-218-223.ngrok-free.app/users/register", {
                name,
                email,
                phone,
                password,
                role: "CUSTOMER"
            }, {
                headers: {
                    'ngrok-skip-browser-warning': 'sandesh'
                }
            }).then((res) => {
                localStorage.setItem('name', res.data.name);
                localStorage.setItem('email', res.data.email);
                localStorage.setItem('id', res.data.id);
            }).then(() => {
                router.push('/');
            }).catch((err) => {
                console.log(err);
                alert("An error has occured");
            })
        }
        
    }

    return(
        <div className="flex flex-col w-full h-full justify-center items-center">

            <form onSubmit={signUser} className="flex flex-col w-[600px] gap-7 items-center">
                <span className="mt-7">Signup</span>
                <input onChange={(e) => setName(e.target.value)} className="pl-[10px] pr-[10px] h-9 w-3/6 focus:outline-none border-2 border-black rounded-md" type="text" placeholder="Name" />
                <input onChange={(e) => setEmail(e.target.value)} className="pl-[10px] pr-[10px] h-9 w-3/6 focus:outline-none border-2 border-black rounded-md" type="email" placeholder="Email" />
                <input onChange={(e) => setPhone(e.target.value)} className="pl-[10px] pr-[10px] h-9 w-3/6 focus:outline-none border-2 border-black rounded-md" type="number" placeholder="Phone Number" />
                <input onChange={(e) => setPassword(e.target.value)} className="pl-[10px] pr-[10px] h-9 w-3/6 focus:outline-none border-2 border-black rounded-md" type="password" placeholder="Password" />
                <button className="flex flex-col items-center justify-center cursor-pointer mb-7 w-2/6 bg-black h-9 rounded-md text-white" type="submit">Signup</button>
             </form>

        </div>
    )
}