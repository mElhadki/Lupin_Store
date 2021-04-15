import { useEffect, useState } from "react";
import "../styles/Auth.css";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loginAction } from "../store/actions";
function Auth() {
  let history = useHistory();
  const dispatch = useDispatch();
  const isLog = useSelector((state) => state.logged.logged);

  useEffect(() => {
    var urlString = window.location.search;
    var urlParam = new URLSearchParams(urlString);
    var auth = urlParam.get("auth");
    if (auth === "false") {
      toast.error("not authorized !", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
    if (isLog == true) {
      history.push("/Home?alreadyLogin=true");
    }
  }, []);

  function login() {
    var data = {
      phone: phoneLogin,
      password: passwordLogin,
    };
    axios
      .post("http://localhost:8080/buyers/login", data)
      .then(async (response) => {
        if (response.data.error !== undefined) {
          response.data.error.forEach((element) => {
            toast.error(element);
          });
        } else {
          await localStorage.setItem("x-access-token", response.data.token);
          toast.success("login successful", { autoClose: 2000 });

          setTimeout(() => {
            dispatch(loginAction());
            history.push("/Home?login=true");
          }, 2000);
        }
      });
  }
  const [fullname, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [phoneLogin, setPhoneLogin] = useState("");
  const [passwordLogin, setPasswordLogin] = useState("");

  function register() {
    var data = {
      fullname,
      phone,
      username,
      password,
      email,
    };
    axios
      .post("http://localhost:8080/buyers/register", data)
      .then((response) => {
        if (response.data.error !== undefined) {
          response.data.error.forEach((element) => {
            toast.error(element);
          });
        } else {
          toast.success(response.data.notif, {
            autoClose: 6000,
          });
        }
      });
  }

  useEffect(() => {
    var signup = document.getElementById("signup");
    signup.addEventListener("click", () => {
      var pinbox = document.getElementsByClassName("pinkbox");
      for (var i = 0; i < pinbox.length; i++) {
        pinbox[i].style.transform = "translateX(80%)";
      }

      var signin = document.getElementsByClassName("signin");
      for (var i = 0; i < signin.length; i++) {
        signin[i].classList.add("nodisplay");
      }

      var signupClass = document.getElementsByClassName("signup");
      for (var i = 0; i < signupClass.length; i++) {
        signupClass[i].classList.remove("nodisplay");
      }
    });

    var signin = document.getElementById("signin");
    signin.addEventListener("click", () => {
      var pinbox = document.getElementsByClassName("pinkbox");
      for (var i = 0; i < pinbox.length; i++) {
        pinbox[i].style.transform = "translateX(0%)";
      }

      var signin = document.getElementsByClassName("signin");
      for (var i = 0; i < signin.length; i++) {
        signin[i].classList.remove("nodisplay");
      }

      var signupClass = document.getElementsByClassName("signup");
      for (var i = 0; i < signupClass.length; i++) {
        signupClass[i].classList.add("nodisplay");
      }
    });
  });
  return (
    <div className="container2">
      <ToastContainer />
      <div className="welcome">
        <div className="pinkbox">
          <div className="signup nodisplay">
            <h1>register</h1>

            <input
              type="text"
              placeholder="username"
              onChange={(e) => setUsername(e.target.value)}
            />
            <input
              type="text"
              placeholder="fullname"
              onChange={(e) => setFullName(e.target.value)}
            />
            <input
              type="text"
              placeholder="phone"
              onChange={(e) => setPhone(e.target.value)}
            />
            <input
              type="email"
              placeholder="email"
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              placeholder="password"
              onChange={(e) => setPassword(e.target.value)}
            />
            <button className="button submit" onClick={register}>
              create account{" "}
            </button>
          </div>
          <div className="signin">
            <h1>sign in</h1>
            <input
              type="text"
              onChange={(e) => setPhoneLogin(e.target.value)}
              placeholder="username"
            />
            <input
              type="password"
              onChange={(e) => setPasswordLogin(e.target.value)}
              placeholder="password"
            />
            <button onClick={login} className="button submit">
              login
            </button>
          </div>
        </div>
        <div className="leftbox">
          <h2 className="title">
            <span>BLOOM</span>&<br />
            JEWELLERY
          </h2>
          <p className="desc">
            pick your perfect <span>Jewellery</span>
          </p>
          <img
            className="flower smaller"
            src="https://i.postimg.cc/zB2ZfRQb/Rings-Icons-02.png"
            alt="1357d638624297b"
            border="0"
          />
          <p className="account">have an account?</p>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              marginRight: "26px",
            }}
          >
            <button className="button" id="signin">
              login
            </button>
          </div>
        </div>
        <div className="rightbox">
          <h2 className="title">
            <span>BLOOM</span>&<br />
            JEWELLERY
          </h2>
          <p className="desc">
            {" "}
            pick your perfect <span>Jewellery</span>
          </p>
          <img
            className="flower"
            src="https://i.postimg.cc/zB2ZfRQb/Rings-Icons-02.png"
            alt="ring"
          />
          <p className="account">don't have an account?</p>

          <div
            style={{
              display: "flex",
              justifyContent: "center",
              marginRight: "26px",
            }}
          >
            <button className="button" id="signup">
              sign up
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Auth;
