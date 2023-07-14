import React, { useEffect, useState } from "react";
// import { useState } from "react";
// import { Modal } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { useFetchMaster } from "../FetchingApi/useFetchMaster";
import { API_URL } from "../services/API_URL";

interface dataDetails {
  id: string;
  name: string;
  rolePosition: string;
}

export const UserEdit = (id: any, fullName: any) => {
  //console.log(id.id);
  //console.log(fullName.fullName);
  // const [fullName, setFullName] = useState(name);
  // const [role, setRole] = useState(rolePosition);
  const [role, setRole] = useState<string>();
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const MySwal = withReactContent(Swal);
  const { kFetch, masterData } = useFetchMaster();
  const Did = id;

  useEffect(() => {
    kFetch(`${API_URL}userinfo/${id}`);
  }, [id, kFetch]);

  // console.log("role", role);
  // console.log("fullname", fullName);

  const handleSave = () => {
    //console.log("masterData", masterData);

    // const data = {
    //   fullName: fullName,
    //   rolePosition: role,
    // };

    // const requestOptions = {
    //   method: "put",
    //   headers: { "Content-Type": "application/json" },
    //   body: JSON.stringify(data),
    // };
    // fetch(`http://localhost:5000/userinfo/${data}`, requestOptions)
    //   .then((response) => response)
    //   .then((res) =>
    //     MySwal.fire({
    //       position: "center",
    //       icon: "success",
    //       title: '"Question Answer Edit Sucessfully!',
    //       showConfirmButton: false,
    //       timer: 1500,
    //     })
    //   )
    //   .catch((error) => {
    //     MySwal.fire({
    //       icon: "error",
    //       title: "Oops...",
    //       text: "Something went wrong!",
    //     });
    //   });

    // console.log("Handle Save");
    setShow(false);
  };
  // console.log(data);

  return (
    <>
      <Button className="btn btn-sm btn-warning" onClick={handleShow}>
        Edit
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="row">
            <div className="col-md-12">
              <label>
                <b>Name</b>
              </label>
              <input
                className="form-control"
                id="Question"
                defaultValue={fullName.fullname}
              // onChange={(e) => {
              //   setFullName(e.target.value);
              // }}

              // readOnly
              />
              <br />

              <label>
                <b> Role</b>
              </label>
              <div>
                <input
                  type="radio"
                  value="User"
                  name="role"
                  // checked={this.state.selectedOption === "Other"}
                  onChange={(e) => {
                    setRole(e.target.value);
                  }}
                />{" "}
                User &nbsp;
                <input
                  type="radio"
                  value="Admin"
                  name="role"
                  // checked={this.state.selectedOption === "Other"}
                  onChange={(e) => {
                    setRole(e.target.value);
                  }}
                />{" "}
                Admin &nbp;
              </div>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSave}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
