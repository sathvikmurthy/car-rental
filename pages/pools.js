import Nav from "../components/Nav";
import { useState, useEffect } from "react";
import { useRouter } from 'next/router';
import Axios from "axios";

export default function Pools() {

    const router = useRouter()

    const [showModal, setShowModal] = useState(false);

    const [poolData, setPoolData] = useState([{
        source: "",
        destination: "",
        departureTime: "",
        status: ""
    }])

    const getPools = () => {
        Axios.get("https://bd83-223-31-218-223.ngrok-free.app/carpools/active", {
            headers: {
                'ngrok-skip-browser-warning': 'sandesh'
            }
        }).then((res) => {
            setPoolData(res.data);
        }).catch((err) => {
            console.log(err);
        })
    }

    useEffect(() => {
        getPools();
    }, [])

    const joinPool = (pool_id) => {
        Axios.post(`https://bd83-223-31-218-223.ngrok-free.app/carpools/${pool_id}/join/${localStorage.getItem('id')}`, {
            headers: {
                'ngrok-skip-browser-warning': 'sandesh'
            }
        }).then((res) => {
            alert("Pool Joined Successfully!");
            router.push("/");
        }).catch((err) => {
            console.log(err);
        })
    }

    return (
        <div className="flex flex-col w-full h-full">
            <Nav />
            <div className="w-full h-full">
                <div className="flex flex-row w-full justify-evenly mt-[30px]">
                    <button className="flex flex-col bg-black text-white h-[30px] items-center justify-center pl-[10px] pr-[10px] font-medium border-0 rounded-md cursor-pointer" onClick={() => router.push('/profile')}>Joined Pools</button>
                    <button className="flex flex-col bg-black text-white h-[30px] items-center justify-center pl-[10px] pr-[10px] font-medium border-0 rounded-md cursor-pointer" onClick={() => router.push('/profile')}>Created Pools</button>
                    <button className="flex flex-col bg-black text-white h-[30px] items-center justify-center pl-[10px] pr-[10px] font-medium border-0 rounded-md cursor-pointer" onClick={() => router.push('/createpool')}>Create a Pool</button>
                </div>
                <div className="flex flex-col items-center mt-[40px]">
                    <h3 className="text-black font-semibold text-xl mb-[30px]">Available Pools</h3>
                    {poolData.map((pool, index) => (
                        <div className="flex flex-row gap-15 border-2 border-black rounded-lg font-medium items-center" key={index}>
                            <div className="flex flex-col gap-1 ml-[10px] mt-[10px] mb-[10px]">
                                <span>Source: {pool.source}</span>
                                <span>Destination: {pool.destination}</span>
                            </div>
                            <div className="flex flex-col gap-1 mt-[10px] mb-[10px]">
                                <span>Departure Time: {Date(pool.departureTime).split("GMT+0530 (India Standard Time)")}</span>
                                <span>Status: {pool.status}</span>
                            </div>
                            <button className="mr-[10px] mt-[10px] mb-[10px] bg-black text-white pl-[10px] pr-[10px] h-[30px] rounded cursor-pointer" onClick={() => joinPool(pool.id)}>Join</button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}