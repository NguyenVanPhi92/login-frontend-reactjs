import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Route, Routes, useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Footer from "./components/Footer/Footer";
import Headers from "./components/Headers/Header";
import Loading from "./components/Loading/Loading";
import Login from "./feature/Login/Login";
import Register from "./feature/Register/Register";
import HomePage from "./pages/HomePage";

function App() {
  const user = useSelector((state) => state.auth.login.currentUser);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, []);

  return (
    <div>
      <Headers />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/loading" element={<Loading />} />
      </Routes>
      <Footer />
      <ToastContainer />
    </div>
  );
}

export default App;
