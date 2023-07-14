import React from "react";
import { useRef, useState, useEffect } from "react";
import useAuth from "../hooks/useAuth";
import axios from "../api/axios";
import { Link, useNavigate, useLocation } from "react-router-dom";
const LOGIN_URL = "logininfo";

const Login = () => {
  const { setAuth }: any = useAuth();

  const navigate = useNavigate();
  const location: any = useLocation();
  const from = location.state?.from?.pathname || "/";

  const emailRef: any = useRef();
  const errRef: any = useRef();
  const errRole: any = useRef();

  const [email, setEmail] = useState("");
  const [pwd, setPwd] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [errRoleMsg, setErrRoleMsg] = useState("");

  //const [success, setSuccess] = useState(false);

  //=====================================================
  useEffect(() => {
    const checkLogin = async () => {
      try {
        const response = await axios.post(
          "tokeninfo",
          JSON.stringify({ token: localStorage.getItem("token") }),
          {
            headers: { "Content-Type": "application/json" },
            withCredentials: true,
          }
        );

        const name = response.data.Item.fullName;
        const id = response.data.Item.id;
        const password = response.data.Item.password;
        const role = response.data.Item.rolePosition;
        setAuth({ name, id, password, role });

        setEmail("");
        setPwd("");

        console.log(role, "check");

        navigate(from, { replace: true });
      } catch (err: any) {
        if (!err.response) {
          setErrMsg("No Server Response");
        } else if (err.response?.status === 400) {
          setErrMsg("Missing Email or Password");
        } else if (err.response?.status === 401) {
          setErrMsg("Invalid Credentials");
        } else {
          setErrMsg("Login Failed");

          localStorage.removeItem("token");
        }
        errRef.current.focus();
      }
    };

    if (localStorage.getItem("token")) {
      checkLogin();
      console.log("hi login");
    }
  });

  //=====================================================

  useEffect(() => {
    emailRef.current.focus();
  }, []);

  useEffect(() => {
    setErrMsg("");
    setErrRoleMsg("");
  }, [email, pwd]);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    //console.log(email, pwd);

    try {
      const response = await axios.post(
        LOGIN_URL,
        JSON.stringify({ id: email, password: pwd }),
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );

      // const response = await axios.get(LOGIN_URL+email);
      // console.log(response.data.Item);
      // if(response.data.Item.fullName)

      //console.log(JSON.stringify(response?.data));
      //console.log(JSON.stringify(response));

      // var role = response.data.Item.rolePosition;
      // var name = response.data.Item.fullName;
      // var id = response.data.Item.id;
      // var password = response.data.Item.password;

      const name = response.data.Item.fullName;
      const id = response.data.Item.id;
      const password = response.data.Item.password;
      const role = response.data.Item.rolePosition;
      // setAuth({name, email, pwd, role, accessToken})
      setAuth({ name, id, password, role });
      // console.log(
      //   "Name: ",
      //   name,
      //   "Email: ",
      //   id,
      //   "Pwd: ",
      //   password,
      //   "Role: ",
      //   role
      // );

      //setSuccess(true);

      if (role === "Default") {
        setErrRoleMsg("You Don't Have Permission to Login");
        errRole.current.focus();
      } else {
        localStorage.setItem("token", response.data.token);
        setEmail("");
        setPwd("");
        navigate(from, { replace: true });
      }

      console.log(role, "handlesubmit");

      // navigate(from, { replace: true });
    } catch (err: any) {
      if (!err.response) {
        setErrMsg("No Server Response");
      } else if (err.response?.status === 400) {
        setErrMsg("Missing Email or Password");
      } else if (err.response?.status === 401) {
        setErrMsg("Invalid Credentials");
      } else {
        setErrMsg(" Failed, Please Login again");
      }
      errRef.current.focus();
    }
  };

  return (
    <>
      {/* {success ? (
            <section>
                <h1>You are logged In.</h1>
                <br />
                <p>
                <Link to={'/home'}>Go to Home</Link>
                <Link to={'/master'}>master</Link>
                </p>
            </section>
        ) : ( */}
      <div className="App container-fluid p-4">
        <section>
          <p
            ref={errRef}
            className={errMsg ? "errmsg" : "offscreen"}
            aria-live="assertive"
          >
            {errMsg}
          </p>
          <p
            ref={errRole}
            className={errRoleMsg ? "errmsg" : "offscreen"}
            aria-live="assertive"
          >
            {errRoleMsg}
          </p>

          <div className="row justify-content-center">
            <div className="col-md-4 mt-2">
              <form onSubmit={handleSubmit}>
                <div className="card">
                  <div className="card-header  text-center">
                    <h4>Sign In</h4>
                  </div>
                  <div className="card-body">
                    {/* <h5 className="card-title">Special title treatment</h5> */}
                    <p className="card-text">
                      <label htmlFor="email" className="mb-3">
                        Email
                      </label>
                      <input
                        type="text"
                        id="email"
                        ref={emailRef}
                        autoComplete="nope"
                        onChange={(e) => setEmail(e.target.value)}
                        value={email}
                        required
                        className="form-control mb-3"
                      />
                      <label htmlFor="password" className="mb-3">
                        Password{" "}
                      </label>
                      <input
                        type="password"
                        id="password"
                        onChange={(e) => setPwd(e.target.value)}
                        value={pwd}
                        required
                        className="form-control mb-3"
                      />
                    </p>
                    {/* <a href="#" className="btn btn-primary">
                    Go somewhere
                  </a> */}
                  </div>
                  <div className="card-footer">
                    <div className="row">
                      <div className="col-md-8 my-auto">
                        Need an Account?
                        <span>
                          <Link to={"/register"}> Sign Up </Link>
                          {/* put router link */}
                        </span>
                      </div>
                      <div style={{ textAlign: "right" }} className="col-md-4">
                        <button
                          style={{ backgroundColor: "rgb( 255, 153, 0)" }}
                          className="btn btn-md "
                        >
                          Sign In
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </section>
      </div>
      {/* )} */}
    </>
  );
};

export default Login;
