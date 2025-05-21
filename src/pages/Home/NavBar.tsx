// import { useEffect, useState } from "react";
// import { Link } from "react-router";
// import { Bars3Icon, XMarkIcon, ArrowUpIcon } from "@heroicons/react/24/solid";

// export default function NavBar() {
//     const [showButton, setShowButton] = useState<boolean>(false);
//     const [isScrolled, setIsScrolled] = useState<boolean>(false);
//     const [isOpen, setIsOpen] = useState<boolean>(false);
//     const [isHamburguesa, setIsHamburguesa] = useState<boolean>(false);

//     useEffect(() => {
//         const handleScroll = () => {
//             const hasScrolledPastWelcome = window.scrollY > window.innerHeight * 0.7;
//             setShowButton(window.scrollY > 300);
//             setIsScrolled(hasScrolledPastWelcome);
//             setIsHamburguesa(hasScrolledPastWelcome);
//         };

//         window.addEventListener("scroll", handleScroll);
//         return () => window.removeEventListener("scroll", handleScroll);
//     }, []);

//     useEffect(() => {
//         const handleResize = () => {
//             if (window.innerWidth >= 768) {
//                 setIsOpen(false);
//             }
//         };

//         window.addEventListener("resize", handleResize);
//         return () => window.removeEventListener("resize", handleResize);
//     }, []);

//     const scrollToTop = () => {
//         window.scrollTo({ top: 0, behavior: "smooth" });
//     };

//     return (
//         <>
//             <nav
//                 className={`fixed w-full top-0 z-50 transition-all duration-300 p-4 ${
//                     isScrolled ? "bg-blue-600 shadow-md text-white" : "bg-transparent text-white"
//                 }`}
//             >
//                 <div className="flex justify-between items-center">
//                     <h1 className="text-xl font-bold">Mi Colegio</h1>

//                     <button
//                         className="md:hidden text-white text-2xl"
//                         onClick={() => setIsOpen(!isOpen)}
//                     >
//                         {isOpen ? <XMarkIcon className="w-6 h-6" /> : <Bars3Icon className="w-6 h-6" />}
//                     </button>

//                     <div
//                         className={`md:flex md:items-center md:space-x-4 absolute md:static top-16 left-0 w-full md:w-auto 
//                         text-center transition-all duration-300 ease-in-out 
//                         ${isOpen ? "block" : "hidden"} 
//                         ${
//                             isOpen
//                                 ? isHamburguesa
//                                     ? "bg-blue-600 text-white"
//                                     : "backdrop-blur-md bg-white/10 text-white"
//                                 : "bg-transparent"
//                         }`}
//                     >
//                         <a href="#welcome-principal" className="block py-2 md:inline md:py-0 hover:bg-blue-500 px-4">
//                             Home
//                         </a>
//                         <a href="#quienes-somos" className="block py-2 md:inline md:py-0 hover:bg-blue-500 px-4">
//                             Quiénes Somos
//                         </a>
//                         <a href="#nuestros-servicios" className="block py-2 md:inline md:py-0 hover:bg-blue-500 px-4">
//                             Nuestros Servicios
//                         </a>
//                         <a href="#ubicacion" className="block py-2 md:inline md:py-0 hover:bg-blue-500 px-4">
//                             Ubicación
//                         </a>
//                         <Link to="/signin" className="block py-2 md:inline md:py-0 hover:bg-blue-500 px-4">
//                             Login
//                         </Link>
//                     </div>
//                 </div>
//             </nav>

//             {showButton && (
//                 <button
//                     onClick={scrollToTop}
//                     className="fixed bottom-8 right-8 bg-blue-600 text-white p-3 rounded-full shadow-lg hover:bg-blue-700 transform hover:scale-110 animate-bounce"
//                 >
//                     <ArrowUpIcon className="w-6 h-6" />
//                 </button>
//             )}
//         </>
//     );
// }
// src/components/navigation/NavBar.tsx
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Bars3Icon, XMarkIcon, ArrowUpIcon } from "@heroicons/react/24/solid";

export default function NavBar() {
  /* ────────────────────────────  State  ──────────────────────────── */
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [showTop, setShowTop] = useState(false);

  /* ─────────────────────  Close menu on navigation  ───────────────────── */
  const location = useLocation();
  useEffect(() => setIsOpen(false), [location.pathname]);

  /* ────────────────────────  Scroll / resize handlers  ─────────────────── */
  useEffect(() => {
    const onScroll = () => {
      const scrolled = window.scrollY > 80;
      setIsScrolled(scrolled);
      setShowTop(window.scrollY > 300);
    };
    const onResize = () => {
      if (window.innerWidth >= 768) setIsOpen(false);
    };
    window.addEventListener("scroll", onScroll);
    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  /* ─────────────────────────────  Helpers  ────────────────────────────── */
  const toggle = () => setIsOpen((prev) => !prev);
  const scrollTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  /* ─────────────────────────────  Render  ─────────────────────────────── */
  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 backdrop-blur-sm transition-colors
        ${isScrolled ? "bg-blue-600/90 text-white shadow-md" : "bg-transparent text-white"}`}
      >
        <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3">
          {/* Logo / brand */}
          <Link to="/" className="text-2xl font-semibold tracking-tight">
            Mi&nbsp;Colegio
          </Link>

          {/* Hamburger */}
          <button
            onClick={toggle}
            aria-label={isOpen ? "Cerrar menú" : "Abrir menú"}
            className="md:hidden"
          >
            {isOpen ? <XMarkIcon className="h-7 w-7" /> : <Bars3Icon className="h-7 w-7" />}
          </button>

          {/* Links */}
          <ul
            className={`md:flex md:items-center md:gap-6 w-full md:w-auto
              transition-all duration-300 ease-in-out
              ${isOpen ? "block py-4" : "hidden md:block"}`}
          >
            {[
              { href: "#welcome-principal", label: "Home" },
              { href: "#quienes-somos", label: "Quiénes Somos" },
              { href: "#nuestros-servicios", label: "Servicios" },
              { href: "#ubicacion", label: "Ubicación" },
            ].map(({ href, label }) => (
              <li key={href}>
                <a
                  href={href}
                  className="block px-4 py-2 rounded-md hover:bg-white/10 md:hover:bg-transparent md:hover:text-blue-300"
                >
                  {label}
                </a>
              </li>
            ))}
            <li className="md:ml-4">
              <Link
                to="/signin"
                className="block px-4 py-2 rounded-md hover:bg-white/10 md:hover:bg-transparent md:hover:text-blue-300"
              >
                Login
              </Link>
            </li>
          </ul>
        </nav>
      </header>

      {/* Botón volver arriba */}
      {showTop && (
        <button
          onClick={scrollTop}
          className="fixed bottom-6 right-6 rounded-full bg-blue-600 p-3 text-white shadow-lg
          transition hover:scale-110 hover:bg-blue-700"
        >
          <ArrowUpIcon className="h-5 w-5" />
        </button>
      )}
    </>
  );
}
