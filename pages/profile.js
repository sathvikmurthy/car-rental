import Nav from "../components/Nav";
import { useRouter } from 'next/router';
import { useEffect, useState } from "react";
import Axios from "axios";

export default function Profile() {

    const [bookingsData, setBookingsData] = useState([])

    const [pools, setPools] = useState([]);

    const [joinedPools, setJoinedPools] = useState([]);

    const router = useRouter()

    useEffect(() => {
        if(localStorage.getItem('email') == null) {
            router.push("/");
        }
    }, [])

    const getMyBookings = () => {
        Axios.get(`https://1fb1-223-31-218-223.ngrok-free.app/rentals/${localStorage.getItem('id')}`, {
            headers: {
                'ngrok-skip-browser-warning': 'sandesh'
            }
        }).then((res) => {
            setBookingsData(res.data);
        }).catch((err) => {
            console.log(err);
        })
    }

    const getMyPools = () => {
        Axios.get(`https://1fb1-223-31-218-223.ngrok-free.app/carpools/created/${localStorage.getItem('id')}`, {
            headers: {
                'ngrok-skip-browser-warning': 'sandesh'
            }
        }).then((res) => {
            setPools(res.data);
        }).catch((err) => {
            console.log(err);
        })
    }

    const getJoinedPools = () => {
        Axios.get(`https://1fb1-223-31-218-223.ngrok-free.app/carpools/joined/${localStorage.getItem('id')}`, {
            headers: {
                'ngrok-skip-browser-warning': 'sandesh'
            }
        }).then((res) => {
            setJoinedPools(res.data);
        }).catch((err) => {
            console.log(err);
        })
    }

    const deletePool = (pool_id) => {
        Axios.delete(`https://1fb1-223-31-218-223.ngrok-free.app/carpools/delete/${pool_id}`, {
            headers: {
                'ngrok-skip-browser-warning': 'sandesh'
            }
        }).then((res) => {
            getMyPools();
        }).catch((err) => {
            console.log(err);
        })
    }

    const leavePool = (pool_id) => {
        Axios.post(`https://1fb1-223-31-218-223.ngrok-free.app/carpools/${pool_id}/leave/${localStorage.getItem('id')}`, {
            headers: {
                'ngrok-skip-browser-warning': 'sandesh'
            }
        }).then((res) => {
            getJoinedPools();
            alert("Left Pool Successfully!")
        }).catch((err) => {
            console.log(err);
        })
    }

    useEffect(() => {
        getMyBookings();
        getMyPools();
        getJoinedPools();
    }, [])

    return(
        <div>
            <Nav />
            <div className="w-full h-full mt-16">
                <div className="flex flex-row w-full justify-center">
                    <div className="flex flex-col w-full h-full items-center">
                        <h3 className="text-black font-semibold text-xl mt-[30px]">My Bookings</h3>
                        <div className="flex flex-col w-full items-center gap-7 mt-[20px]">
                            {bookingsData.map((booking, index) => (
                                <div key={index} className="flex flex-col w-[90%] border-2 border-black rounded-lg font-medium">
                                    <div className="flex flex-row mb-[5px] w-full justify-between pl-[10px] pr-[10px] mt-[10px]">
                                        <span>From: {booking.startDate}</span>
                                        <span>Total Cost: ${booking.totalCost}</span>
                                    </div>
                                    <span className="pl-[10px] pb-[10px]">To: {booking.endDate}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="flex flex-col w-full h-full items-center">
                        <h3 className="text-black font-semibold text-xl mt-[30px]">Joined Pools</h3>
                        <div className="flex flex-col w-full items-center gap-7 mt-[20px]">
                            {joinedPools.map((joined, index) => (
                                <div key={index} className="flex flex-col items-center w-[90%] border-2 border-black rounded-lg font-medium">
                                    <div className="flex flex-col ml-[10px] mt-[10px] mb-[10px] gap-1">
                                        <span>Source: {joined.source}</span>
                                        <span>Destination: {joined.destination}</span>
                                        <span>Departure Time: {Date(joined.departureTime).split("GMT+0530 (India Standard Time)")}</span>
                                    </div>
                                    <button onClick={() => leavePool(joined.id)} className="mr-[10px] cursor-pointer bg-black text-white h-[30px] pl-[10px] pr-[10px] rounded mb-[10px]">Leave Pool</button>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="flex flex-col w-full h-full items-center">
                        <h3 className="text-black font-semibold text-xl mt-[30px]">My Pools</h3>
                        <div className="flex flex-col w-full items-center gap-7 mt-[20px]">
                            {pools.map((pool, index) => (
                                <div key={index} className="flex flex-row w-[90%] border-2 border-black rounded-lg font-medium justify-between items-center">
                                    <div className="flex flex-col ml-[10px] mt-[10px] mb-[10px] gap-1">
                                        <span>Source: {pool.source}</span>
                                        <span>Destination: {pool.destination}</span>
                                        <span>Departure Time: {Date(pool.departureTime).split("GMT+0530 (India Standard Time)")}</span>
                                        <span>Status: {pool.status}</span>
                                    </div>
                                    <button onClick={() => deletePool(pool.id)} className="mr-[10px] cursor-pointer bg-black text-white h-[30px] pl-[10px] pr-[10px] rounded">Delete</button>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}