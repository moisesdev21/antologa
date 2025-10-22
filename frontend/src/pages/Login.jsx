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

  // Obtener el dominio base correcto
  const getBaseUrl = () => {
    const hostname = window.location.hostname;
    if (hostname === "admins.antologa.com") return "https://admins.antologa.com";
    if (hostname === "business.antologa.com") return "https://business.antologa.com";
    return "https://antologa.com";
  };

  const baseUrl = getBaseUrl();

  useEffect(() => {
    const domain = window.location.hostname;

    if (domain.includes("admins")) setUserType("admin");
    else if (domain.includes("business")) setUserType("business");
    else setUserType("customer");

    // Evita scroll en login
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
      // Payload compatible con backend (identifier + password + userType)
      const payload = {
        identifier: userType === "customer" ? formData.email.trim() : formData.nametag.trim(),
        password: formData.password.trim(),
        userType,
      };

      const res = await axios.post("https://antologa.com/api/auth/login", payload);

      localStorage.setItem("user", JSON.stringify(res.data.user));
      localStorage.setItem("token", res.data.token);
      setCurrentUser(res.data.user);
      setCurrentUserState(res.data.user);

      setMessage("✅ Login exitoso. Redirigiendo...");
      setTimeout(() => {
        window.location.href = `${baseUrl}/`;
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

  // Icono y campo dinámico según userType
  const InputIcon = userType === "customer" ? FiMail : FiUser;
  const inputName = userType === "customer" ? "email" : "nametag";
  const inputValue = userType === "customer" ? formData.email : formData.nametag;
  const inputPlaceholder = userType === "customer" ? "Enter your email" : "Nametag (Ej: @user_01)";
  const isEmail = userType === "customer";

  // Si ya está logueado, mostrar mensaje
  if (currentUser) {
    return (
      <div className="w-screen h-screen flex overflow-hidden bg-white">
        {/* IZQUIERDA: Imagen (sin bordes redondeados) */}
        <div
          className="hidden lg:block w-[35%] h-full bg-cover bg-center shadow-md"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1524544187526-2b2855b65f16?ixlib=rb-4.1.0&auto=format&fit=crop&q=60&w=1200')",
          }}
        ></div>

        {/* DERECHA: Mensaje de sesión activa */}
        <div className="flex-1 flex justify-center items-center h-full px-6 lg:px-16">
          <div className="w-80 h-[666px] inline-flex flex-col justify-center items-center">
            {/* Logo de Antóloga */}
            <div className="w-32 h-32 flex justify-center items-center mb-6">
              <img
                src={LogoIcon}
                alt="Antóloga Logo"
                className="w-full h-full object-contain"
              />
            </div>

            {/* Mensaje de sesión activa */}
            <div className="flex flex-col justify-start items-center gap-6 text-center">
              <div className="w-80 text-zinc-800 text-4xl font-bold font-['Montserrat'] leading-[48px]">
                Sesión Activa
              </div>
              <div className="w-80 text-slate-500 text-base font-normal font-['Nunito'] leading-normal">
                Hola, <strong>{currentUser.name || currentUser.email}</strong>
                <br />
                Ya tienes una sesión activa.
              </div>

              {/* Botones de acción */}
              <div className="w-full space-y-3 mt-4">
                <button
                  onClick={() => window.location.href = `${baseUrl}/`}
                  className="w-full px-4 py-3 bg-teal-600 rounded-lg inline-flex justify-center items-center text-gray-50 text-sm font-bold font-['DM_Sans'] hover:bg-teal-700 transition-colors"
                >
                  Ir al Inicio
                </button>
                <button
                  onClick={handleLogout}
                  className="w-full px-4 py-3 bg-gray-500 rounded-lg inline-flex justify-center items-center text-gray-50 text-sm font-bold font-['DM_Sans'] hover:bg-gray-600 transition-colors"
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

  // Si NO está logueado, mostrar formulario de login
  return (
    <div className="w-screen h-screen flex overflow-hidden bg-white mt-[100px]">
      
      {/* IZQUIERDA: Imagen (sin bordes redondeados) */}
      <div
        className="hidden lg:block w-[35%] h-full bg-cover bg-center shadow-md"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1524544187526-2b2855b65f16?ixlib=rb-4.1.0&auto=format&fit=crop&q=60&w=1200')",
        }}
      ></div>

      {/* DERECHA: Formulario */}
      <div className="flex-1 flex justify-center items-start lg:items-start h-full px-6 lg:px-16">
        <form
          onSubmit={handleSubmit}
          className="w-80 flex flex-col justify-start items-center mt-6 pb-6 overflow-y-auto max-h-[90vh]"
        >
          {/* Logo de Antóloga */}
          <div className="w-32 h-32 flex justify-center items-center mb-4">
            <img
              src={LogoIcon}
              alt="Antóloga Logo"
              className="w-full h-full object-contain"
            />
          </div>

          {/* Título */}
          <div className="flex flex-col justify-start items-start gap-3">
            <div className="w-80 text-center justify-start text-zinc-800 text-4xl font-bold font-['Montserrat'] leading-[48px]">
              Sign in
            </div>
            <div className="w-80 text-center justify-start text-slate-500 text-base font-normal font-['Nunito'] leading-normal">
              {userType === "customer" ? "Use Your OpenID to Sign in" : "Business Partner Login"}
            </div>
          </div>

          {/* Mensaje de error/éxito */}
          {message && (
            <div className={`w-80 text-center text-sm font-medium ${
              message.includes("✅") ? "text-green-600" : "text-red-500"
            }`}>
              {message}
            </div>
          )}

          {/* Botones sociales con logos reales desde Internet / base64 */}
          <div className="inline-flex justify-center items-center gap-3 flex-wrap">
            <button 
              type="button"
              className="w-36 px-5 py-3 bg-gray-50 rounded-lg shadow outline outline-2 outline-offset-[-2px] outline-gray-200 flex justify-center items-center gap-2 hover:bg-gray-100 transition"
            >
              <img
                src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAABa1BMVEX////qQzU0qFNChfT7vAXg6P0ufPM4gPSdu/j7ugCxyPrqPi/qQTMopUsupk9AhPXpOSnpNCLpLxvpOir739385OIdo0XpNSTrSDr7vgD7twD98O/rTD5Dg/n5/foqpUxSs2vympX2trLtXlPpOja33cCNypxeuHUzqUo/rVzh8eX609D4w7/1qqX/+vrwg3vucGfveXHxjIXtZVv619TylY78xTz8zFj+89f81Hf95Kr92IT93Zj++ef96b/80Gj7xCz+9N7946JBhuzF5M3N59OTzaGr2Lbu+PE2pGtzwIb3vbn0pJ7sV0r3pQ3uZz/yhkD2oS/5syXwd0X1ljX4qy7sWDz7xkfzjDv7zozw9P5Vlubd7PCxzee1zPaJtOpmoeFHjePA2Off1YyPs0der1KKsPXSuyyvuEGBs0zIujaftkGSuuVarlO/uTbKuBo/jdQ8lrE5nYw8kr86mps1pGc+j8w6mKQ3oICcZUs3AAALc0lEQVR4nO2c+3fixhWAZZm1q9UDSWAJFiqBCWAw2F5Y7yvZxK0NOJhtHk2bNutt7G27222SNk2ff34lgXkIzTAaaUYSh++HnJw9Zy19njv33nloGWbDhg0bNmzYsCEUjgqFvcPWfns0KpdPy+XRqL3fOtwrFI6ifrEQKOxdjTonFUFVFUWXbTLOf3VFUdVc5WFn1NorRP2SuBQetY+7OcsrwwvClheCwGdkRSl2O/vZpGkWWqfdomK7eaq5RPmMrhdP2o8SY5ltd3M6mty8pqznTq4SIPmoXNR1n3YzS12utGMtmS1vqTJg0iFLqpX9mObYo6uKpRfA7g5L8vgwaptlsqeCwoeg5yBkrIGMV7QePtQzYQzfDF7Jlfei1ppy1VUwcwsMQRY68XBsVcILT5djJnMcvWOrohPymzh2op2P2S6p8Zs56qPo/AodlbCf46hvtSIS3Ncz5P0cR/UkiumYPVHCz58geHlEu885GmUoBOgMQa88oiqYrej0BnAML5cpCrZlqgM4xhpGWrOxQHMGzsPrV1QED3lKKXQZQT2mkHDaEQ3gGJl4pB511CgFrUgVyJb/QleP1G/LTjhtgoJ7xcim4Jyi0iE2GQ+FCIrEMrxCai62QtmFCQzPkxLcjzSJTuEFYoIRJ9EJfI6UYDsmgsUsIcG4jODaC+ZICbbWPckcUl8MeiIQKxN7gc5aQoNcHSwU49HJbJESPOrGoBclmUWZ48hXEzYEBdtq1HI2BAUPY1En+C1igoUQT80Egeczzm2aDA+6fwL4m8SyKMOchJJlBF5WVFV+2T22L0SVy53jk5e6quoy2u+PXJmwd50Cywm8rvMno1bWvS4/enRV7soI9zbIdTIMkw245BUEWc4dX8FeMLt/sgU/ICe3XLJ+y5VApV7I6C/LCIcNR4fHRfApOcEsyjCjIJWQV3Id5LOUQuuh7B0vRAWzAW5X8Irf2yJ7pzmP/p7ccsmmix2jvNpt+d/wK7SLbkeSScbeeML0E5QK5o2mo7YuL/wkgmXC+o1irgkFOcgB0cLNAJJ10OIYr9bzymmw587OXsktl8YPwmq4BTmEs+g27wwj0SzKYKYZIZyD6GzXGkbSgi2cNJMphnRn8uhUIS3I4HQzSje8+1ktcsulyQP8dzOCGjDFLEL6MNv/EAoqyXPL0Hn+q+IHPgX1qK6e4fE4n/rMl6KQSZbgx1wqn//8A/SeRsjE8OI5jCdcKpXKf1FEVRSUZI0g89QWtBS/RIxUQU2YIPNsbJjKp9AiNVlZ1MJI3ZHPf4GgGLTVps/zB6mZ45cry0amG/UL++Yxl5pTzP8arigU4/VpCwJP54bQcfwqB4lUQU9YnbD4kEu5FH/zW/Aw6jTv7YZE3m2Yyj8ARipfifp1/eMO0vFk/Mo7pwoK3dvlobAUpJNI9Wxw5MQVCsYrSCeR6tHgCHLUb4vBU29BO1J/txSpKp175eHyEcjQbsVdZSOJacZV7t2KrlZcTV4pZJgXYL+UuxXnk9euMc7aF+441+AkbVE45tkKQytS7xocvhLTj+bhfL3K0IrUSYOj7Ef9sji8AFTDBcVxgyPkEremsAFWQ1ekWovGTCfql8UCUg3dkaonsCO1+ATN0G5wElntGWN1opk6/h77Kd/cI8s3kGejJJoJ3FNsw/s7ZHkFefYvPNaGAMEUtiBzf3ebKOeQZz9HH8In8TXcuQY/23v162n4PL6Gu6/Bz17Zs80M8achecNvwc9+gm6IL0jcMA1ONcYZqiH3dZwNwanmRR55CD+KseH2jgE0RC8WARINBUNgMkUvhw8CJBoKhm9Aj/4Y3RAYB3Ew3P0D6NE+Cn4AQQqGwHLxS+RUehZvwxvQoxFXhwGLBXlDcEFEN/wk3oa3oEcjt6Xcs3gbAks+uuGHa28YpKWhYLi9MUy84WYeIhgmNZeufz1cm54GaLgufSnYcF3WFuC+dG3WhzegR6/LGh+8PlyXfZrd74GGa7LXBt7FWJP9Uti2/nrseUP22tbk3AJ2+LQeZ0+QPe81OT/cBi4P1+UMGNy0UTvHJ31+eAN+to+7GA/+GF/D+5CHo96n4VJ/KuEb7uzikEY2hJxyo64QubM/s2IP1/Dez7B4i6oIu6ng+SmCh+A7lmXNGq4hJq9Rg3sXtvBBSTUc9x1r07ikJufwFtEQlkoZlPul3Nl7R5DVqpTUxhi3iFGafgv9OSv7Nu5dYyzISqUgy2DfXO+gBilwZeGw6p439xd2inZBSc4BeRpC+m4b+F19LvV+JshKdUpyDq9QUynsWpsN7HsL7t0P7Dw0BxE5SNOvVkweSEXk/sYuIpWoyDl8j1wrIHe+HIA3va02hnVDMZ2eI9d7+DRkgN+ucWc/LAmyrEhDzuYNcpCew64IO3ivgrm/evhZhrQam1eoQbpyGno3blzqO09BK06xu1NfXCMvR8A7iTOWw9RutAFQSjY36Ib3Vv+0pTCdtTFecdon78e8QV45pc8RGi13mHKgCJ0oUohT5Fm4ulY4LBR9Lg+M0Emckl9jIDdsluHKWmEz/+9iOEtBOCbp5s1AroVoQTr/b5tw8402EI1wyUBPM9BNqHnullBc/v1qP1txQFLwNWqxRw7SaefmbrQhigRb8Os0coyuWt7P4ZzQLDXakSgiL+2dIUQo92OsdTCXX260wUgmIUUDvVBsr9hlW+Sxd6NNX9FHloF+SrLE879D2hhvRSKB+q2PLIOycJqjJPk0JJJR/Qmi5xmbqujbMPS6aNz4Etzege3mL4MxiKxWD7OB85dkkPuZKReaf0PWbITXhl/f+jyiQi8VE+oYg8hKoS2mXvso9FhDyDBNnEG0FlOlMIbRuEE/TMMdQoYZYiQbexhDSDjVc385BmsIGeYSz9AaRjHYJmOzrrE//pz8EDLMAC9OLbQSfvm/rGkSKx38w59i+hbrmAgr2ThIWv0C65HNmmg6P+HgJ/R17/aKk23I40xcQ9uxVPVbHY3eUJxOjYNPb9GH0U9HukAfdyqOHRs1P3m12S9p879Sk/0nsqKvjnQeA6ezmX9JsdRHkjR6/ZIouh4mHfwLsSii7bB50gwyiM5bimJjWG1CH9KrDhtLeg4H/ztHGUacSjEFP5/OMEVNqverzaXXMJoXg1pJ0zztxooSStnAjlGHeoBsM4ckapZJoz6s9fuDfr9WG9Ybzh+Z8Hlgl41VkYq6wQbAkIJNxcX3lUxTtDFNCfXnWmUDPozpc/S9C096IcRpIA7+DY9U1B1EMGFMxUDAy0aAPDoFswUPD1jZ2MVr1xYxQso2ATj4FDAZ09sBJ+GYy0aI2QYPU/qPp6LPvRkgzTATKh7SwX89InUHZ83kyUXUU5H1bHACVsIFqlEnVNajbOyuvneRMEXXuhhz1Qsk8rJoc/DT9nQyBu5lYqo4XRentwP3MvFUNNlx2UinwxeMx1yclA0ygvZ5TeR1kR2XDUKC1kKDjYUi+yMpQau7aUTeo9oHQPBtkWBcliJvb8QS2VtYxjDifKMNiX8FMdCinIwajcuQPSmyyShRulpu1COKVJFojllgEEllpDAFZzTp51RTInpDcAmjv2IzN2y0OrUIvaNJczaaIt0BnDAQaYVqBAM4xjmSJo8o0f2acwErVEk7mlqN6recS1yUiFYOSRxS/uDY05HYOJpiVBPQRZVMrJrikM53VSj0hlrIeVUSzWE8xu+OZo0NcSAlrdGPfv65MaolyJm8Hz1Rq0dYH6A0+42gkpZeYxC/4ZvDkvS+O4KmJzb68Zp9njQHdda/pWXH1gcJ0Btz2avVGysvk0zlTCs06/1erIPTg8veYGhp2p4gUcl209j6cNBMmt0dxmWz2q8NS5Jm3w+ax/4DtjSs9S+al9H2naFgWKa9i8Fg0B9j/d9FzzJbA7UNGzZs2LBhQzz4P7gp2NndMM1XAAAAAElFTkSuQmCC"
                alt="Google"
                className="w-5 h-5"
              />
              <span className="text-zinc-800 text-sm font-medium font-['Poppins'] leading-normal">
                Google
              </span>
            </button>

            <button 
              type="button"
              className="w-36 px-5 py-3 bg-gray-50 rounded-lg shadow outline outline-2 outline-offset-[-2px] outline-gray-200 flex justify-center items-center gap-2 hover:bg-gray-100 transition"
            >
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg"
                alt="Apple"
                className="w-5 h-5"
              />
              <span className="text-zinc-800 text-sm font-medium font-['Poppins'] leading-normal">
                Apple ID
              </span>
            </button>
          </div>

          {/* Separador */}
          <div className="w-80 text-center justify-start text-slate-500 text-xs font-normal font-['Poppins'] leading-tight my-3">
            Or continue with {userType === "customer" ? "email" : "nametag"}
          </div>

          {/* Inputs */}
          <div className="flex flex-col gap-4 w-full">
            {/* Email/Nametag */}
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

            {/* Password */}
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

          {/* Forgot password */}
          <div className="w-80 text-center text-zinc-800 text-xs font-semibold font-['Poppins'] leading-tight cursor-pointer hover:text-teal-600 mt-3">
            Forgot password?
          </div>

          {/* Botón Login */}
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