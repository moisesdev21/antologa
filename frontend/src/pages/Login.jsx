import { useState, useEffect } from "react";
import axios from "axios";
import { FiMail, FiLock, FiEye, FiEyeOff, FiUser } from "react-icons/fi";
import LogoIcon from "../assets/sidebar-icons/antologa-logo01-icon.svg";

export default function Login({ setCurrentUser }) {
  const [userType, setUserType] = useState("customer");
  const [formData, setFormData] = useState({ email: "", password: "", nametag: "" });
  const [message, setMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  // Obtener usuario actual desde localStorage
  const [currentUser, setCurrentUserState] = useState(() => {
    const saved = localStorage.getItem("user");
    return saved ? JSON.parse(saved) : null;
  });

  // ✅ Detectar dominio para redirección (LOCAL + PRODUCCIÓN)
  const getBaseUrl = () => {
    const hostname = window.location.hostname;

    // 🌟 SUBDOMINIOS EN LOCAL
    if (hostname.includes("admins.localhost")) return "http://admins.localhost:5173";
    if (hostname.includes("business.localhost")) return "http://business.localhost:5173";

    // 🌟 LOCAL BASE (customer)
    if (hostname === "localhost") return "http://localhost:5173";

    // 🌟 PRODUCCIÓN
    if (hostname.includes("admins.antologa.com")) return "https://admins.antologa.com";
    if (hostname.includes("business.antologa.com")) return "https://business.antologa.com";

    return "https://antologa.com"; // Dominio principal
  };

  const baseUrl = getBaseUrl();

  useEffect(() => {
    const domain = window.location.hostname;

    if (domain.includes("admins")) setUserType("admin");
    else if (domain.includes("business")) setUserType("business");
    else setUserType("customer");

    // Evitar scroll en login
    document.documentElement.style.overflow = "hidden";
    document.body.style.overflow = "hidden";
    return () => {
      document.documentElement.style.overflow = "";
      document.body.style.overflow = "";
    };
  }, []);

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      const payload = {
        identifier: userType === "customer" ? formData.email.trim() : formData.nametag.trim(),
        password: formData.password.trim(),
        userType,
      };

      // ✅ Backend local o producción
      const res = await axios.post("http://localhost:4000/api/auth/login", payload);

      localStorage.setItem("user", JSON.stringify(res.data.user));
      localStorage.setItem("token", res.data.token);
      setCurrentUser(res.data.user);
      setCurrentUserState(res.data.user);

      setMessage("✅ Login exitoso. Redirigiendo...");
      setTimeout(() => {
        window.location.href = `${baseUrl}`;
      }, 1000);
    } catch (error) {
      console.error("Error durante login:", error);
      const errorMsg = error.response?.data?.message || "Credenciales inválidas o error de servidor";
      setMessage(`❌ ${errorMsg}`);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    setCurrentUser(null);
    setCurrentUserState(null);
    window.location.href = baseUrl;
  };

  const InputIcon = userType === "customer" ? FiMail : FiUser;
  const inputName = userType === "customer" ? "email" : "nametag";
  const inputValue = userType === "customer" ? formData.email : formData.nametag;
  const inputPlaceholder = userType === "customer" ? "Enter your email" : "Nametag (Ej: @user_01)";
  const isEmail = userType === "customer";

  // ✅ Si ya está logueado
  if (currentUser) {
    return (
      <div className="w-screen h-screen flex overflow-hidden bg-white">
        <div
          className="hidden lg:block w-[35%] h-full bg-cover bg-center shadow-md"
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1524544187526-2b2855b65f16?auto=format&q=60')" }}
        ></div>

        <div className="flex-1 flex justify-center items-center h-full px-6 lg:px-16">
          <div className="w-80 h-[666px] inline-flex flex-col justify-center items-center">
            <div className="w-32 h-32 flex justify-center items-center mb-6">
              <img src={LogoIcon} alt="Antóloga Logo" className="w-full h-full object-contain" />
            </div>

            <div className="flex flex-col justify-start items-center gap-6 text-center">
              <div className="w-80 text-zinc-800 text-4xl font-bold leading-[48px]">
                Sesión Activa
              </div>
              <div className="w-80 text-slate-500 text-base">
                Hola, <strong>{currentUser.name || currentUser.email}</strong><br />
                Ya tienes una sesión activa.
              </div>

              <div className="w-full space-y-3 mt-4">
                <button
                  onClick={() => window.location.href = `${baseUrl}`}
                  className="w-full px-4 py-3 bg-teal-600 rounded-lg text-gray-50 text-sm font-bold hover:bg-teal-700 transition-colors"
                >
                  Ir al Inicio
                </button>
                <button
                  onClick={handleLogout}
                  className="w-full px-4 py-3 bg-gray-500 rounded-lg text-gray-50 text-sm font-bold hover:bg-gray-600 transition-colors"
                >
                  Cerrar sesión
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ✅ Formulario si NO está logueado
  return (
    <div className="w-screen h-screen flex overflow-hidden bg-white mt-[100px]">
      <div
        className="hidden lg:block w-[35%] h-full bg-cover bg-center shadow-md"
        style={{ backgroundImage: "url('https://images.unsplash.com/photo-1524544187526-2b2855b65f16?auto=format&q=60')" }}
      ></div>

      <div className="flex-1 flex justify-center items-start h-full px-6 lg:px-16">
        <form onSubmit={handleSubmit} className="w-80 flex flex-col justify-start items-center mt-6 pb-6 overflow-y-auto max-h-[90vh]">
          <div className="w-32 h-32 flex justify-center items-center mb-4">
            <img src={LogoIcon} alt="Antóloga Logo" className="w-full h-full object-contain" />
          </div>

          <div className="flex flex-col justify-start items-start gap-3">
            <div className="w-80 text-center justify-start text-zinc-800 text-4xl font-bold leading-[48px]">
              Sign in
            </div>
            <div className="w-80 text-center justify-start text-slate-500 text-base">
              {userType === "customer" ? "Use Your OpenID to Sign in" : "Business Partner Login"}
            </div>
          </div>

          {message && (
            <div className={`w-80 text-center text-sm font-medium ${
              message.includes("✅") ? "text-green-600" : "text-red-500"
            }`}>
              {message}
            </div>
          )}

          {/* Email/Nametag */}
          <div className="flex flex-col gap-4 w-full mt-4">
            <div className="relative">
              <InputIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <input
                type={isEmail ? "email" : "text"}
                name={inputName}
                value={inputValue}
                onChange={handleChange}
                placeholder={inputPlaceholder}
                required
                className="w-full h-12 pl-12 pr-4 py-2 rounded-lg outline outline-2 outline-offset-[-2px] outline-gray-200 focus:outline-teal-600"
              />
            </div>

            <div className="relative">
              <FiLock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Password"
                required
                className="w-full h-12 pl-12 pr-12 py-2 rounded-lg outline outline-2 outline-offset-[-2px] outline-gray-200 focus:outline-teal-600"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {showPassword ? <FiEyeOff size={18} /> : <FiEye size={18} />}
              </button>
            </div>
          </div>

          <div className="w-80 text-center text-zinc-800 text-xs font-semibold mt-3 cursor-pointer hover:text-teal-600">
            Forgot password?
          </div>

          <button
            type="submit"
            className="w-80 mt-6 px-4 py-3 bg-teal-600 rounded-lg text-gray-50 text-sm font-bold hover:bg-teal-700 transition-colors"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}
