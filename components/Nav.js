import { useEffect, useState } from "react";
import { useRouter } from 'next/router';
import Link from 'next/link';

export default function Nav() {

    const router = useRouter()

    const [showBtn, setShowBtn] = useState(true);

    const [useName, setUseName] = useState('');

    useEffect(() => {
        const user = localStorage.getItem('email')
        const name = localStorage.getItem('name')

       if(localStorage.getItem('email') == null) {
        setShowBtn(true);
       } else {
        setShowBtn(false);
       }
    }, [])

    const logout = () => {
        localStorage.removeItem('email');
        localStorage.removeItem('name');
        localStorage.removeItem('id');
        localStorage.removeItem('role');
        window.location.reload();
    }

    return(
        <nav className="flex flex-row justify-between items-center bg-black w-full h-16">
            <h1 onClick={() => router.push("/")} className="text-2xl font-bold ml-[30px] text-white">Car Rental</h1>
            {showBtn ? (<div className="flex flex-row gap-5 mr-[30px]">
                <button onClick={() => router.push('/login')} className="flex font-semibold border-0 flex-col bg-white text-black h-9 items-center justify-center pl-[12px] pr-[12px] rounded-md cursor-pointer">Login</button>
                <button onClick={() => router.push('/signup')} className="flex font-semibold border-0 flex-col bg-white text-black h-9 items-center justify-center pl-[12px] pr-[12px] rounded-md cursor-pointer">Signup</button>
            </div>) : (<div className="flex flex-row mr-[30px] gap-5 items-center">
                <Link className="text-white font-semibold hover:underline transition duration-300" href="/profile">My Profile</Link>
                <button onClick={() => router.push("/pools")}className="flex font-semibold border-0 flex-col bg-white text-clack h-9 items-center justify-center pl-[12px] pr-[12px] rounded-md cursor-pointer">Car Pools</button>
                {localStorage.getItem('role') == "ADMIN" && (<button onClick={() => router.push("/admin")} className="flex font-semibold border-0 flex-col bg-white text-clack h-9 items-center justify-center pl-[12px] pr-[12px] rounded-md cursor-pointer">Admin Panel</button>)}
                <button onClick={logout} className="flex font-semibold border-0 flex-col bg-white text-clack h-9 items-center justify-center pl-[12px] pr-[12px] rounded-md cursor-pointer">Logout</button>
            </div>)}
        </nav>
    )
}