import { useState, useEffect } from "react";
import "./App.css";
import Login from "./components/login.jsx";
import MainLayout from "./components/Layout/MainLayout";
import Forgotpass from "./components/Layout/Forgotpass";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const [isAuth, setIsAuth] = useState(false);
  const [authView, setAuthView] = useState("login"); // 'login' | 'forgot'

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsAuth(!!token);
  }, []);

  return (
    <>
      {isAuth ? (
        <MainLayout />
      ) : authView === "login" ? (
        <Login onForgot={() => setAuthView("forgot")} />
      ) : (
        <Forgotpass onDone={() => setAuthView("login")} />
      )}
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </>
  );
}

export default App;
