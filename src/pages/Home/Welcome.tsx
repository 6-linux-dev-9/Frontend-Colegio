import { Link } from "react-router";
import backgroundImage from "../../assets/images/fondo-red-social.jpg"

export default function Welcome() {
  return (
        <> 

            <section 
                id="welcome-principal"  
                 className="h-screen flex items-center justify-center relative overflow-hidden"
            >
                {/* Pseudo-elemento para la imagen desenfocada */}
                <div 
                    className="absolute inset-0 bg-cover bg-center filter blur-lg scale-110"
                    style={{ backgroundImage: `url(${backgroundImage})` }}
                ></div>
                {/* Contenido principal */}
                <div className="relative flex flex-col items-center justify-center text-center p-10 rounded-lg bg-opacity-50">
                    <h1 className="text-5xl font-extrabold text-white mb-6">
                        Bienvenido a nuestra aplicación
                    </h1>
                    <p className="text-5xl text-white mb-6">
                        Explora todas las funciones que tenemos para ti.
                    </p>
                    <Link 
                        to="/signin" 
                        className="px-6 py-3 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition"
                    >
                        Registrarme / Iniciar sesión
                    </Link>
                </div>
            </section>



            <section id="quienes-somos" className="h-screen flex items-center justify-center bg-gray-200">
                <h2 className="text-3xl font-bold">Quiénes Somos</h2>
            </section>

            <section id="nuestros-servicios" className="h-screen flex items-center justify-center bg-gray-300">
                <h2 className="text-3xl font-bold">Nuestros Servicios</h2>
            </section>

            <section id="ubicacion" className="h-screen flex items-center justify-center bg-gray-400">
                <h2 className="text-3xl font-bold">Ubicación</h2>
            </section>
        </>
  );
}
