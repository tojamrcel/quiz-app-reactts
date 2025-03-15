import { FaReact } from "react-icons/fa"

function Header() {
    return (
        <header className="w-full py-2 sm:py-4">
            <h1 className="flex justify-center gap-2 text-center text-5xl font-bold text-gray-300 sm:gap-3 md:text-6xl">
                <FaReact style={{ color: "#581c87" }} />
                Quiz App
            </h1>
        </header>
    )
}

export default Header
