
import WelcomeCard from "./WelcomeCard";

import backgroundImage from "../../assets/images/background-escolar.png"
import LoginCard from "./LoginCard";

export default function HomePage() {
  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center px-4"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <div className="flex flex-col-reverse md:flex-row items-center justify-between w-full max-w-6xl gap-10">
        {/* Columna izquierda */}
        <WelcomeCard />

        {/* Columna derecha (Login) */}
        <div className="bg-white  p-6 shadow-lg w-full max-w-md">
          <LoginCard/>
        </div>
      </div>
    </div>
  );
}
