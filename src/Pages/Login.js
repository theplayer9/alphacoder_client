import React, { useState } from "react";
import LoginImg from "../Assets/Auth/login.svg";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useUserAuth } from "../context/userContext";
import { ArrowBack } from "@mui/icons-material";
import GitHubIcon from '@mui/icons-material/GitHub';
const FETCH_URI = "https://alphacoderseverfiber.up.railway.app/";
const Login = () => {
  const [setLoggedIn, setToken] = useUserAuth();
  const router = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const ClearFormData = () => {
    setEmail("");
    setPassword("");
  };
  const gitAuth =()=>{
    window.location.assign("https://alphacoderseverfiber.up.railway.app/login/github")
  }

  const userLogin = async (e) => {
    e.preventDefault();
    const RequestOption = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    };
    const Response = await toast.promise(
      fetch(FETCH_URI + "login/jwt", RequestOption),
      {
        pending: "Verifying! please wait.",
      }
    );
    const data = await Response.text();

    const impdata = JSON.parse(data);
    if (Response.ok) {
      ClearFormData();
      console.log("token", impdata.token);
      setToken(impdata.token);
      router("/Dashboard");
    } else if (Response.status === 500) {
      toast.error(impdata.error, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };
  return (
    <div className="h-screen w-screen bg-primary text-text flex lg:flex-row flex-col font-main">
      <div className="w-full h-16 fixed lg:pl-5 flex items-center">
        <ArrowBack
          className="hover:scale-125 w-14 h-6 transition-all cursor-pointer "
          onClick={() => router("/")}
        />
      </div>
      <div className="lg:w-1/2 lg:h-full h-1/2 flex flex-col lg:justify-center items-center py-3 gap-3">
        <h1 className="font-head text-4xl md:text-6xl lg:text-6xl">
          <span className="text-primary-color">&lt;/&gt;</span>Alphacoder
        </h1>
        <img src={LoginImg} className="md:w-3/4 lg:w-2/3 sm:w-2/3" />
      </div>
      <div className="lg:w-1/2 lg:h-full lg:justify-evenly lg:bg-primary-light w-full h-1/2 flex flex-col items-center justify-between py-5">
        <div className="w-full flex items-center flex-col pt-2">
          <h1 className="text-2xl w-3/4">Let's sign you in.</h1>
          <h2 className="text-xl w-3/4">Welcome back. You've been missed!</h2>
        </div>
        {/* -----GitHub login---------- */}
        <div
          className="w-3/4  flex items-center justify-center gap-x-2 h-12 rounded-md bg-primary shadow-light-shadow"
           onClick={gitAuth}
          >
          <GitHubIcon />
          Login with GitHub
        </div>
        <form className="flex flex-col items-center w-full gap-3">
          <input
            type="email"
            required
            className="border-none w-3/4 h-12 rounded-md placeholder:text-primary-color  placeholder:font-bold placeholder:p-2  focus:outline-primary-color text-primary-color p-2"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            required
            className="border-none w-3/4 h-12 rounded-md placeholder:text-primary-color placeholder:font-bold placeholder:p-2 focus:outline-primary-color text-primary-color p-2"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            className="w-3/4 text-center h-12 rounded-md bg-primary-color"
            onClick={userLogin}
          >
            Login
          </button>
        </form>
        <div>
          Don't have an account?&nbsp;
          <span
            className="text-primary-color font-bold cursor-pointer"
            onClick={() => router("/Signup")}
          >
            Register
          </span>
        </div>
      </div>
      <ToastContainer
        position="top-right"
        toastClassName="dark-toast"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  );
};

export default Login;
