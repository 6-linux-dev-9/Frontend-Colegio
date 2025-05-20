import { useEffect, useState } from "react";
import { Link } from "react-router";
import { Bars3Icon, XMarkIcon, ArrowUpIcon } from "@heroicons/react/24/solid";

export default function NavBar() {
    const [showButton, setShowButton] = useState<boolean>(false);
    const [isScrolled, setIsScrolled] = useState<boolean>(false);
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [isHamburguesa, setIsHamburguesa] = useState<boolean>(false);

    useEffect(() => {
        const handleScroll = () => {
            const hasScrolledPastWelcome = window.scrollY > window.innerHeight * 0.7;
            setShowButton(window.scrollY > 300);
            setIsScrolled(hasScrolledPastWelcome);
            setIsHamburguesa(hasScrolledPastWelcome);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth >= 768) {
                setIsOpen(false);
            }
        };

        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    return (
        <>
            <nav
                className={`fixed w-full top-0 z-50 transition-all duration-300 p-4 ${
                    isScrolled ? "bg-blue-600 shadow-md text-white" : "bg-transparent text-white"
                }`}
            >
                <div className="flex justify-between items-center">
                    <h1 className="text-xl font-bold">Mi Proyecto</h1>

                    <button
                        className="md:hidden text-white text-2xl"
                        onClick={() => setIsOpen(!isOpen)}
                    >
                        {isOpen ? <XMarkIcon className="w-6 h-6" /> : <Bars3Icon className="w-6 h-6" />}
                    </button>

                    <div
                        className={`md:flex md:items-center md:space-x-4 absolute md:static top-16 left-0 w-full md:w-auto 
                        text-center transition-all duration-300 ease-in-out 
                        ${isOpen ? "block" : "hidden"} 
                        ${
                            isOpen
                                ? isHamburguesa
                                    ? "bg-blue-600 text-white"
                                    : "backdrop-blur-md bg-white/10 text-white"
                                : "bg-transparent"
                        }`}
                    >
                        <a href="#welcome-principal" className="block py-2 md:inline md:py-0 hover:bg-blue-500 px-4">
                            Home
                        </a>
                        <a href="#quienes-somos" className="block py-2 md:inline md:py-0 hover:bg-blue-500 px-4">
                            Quiénes Somos
                        </a>
                        <a href="#nuestros-servicios" className="block py-2 md:inline md:py-0 hover:bg-blue-500 px-4">
                            Nuestros Servicios
                        </a>
                        <a href="#ubicacion" className="block py-2 md:inline md:py-0 hover:bg-blue-500 px-4">
                            Ubicación
                        </a>
                        <Link to="/signin" className="block py-2 md:inline md:py-0 hover:bg-blue-500 px-4">
                            Login
                        </Link>
                        <Link to="/signup" className="block py-2 md:inline md:py-0 hover:bg-blue-500 px-4">
                            Signup
                        </Link>
                    </div>
                </div>
            </nav>

            {showButton && (
                <button
                    onClick={scrollToTop}
                    className="fixed bottom-8 right-8 bg-blue-600 text-white p-3 rounded-full shadow-lg hover:bg-blue-700 transform hover:scale-110 animate-bounce"
                >
                    <ArrowUpIcon className="w-6 h-6" />
                </button>
            )}
        </>
    );
}
