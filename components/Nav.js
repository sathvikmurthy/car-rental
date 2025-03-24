export default function Nav() {
    return(
        <nav className="flex flex-row justify-between items-center bg-red-500 w-full h-16">
            <h1>Car Rental</h1>
            <div className="flex flex-row gap-3">
                <button>Login</button>
                <button>SignUp</button>
            </div>
        </nav>
    )
}