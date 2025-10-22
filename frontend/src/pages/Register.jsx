import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  FiMail,
  FiUser,
  FiLock,
  FiPhone,
  FiEye,
  FiEyeOff,
} from "react-icons/fi";
import Logo from "../assets/sidebar-icons/antologa-logo01-white.svg";

export default function Register() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    lastName: "",
    nametag: "",
    email: "",
    password: "",
    phoneNumber: "",
    userType: "customer", // valor por defecto
  });
  const [message, setMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [userType, setUserType] = useState("customer");

  useEffect(() => {
    const domain = window.location.hostname;

    if (domain.includes("admins")) {
      setUserType("admin");
      setFormData((prev) => ({ ...prev, userType: "admin" }));
    } else if (domain.includes("business")) {
      setUserType("business");
      setFormData((prev) => ({ ...prev, userType: "business" }));
    } else {
      setUserType("customer");
      setFormData((prev) => ({ ...prev, userType: "customer" }));
    }

    // Evita scroll en pantalla de registro
    document.documentElement.style.overflow = "hidden";
    document.body.style.overflow = "hidden";
    return () => {
      document.documentElement.style.overflow = "";
      document.body.style.overflow = "";
    };
  }, []);

  const getBackground = () => {
    if (userType === "admin")
      return "url('https://c4.wallpaperflare.com/wallpaper/694/718/521/5bd34d0348ab3-wallpaper-preview.jpg')";
    if (userType === "business")
      return "url('https://c4.wallpaperflare.com/wallpaper/694/718/521/5bd34d0348ab3-wallpaper-preview.jpg')";
    return "url('https://elcomercio.pe/resizer/AsKl3zG6QW0Hoj7EuQUKw1dFUeg=/2310x1326/smart/filters:format(jpeg):quality(75)/arc-anglerfish-arc2-prod-elcomercio.s3.amazonaws.com/public/B5YX3PYBZ5ELPJFEZ4GFNVHXC4.jpg')";
  };

  const getTitle = () => {
    if (userType === "admin") return "Administrator Registration";
    if (userType === "business") return "Business Partner Sign Up";
    return "Create Your Account";
  };

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:4000/api/auth/register", formData);
      setMessage(`✅ Usuario ${res.data.name} registrado correctamente. Redirigiendo...`);
      setFormData({
        name: "",
        lastName: "",
        nametag: "",
        email: "",
        password: "",
        phoneNumber: "",
        userType,
      });
      setTimeout(() => navigate("/login"), 2500);
    } catch (error) {
      let errorMsg = "";
      if (error.response)
        errorMsg = `Error ${error.response.status}: ${JSON.stringify(error.response.data)}`;
      else if (error.request)
        errorMsg = `No hubo respuesta del servidor: ${error.request}`;
      else errorMsg = `Error al configurar la request: ${error.message}`;
      setMessage(`❌ Error al registrar usuario: ${errorMsg}`);
    }
  };

  return (
    <div
      className="relative w-screen h-screen flex flex-col"
      style={{
        backgroundImage: getBackground(),
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Capa oscura */}
      <div className="absolute inset-0 bg-black/40"></div>

      {/* Navbar */}
<div className="absolute top-0 left-0 w-full flex items-center justify-between px-8 py-4 z-20">
  <div className="flex items-center">
    <img src={Logo} alt="Antóloga" className="h-8" />
  </div>

  <div className="flex space-x-6 mx-auto">
    {[
      { label: "Home", path: "/" },
      { label: "Experiences", path: "/experiences" },
      { label: "Destinations", path: "/destinations" },
     { label: "Discover", path: "/discover" },
      { label: "Blog", path: "/blog" }
    ].map((item) => (
      <button
        key={item.label}
        onClick={() => navigate(item.path)}
        className="text-white hover:text-teal-400 text-sm font-medium bg-transparent border-none"
      >
        {item.label}
      </button>
    ))}
  </div>

  <div className="flex items-center space-x-4">
    <button
      onClick={() => navigate("/login")}
      className="text-white text-sm font-medium hover:text-teal-400 bg-transparent border-none"
    >
      Log in
    </button>
    <button
      onClick={() => navigate("/register")}
      className="bg-teal-500 hover:bg-teal-600 text-white text-sm font-medium px-4 py-2 rounded"
    >
      Sign up
    </button>
  </div>
</div>

      {/* Formulario */}
      <div className="flex-1 flex items-center justify-center relative z-10 px-4">
        <div className="bg-white/95 backdrop-blur-sm rounded-xl shadow-2xl p-8 w-full max-w-md">
          <div className="text-center mb-6">
            <div className="text-teal-600 mb-3">
              <FiUser size={28} className="mx-auto" />
            </div>
            <h2 className="text-lg font-semibold text-gray-800">{getTitle()}</h2>
            <p className="text-sm text-gray-500">
              Fill in the fields below to create your account.
            </p>
          </div>

          {message && <p className="text-center text-red-500 text-sm mb-3">{message}</p>}

          <form onSubmit={handleSubmit} className="space-y-5 w-full">
            {/* Nombre */}
            <div className="relative">
              <FiUser className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Full Name"
                required
                className="w-full border border-gray-300 rounded-md pl-10 pr-4 py-2 focus:ring-2 focus:ring-teal-500 focus:outline-none"
              />
            </div>

            {/* Apellido */}
            <div className="relative">
              <FiUser className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                placeholder="Last Name"
                required
                className="w-full border border-gray-300 rounded-md pl-10 pr-4 py-2 focus:ring-2 focus:ring-teal-500 focus:outline-none"
              />
            </div>

            {/* Nametag */}
            <div className="relative">
              <FiUser className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                name="nametag"
                value={formData.nametag}
                onChange={handleChange}
                placeholder="Username (Nametag)"
                required
                className="w-full border border-gray-300 rounded-md pl-10 pr-4 py-2 focus:ring-2 focus:ring-teal-500 focus:outline-none"
              />
            </div>

            {/* Email */}
            <div className="relative">
              <FiMail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="E-Mail Address"
                required
                className="w-full border border-gray-300 rounded-md pl-10 pr-4 py-2 focus:ring-2 focus:ring-teal-500 focus:outline-none"
              />
            </div>

            {/* Password */}
            <div className="relative">
              <FiLock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Password"
                required
                className="w-full border border-gray-300 rounded-md pl-10 pr-10 py-2 focus:ring-2 focus:ring-teal-500 focus:outline-none"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {showPassword ? <FiEyeOff /> : <FiEye />}
              </button>
            </div>

            {/* Teléfono */}
            <div className="relative">
              <FiPhone className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleChange}
                placeholder="Phone Number"
                className="w-full border border-gray-300 rounded-md pl-10 pr-4 py-2 focus:ring-2 focus:ring-teal-500 focus:outline-none"
              />
            </div>

            {/* Tipo de usuario oculto */}
            <input type="hidden" name="userType" value={userType} />

            <button
              type="submit"
              className="w-full bg-teal-600 hover:bg-teal-700 text-white py-2 rounded-md font-medium transition"
            >
              Sign up
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
