import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

export const Header = ({ setSearchTerm }: any) => {
  let navigate = useNavigate();
  const [temp, setTemp] = useState("");

  const { auth }: any = useAuth();
  const { setAuth }: any = useAuth();

  const location = useLocation();

  const searchHandle = (e: any) => {
    e.preventDefault();
    if (temp === "") {
      alert("Please enter the fields ");
      return;
    }
    setSearchTerm(temp.toLowerCase());
    navigate("/results");
  };

  const logout = async () => {
    // if used in more components, this should be in context
    // axios to /logout endpoint
    setAuth({});
    localStorage.removeItem("token");
    navigate("/login");
  };

  //console.log(location);

  if (auth.role === "Master")
    return (
      <>
        <div
          className="container-fluid d-flex  align-items-center justify-content-between header"
          style={{
            backgroundImage: "linear-gradient(to right, #F0E68C , #FBCEB1)",
          }}
        >
          <h4>
            {" "}
            <Link
              to="/"
              style={{
                textDecoration: "none",
                color: "black",
                marginLeft: "10px",
              }}
            >
              QnA-Portal{" "}
            </Link>
          </h4>

          <div className="d-flex align-items-center">
            {location.pathname === "/" ? (
              <form className="form-inline my-2 my-lg-1 d-flex mx-5">
                <input
                  className="form-control mr-sm-2"
                  type="search"
                  placeholder="Search"
                  aria-label="Search"
                  onChange={(event) => setTemp(event.target.value)}
                  // onChange={searchHandle}
                />
                <button className="btn" type="submit" onClick={searchHandle}>
                  <img
                    src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' class='bi bi-search' viewBox='0 0 16 16'%3E%3Cpath d='M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z'%3E%3C/path%3E%3C/svg%3E"
                    alt="search"
                  />
                </button>
              </form>
            ) : (
              <></>
            )}

            <Link to="/" style={{ textDecoration: "none", color: "black" }}>
              <button
                className="btn btnHeader"
                style={{ backgroundColor: "rgb( 255, 153, 0)", margin: "10px" }}
              >
                Home
              </button>
            </Link>

            <Link
              to="/master"
              style={{ textDecoration: "none", color: "black" }}
            >
              <button
                className="btn btnHeader"
                style={{ backgroundColor: "rgb( 255, 153, 0)", margin: "10px" }}
              >
                Master Portal
              </button>
            </Link>

            {/* Master cannot Add posts now */}
            {/* <Link to="/add" style={{ textDecoration: "none", color: "black" }}>
              <button
                className="btn btnHeader"
                style={{ backgroundColor: "rgb( 255, 153, 0)", margin: "10px" }}
              >
                Add New
              </button>
            </Link> */}
            <button
              className="btn btnHeader"
              style={{ backgroundColor: "rgb( 255, 153, 0)", margin: "10px" }}
              onClick={logout}
            >
              Sign Out
            </button>
          </div>
        </div>
      </>
    );
  else
    return (
      <>
        <div
          className="container-fluid d-flex  align-items-center justify-content-between header"
          style={{
            backgroundImage: "linear-gradient(to right, #F0E68C , #FBCEB1)",
          }}
        >
          <h4>
            {" "}
            <Link
              to="/"
              style={{
                textDecoration: "none",
                color: "black",
                margin: "10px",
              }}
            >
              <b>QnA-Portal</b>
            </Link>
          </h4>
          {location.pathname === "/login" ||
          location.pathname === "/register" ? (
            <></>
          ) : (
            <div className="d-flex align-items-center">
              {location.pathname === "/" || location.pathname === "/results" ? (
                <form className="form-inline my-2 my-lg-1 d-flex mx-5">
                  <input
                    className="form-control mr-sm-2"
                    type="search"
                    placeholder="Search"
                    aria-label="Search"
                    onChange={(event) => setTemp(event.target.value)}
                    // onChange={searchHandle}
                  />
                  <button className="btn" type="submit" onClick={searchHandle}>
                    <img
                      src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' class='bi bi-search' viewBox='0 0 16 16'%3E%3Cpath d='M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z'%3E%3C/path%3E%3C/svg%3E"
                      alt="search"
                    />
                  </button>
                </form>
              ) : (
                <></>
              )}

              <Link to="/" style={{ textDecoration: "none", color: "black" }}>
                <button
                  className="btn btnHeader"
                  style={{
                    backgroundColor: "rgb( 255, 153, 0)",
                    margin: "10px",
                  }}
                >
                  Home
                </button>
              </Link>

              {/* Master Portal not visible to Admin and Users. */}

              {location.pathname === "/add" ? (
                <></>
              ) : (
                <Link
                  to="/add"
                  style={{ textDecoration: "none", color: "black" }}
                >
                  <button
                    className="btn btnHeader"
                    style={{
                      backgroundColor: "rgb( 255, 153, 0)",
                      margin: "10px",
                    }}
                  >
                    Add New
                  </button>
                </Link>
              )}

              <button
                className="btn btnHeader"
                style={{ backgroundColor: "rgb( 255, 153, 0)", margin: "10px" }}
                onClick={logout}
              >
                Sign Out
              </button>
            </div>
          )}
        </div>
      </>
    );
};
