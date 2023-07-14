import React from "react";
import useAuth from "../hooks/useAuth";
import { Users } from "./Users";

export const Master = () => {

  const {auth}:any = useAuth();
  

  return (
    <>
      <div className="container-fluid mt-2">
        <div className="row">
          <div className="col-md-4">
            {/* Master */}
            <div className="card mb-4">
              <div className="card-body text-center">
                <img
                  src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava3.webp"
                  alt="avatar"
                  className="rounded-circle img-fluid"
                  style={{ width: "90px" }}
                />
                <h5 className="my-3">{auth.name}</h5>
                <p className="text-muted mb-1">
                  Full Stack Developer/Master User
                </p>
                <p className="text-muted mb-4">Bay Area, San Francisco, CA</p>
                <div className="d-flex justify-content-center mb-2">
                  {/* <button type="button" className="btn btn-primary">
                    Follow
                  </button> */}
                  {/* <button
                    type="button"
                    className="btn btn-outline-primary ms-1"
                  >
                    Message
                  </button> */}
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-8">
            {/* User Details */}
            <Users />
          </div>
        </div>
      </div>
    </>
  );
};
