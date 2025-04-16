import { useState, useEffect } from "react";
import Axios from "axios";
import Nav from "../components/Nav";
import { useRouter } from 'next/router';

export default function CreatePool() {

    const router = useRouter()

    const [source, setSource] = useState("");
    const [destination, setDestination] = useState("");
    const [passengers, setPassengers] = useState(0);
    const [departure, setDeparture] = useState("");

    const createPool = (e) => {

        e.preventDefault();

        Axios.post("https://1fb1-223-31-218-223.ngrok-free.app/carpools/create", {
            creatorId: localStorage.getItem('id'),
            source,
            destination,
            maxPassengers: passengers,
            departureTime: departure
        }, {
            headers: {
                'ngrok-skip-browser-warning': 'sandesh'
            }
        }).then((res) => {
            alert("Pool Created Successfully!");
            router.push("/profile");
        }).catch((err) => {
            console.log(err);
        })
    }

    useEffect(() => {
        if(localStorage.getItem('email') == null) {
            router.push("/");
        }
    }, [])

    return (
        <div className="mt-24">
            <Nav />
            <div>
                <form onSubmit={createPool} className="flex flex-col items-center w-full gap-7 mt-[50px]">
                    <h4 className="text-black font-semibold text-lg">Create a Pool</h4>
                    <input onChange={(e) => setSource(e.target.value)} className="pl-[10px] pr-[10px] h-9 w-3/6 focus:outline-none border-2 border-black rounded-md" type="text" placeholder="Enter Source" />
                    <input onChange={(e) => setDestination(e.target.value)} className="pl-[10px] pr-[10px] h-9 w-3/6 focus:outline-none border-2 border-black rounded-md" type="text" placeholder="Enter Destination" />
                    <input onChange={(e) => setDeparture(e.target.value)} className="pl-[10px] pr-[10px] h-9 w-3/6 focus:outline-none border-2 border-black rounded-md" type="datetime-local" placeholder="Enter Date & Time" />
                    <input onChange={(e) => setPassengers(e.target.value)} className="pl-[10px] pr-[10px] h-9 w-3/6 focus:outline-none border-2 border-black rounded-md" type="number" placeholder="Enter Max Passengers" />
                    <button className="flex flex-col items-center justify-center cursor-pointer mb-7 w-2/6 bg-black h-9 rounded-md text-white mt-[10px]" type="submit">Create Pool</button>
                </form>
            </div>
        </div>
    )
}