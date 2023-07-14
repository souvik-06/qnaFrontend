import React from "react";

const Footer = () => {
  return (
    <>
      <div
        className="container-fluid mt-5 "
        style={{
          margin: "0px",
          padding: "0px",
          marginBottom: "0px",
          position: "relative",
          left: "0",
          bottom: "0",
          width: "100%",
        }}
      >
        <footer
          className="text-center text-lg-start text-white"
          style={{ backgroundColor: "#3e4551" }}
        >
          <div className="container p-2">
            <section className="">
              <div className="row">
                <div className="col-lg-4 col-md-6 mb-4 mb-md-0">
                  <h5 className="">Sample Footer</h5>

                  <p>Lorem ipsum dolor</p>
                </div>

                <div className="col-lg-2 col-md-6 mb-4 mb-md-0">
                  <h5 className="text-uppercase">Links</h5>

                  <ul className="list-unstyled mb-0">
                    <li>
                      <a href="#!" className="text-white">
                        Link 1
                      </a>
                    </li>
                  </ul>
                </div>

                <div className="col-lg-2 col-md-6 mb-4 mb-md-0">
                  <h5 className="text-uppercase">Links</h5>

                  <ul className="list-unstyled mb-0">
                    <li>
                      <a href="#!" className="text-white">
                        Link 1
                      </a>
                    </li>
                  </ul>
                </div>

                <div className="col-lg-2 col-md-6 mb-4 mb-md-0">
                  <h5 className="text-uppercase">Links</h5>

                  <ul className="list-unstyled mb-0">
                    <li>
                      <a href="#!" className="text-white">
                        Link 1
                      </a>
                    </li>
                  </ul>
                </div>

                <div className="col-lg-2 col-md-6 mb-4 mb-md-0">
                  <h5 className="text-uppercase">Links</h5>

                  <ul className="list-unstyled mb-0">
                    <li>
                      <a href="#!" className="text-white">
                        Link 1
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </section>
          </div>
          <p
            className="text-center p-3"
            style={{
              backgroundColor: "rgba(0, 0, 0, 0.2)",
              marginBottom: "0rem",
            }}
          >
            <a
              className="text-white"
              href="https://nagarro.com/"
              style={{ textDecoration: "none" }}
            >
              Nagarro
            </a>
            &nbsp;<span>©</span> 2022. All rights reserved.
          </p>
        </footer>
      </div>
    </>
  );
};

export default Footer;
