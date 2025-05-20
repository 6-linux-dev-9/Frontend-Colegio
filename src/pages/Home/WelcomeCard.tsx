// src/components/ui/WelcomeCard.tsx

// export default function WelcomeCard() {
//   return (
//     <div className="bg-gradient-to-br from-black/80 to-gray-900/70 text-white p-8 md:p-10 rounded-2xl shadow-2xl max-w-md backdrop-blur-sm border border-white/10">
//       <div className="flex items-center gap-3 mb-4">
//         <div className="flex items-center gap-3 mb-4">
//             <span className="text-3xl">🎓</span>
//             <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
//                 Bienvenido a tu aplicación académica
//             </h2>
//         </div>

//       </div>
//       <p className="text-base sm:text-lg text-gray-300 leading-relaxed">
//         Gestioná tus clases, accedé a tus calificaciones, mantenete informado y conectado con tu institución desde un solo lugar.
//       </p>
//     </div>
//   );
// }
export default function WelcomeCard() {
  return (
    <div className="bg-gradient-to-br from-black/80 to-gray-900/70 text-white p-8 md:p-10 rounded-2xl shadow-2xl max-w-md backdrop-blur-sm border border-white/10 text-center">
      
      {/* Ícono centrado arriba */}
      <div className="mb-4">
        <span className="text-5xl">🎓</span>
      </div>

      {/* Título */}
      <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight mb-4">
        Bienvenido a tu aplicación académica
      </h2>

      {/* Descripción */}
      <p className="text-base sm:text-lg text-gray-300 leading-relaxed">
        Gestioná tus clases, accedé a tus calificaciones, mantenete informado y conectado con tu institución desde un solo lugar.
      </p>
    </div>
  );
}
