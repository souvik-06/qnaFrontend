import { useRef, useState, useEffect } from "react";
import {
  faCheck,
  faTimes,
  faInfoCircle,
  faUser,
  faEnvelope,
  faLock,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "../api/axios";
import { Link, useNavigate } from "react-router-dom";
import "../Register.css";
import withReactContent from "sweetalert2-react-content";
import Swal from "sweetalert2";

const NAME_REGEX = /^[a-zA-Z ]{4,24}$/;
const EMAIL_REGEX =
  /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/;
const PWD_REGEX = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;
const REGISTER_URL = "userinfo";

const Register = () => {
  const userRef: any = useRef();
  // const emailRef: any = useRef();
  const errRef: any = useRef();

  const [name, setName] = useState("");
  const [validName, setValidName] = useState(false);
  const [nameFocus, setNameFocus] = useState(false);

  const [email, setEmail] = useState("");
  const [validEmail, setValidEmail] = useState(false);
  const [emailFocus, setEmailFocus] = useState(false);

  const [pwd, setPwd] = useState("");
  const [validPwd, setValidPwd] = useState(false);
  const [pwdFocus, setPwdFocus] = useState(false);

  const [cpwd, setCpwd] = useState("");
  const [validCpwd, setValidCpwd] = useState(false);
  const [cpwdFocus, setCpwdFocus] = useState(false);

  const [errMsg, setErrMsg] = useState("");
  const [success] = useState(false);

  let navigate = useNavigate();
  const MySwal = withReactContent(Swal);

  

  useEffect(() => {
    userRef.current.focus();
  }, []);
  //only happens when component loads and set focus on name input

  useEffect(() => {
    const result = NAME_REGEX.test(name);
    // console.log(result);
    // console.log(name);
    setValidName(result);
  }, [name]);
  //only happens when name state changes, validates name against the name regex and stores it

  useEffect(() => {
    const result = EMAIL_REGEX.test(email);
    // console.log(result);
    // console.log(email);
    setValidEmail(result);
  }, [email]);
  //validation for email when email state changes

  useEffect(() => {
    const result = PWD_REGEX.test(pwd);
    // console.log(result);
    // console.log(pwd);
    setValidPwd(result);
    const match = pwd === cpwd;
    setValidCpwd(match);
  }, [pwd, cpwd]);
  //only happens when pwd and cpwd changes, validates and stores them

  useEffect(() => {
    setErrMsg("");
  }, [name, email, pwd, cpwd]);
  //when user changes name, pass or cpass, this means user read the error and is now changing fields

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    // if button enabled with JS hack
    const v1 = NAME_REGEX.test(name);
    const v2 = PWD_REGEX.test(pwd);
    const v3 = EMAIL_REGEX.test(email);
    if (!v1 || !v2 || !v3) {
      setErrMsg("Invalid Entry");
      return;
    }
    //console.log(email, pwd);
    //setSuccess(true);

    try {
      await axios.post(
        REGISTER_URL,
        JSON.stringify({
          id: email.toLowerCase(),
          fullName: name,
          password: pwd,
          rolePosition: "Default",
        }),
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      //console.log(response?.data);
      //console.log(response?.accessToken);
      // console.log(JSON.stringify(response));
      // setSuccess(true);
      MySwal.fire({
        position: "center",
        icon: "success",
        title: '"Register successfully"',
        showConfirmButton: false,
        timer: 1500,
      });
      //clear state and controlled inputs
      //need value attrib on inputs for this
      setName("");
      setEmail("");
      setPwd("");
      setCpwd("");
      navigate("/login");
    } catch (err: any) {
      if (!err?.response) {
        setErrMsg("No Server Response");
      } else if (err.response?.status === 500) {
        setErrMsg("User already Exists");
      } else {
        setErrMsg("Registration Failed");
      }
      errRef.current.focus();
    }
  };

  return (
    <div className="container-fluid">
      {success ? (
        <section>
          <h1>Success!</h1>
          <p>
            <Link to={"/login"}>Sign In</Link>
          </p>
        </section>
      ) : (
        <div className="App">
          <div className="row justify-content-center">
            <div
              className="col-md-4"
              // style={{ textAlign: "center" }}
            >
              <div className="card mt-4">
                <div className="card-header" style={{ textAlign: "center" }}>
                  {/* <h1>Register</h1> */}
                  <h4>Register</h4>
                </div>
                <div className="card-body">
                  <form onSubmit={handleSubmit}>
                    <div className="row">
                      <div className="col-md-12">
                        <label htmlFor="name">
                          Name
                          <FontAwesomeIcon
                            icon={faCheck}
                            className={validName ? "valid" : "hide"}
                          />
                          <FontAwesomeIcon
                            icon={faTimes}
                            className={validName || !name ? "hide" : "invalid"}
                          />
                        </label>

                        <div className="input-group">
                          <div
                            className="input-group-addon form-control"
                            style={{ maxWidth: "11%" }}
                          >
                            <FontAwesomeIcon icon={faUser} />
                          </div>
                          <input
                            type="text"
                            id="name"
                            ref={userRef}
                            autoComplete="off"
                            //wont suggest earlier inputted values
                            onChange={(e) => setName(e.target.value)}
                            value={name}
                            required
                            aria-invalid={validName ? "false" : "true"}
                            aria-describedby="uidnote"
                            //aria used for screen reader
                            onFocus={() => setNameFocus(true)}
                            onBlur={() => setNameFocus(false)}
                            className="form-control"
                          />
                        </div>

                        <p
                          id="uidnote"
                          className={
                            nameFocus && name && !validName
                              ? "instructions"
                              : "offscreen"
                          }
                        >
                          <FontAwesomeIcon icon={faInfoCircle} />
                          4 to 24 characters.
                          <br />
                          Must be two words separated by space.
                          <br />
                          No numbers, underscores, or special char. allowed.
                        </p>
                        <br />
                      </div>
                      <div className="col-md-12">
                        <label htmlFor="mail">
                          Email
                          <FontAwesomeIcon
                            icon={faCheck}
                            className={validEmail ? "valid" : "hide"}
                          />
                          <FontAwesomeIcon
                            icon={faTimes}
                            className={
                              validEmail || !email ? "hide" : "invalid"
                            }
                          />
                        </label>
                        <div className="input-group">
                          <div
                            className="input-group-addon form-control"
                            style={{ maxWidth: "11%" }}
                          >
                            <FontAwesomeIcon icon={faEnvelope} />
                          </div>
                          <input
                            type="mail"
                            id="email"
                            //ref={emailRef}
                            autoComplete="nope"
                            //wont suggest earlier inputted values
                            onChange={(e) => setEmail(e.target.value)}
                            value={email}
                            required
                            aria-invalid={validEmail ? "false" : "true"}
                            aria-describedby="emnote"
                            //aria used for screen reader
                            onFocus={() => setEmailFocus(true)}
                            onBlur={() => setEmailFocus(false)}
                            className="form-control"
                          />
                        </div>
                        <p
                          id="emnote"
                          className={
                            emailFocus && email && !validEmail
                              ? "instructions"
                              : "offscreen"
                          }
                        >
                          <FontAwesomeIcon icon={faInfoCircle} />
                          Should be like example@example.com
                        </p>
                        <br />
                      </div>
                      <div className="col-md-12">
                        <label htmlFor="password">
                          Password
                          <FontAwesomeIcon
                            icon={faCheck}
                            className={validPwd ? "valid" : "hide"}
                          />
                          <FontAwesomeIcon
                            icon={faTimes}
                            className={validPwd || !pwd ? "hide" : "invalid"}
                          />
                        </label>
                        <div className="input-group">
                          <div
                            className="input-group-addon form-control"
                            style={{ maxWidth: "11%" }}
                          >
                            <FontAwesomeIcon icon={faLock} />
                          </div>
                          <input
                            type="password"
                            id="password"
                            onChange={(e) => setPwd(e.target.value)}
                            value={pwd}
                            required
                            aria-invalid={validPwd ? "false" : "true"}
                            aria-describedby="pwdnote"
                            onFocus={() => setPwdFocus(true)}
                            onBlur={() => setPwdFocus(false)}
                            className="form-control"
                          />
                        </div>

                        <p
                          id="pwdnote"
                          className={
                            pwdFocus && !validPwd ? "instructions" : "offscreen"
                          }
                        >
                          <FontAwesomeIcon icon={faInfoCircle} />
                          8 to 24 characters.
                          <br />
                          Must include uppercase and lowercase letters, a number
                          and a special character.
                          <br />
                          Allowed special characters:{" "}
                          <span aria-label="exclamation mark">!</span>{" "}
                          <span aria-label="at symbol">@</span>{" "}
                          <span aria-label="hashtag">#</span>{" "}
                          <span aria-label="dollar sign">$</span>{" "}
                          <span aria-label="percent">%</span>
                        </p>
                        <br />
                      </div>
                      <div className="col-md-12">
                        <label htmlFor="confirm_pwd">
                          Confirm Password
                          <FontAwesomeIcon
                            icon={faCheck}
                            className={validCpwd && cpwd ? "valid" : "hide"}
                          />
                          <FontAwesomeIcon
                            icon={faTimes}
                            className={validCpwd || !cpwd ? "hide" : "invalid"}
                          />
                        </label>
                        <div className="input-group">
                          <div
                            className="input-group-addon form-control"
                            style={{ maxWidth: "11%" }}
                          >
                            <FontAwesomeIcon icon={faLock} />
                          </div>
                          <input
                            type="password"
                            id="confirm_pwd"
                            onChange={(e) => setCpwd(e.target.value)}
                            value={cpwd}
                            required
                            aria-invalid={validCpwd ? "false" : "true"}
                            aria-describedby="confirmnote"
                            onFocus={() => setCpwdFocus(true)}
                            onBlur={() => setCpwdFocus(false)}
                            className="form-control"
                          />
                        </div>
                        <p
                          id="confirmnote"
                          className={
                            cpwdFocus && !validCpwd
                              ? "instructions"
                              : "offscreen"
                          }
                        >
                          <FontAwesomeIcon icon={faInfoCircle} />
                          Must match the first password input field.
                        </p>
                        <br />
                      </div>
                      <div className=" col-md-12">
                        <div className="row justify-content-center">
                          <div className="col-md-8 my-auto">
                            {" "}
                            <section>
                              <p
                                ref={errRef}
                                className={errMsg ? "errmsg" : "offscreen"}
                                aria-live="assertive"
                              >
                                {errMsg}
                              </p>
                              <p>
                                Already registered?
                                <span className="line">
                                  <Link to={"/login"}> Sign In</Link>
                                </span>
                              </p>
                            </section>
                          </div>
                          <div
                            style={{ textAlign: "right" }}
                            className="col-md-4"
                          >
                            <button
                              disabled={
                                !validName ||
                                !validPwd ||
                                !validCpwd ||
                                !validEmail
                                  ? true
                                  : false
                              }
                              className="btn btn-md"
                              style={{
                                backgroundColor: "rgb( 255, 153, 0)",
                                textAlign: "right",
                              }}
                            >
                              Sign Up
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Register;
