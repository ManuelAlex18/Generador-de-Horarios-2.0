import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, User } from "lucide-react";
import { Sidebar } from "./Sidebar";
import logo from "@/assets/images/logo.png";
import { jwtDecode } from "jwt-decode";

export function Navigation() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const navigate = useNavigate();
  const isAuth = !!localStorage.getItem("access");

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  const handleLogout = () => {
    localStorage.removeItem("access");
    localStorage.removeItem("refresh");
    setUserMenuOpen(false);
    navigate("/login");
  };

  // Cierra el menú si haces click fuera
  const handleBlur = (e) => {
    if (!e.currentTarget.contains(e.relatedTarget)) {
      setUserMenuOpen(false);
    }
  };

  // Obtener el rol del usuario desde el token JWT
  let userRole = null;
  const token = localStorage.getItem("access");
  if (token) {
    try {
      const decoded = jwtDecode(token);
      if (decoded.groups && decoded.groups.length > 0) {
        userRole = decoded.groups[0];
      }
    } catch (err) {
      userRole = null;
    }
  }
  const hasRole = userRole && userRole !== "user";

  return (
    <>
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <div className="flex justify-between items-center py-4 px-6 bg-[#006599] shadow-lg">
        <div className="flex items-center">
          <button
            onClick={toggleSidebar}
            className="mr-3 text-white hover:text-[#12a6b9] focus:outline-none transition-all duration-200"
          >
            <Menu size={28} />
          </button>
          <Link to="/inicio">
            <div className="flex items-center gap-2">
              <img
                src={logo}
                alt="Logo HorarioUCF"
                className="h-10 w-10 object-contain bg-white rounded-xl shadow border border-[#006599]"
                style={{
                  background: "#006599", // Fondo sólido azul institucional
                  border: "2px solid #006599", // Borde azul para ocultar filos
                  borderRadius: "0.75rem",
                  boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
                  padding: "2px",
                }}
              />
              <h1 className="font-bold text-3xl mb-0 text-white tracking-wide select-none">
                HorarioUCF
              </h1>
            </div>
          </Link>
        </div>
        <div className="flex items-center gap-2 ml-auto">
          {/* Botón Inicio eliminado */}
          {hasRole && (
            <Button
              className="bg-[#12a6b9] text-white hover:bg-[#0e8fa0] px-4 py-2 rounded-lg text-base font-semibold shadow transition-all duration-200"
              onClick={() => navigate("/schedule")}
            >
              Generar Horario
            </Button>
          )}
          {/* Menú de usuario moderno */}
          <div
            className="relative ml-2"
            tabIndex={0}
            onBlur={handleBlur}
          >
            <button
              className="flex items-center justify-center w-10 h-10 rounded-full bg-white border-2 border-[#12a6b9] hover:bg-[#e3f6fa] transition-all duration-200 focus:outline-none"
              onClick={() => setUserMenuOpen((v) => !v)}
              aria-label="Cuenta"
            >
              <User className="text-[#006599]" size={24} />
            </button>
            {userMenuOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg border border-[#12a6b9]/30 z-50 py-2">
                {isAuth ? (
                  <button
                    className="w-full text-left px-4 py-2 text-[#006599] hover:bg-[#e3f6fa] font-semibold transition-all duration-150"
                    onClick={handleLogout}
                  >
                    Cerrar Sesión
                  </button>
                ) : (
                  <>
                    <button
                      className="w-full text-left px-4 py-2 text-[#006599] hover:bg-[#e3f6fa] font-semibold transition-all duration-150"
                      onClick={() => {
                        setUserMenuOpen(false);
                        navigate("/login");
                      }}
                    >
                      Iniciar Sesión
                    </button>
                    <button
                      className="w-full text-left px-4 py-2 text-[#006599] hover:bg-[#e3f6fa] font-semibold transition-all duration-150"
                      onClick={() => {
                        setUserMenuOpen(false);
                        navigate("/register");
                      }}
                    >
                      Registrarse
                    </button>
                  </>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
