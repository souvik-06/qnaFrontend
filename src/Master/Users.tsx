import React, { useEffect, useState } from "react";
import { useFetchMaster } from "../FetchingApi/useFetchMaster";
// import { UserEdit } from "./UserEdit";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import withReactContent from "sweetalert2-react-content";
import Swal from "sweetalert2";
import "./RadioCss.css";
import { useNavigate } from "react-router-dom";
import { API_URL } from "../services/API_URL";

export const Users = () => {
  const [show, setShow] = useState(false);
  let { kFetch, masterData, setmasterData } = useFetchMaster();
  const handleClose = () => setShow(false);
  const [editData, seteditData] = useState<React.SetStateAction<any>>();
  const [role, setRole] = useState<string>();
  let navigate = useNavigate();
  const [sId, setsId] = useState<any>();

  const Toast = Swal.mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 1000,
    timerProgressBar: true,
    // didOpen: (toast) => {
    //   toast.addEventListener("mouseenter", Swal.stopTimer);
    //   toast.addEventListener("mouseleave", Swal.resumeTimer);
    // },
  });

  const handleShow = async (id: any) => {
    setsId(id);

    const _url = `${API_URL}userinfo/${id}`;
    const response = await fetch(_url);
    const data = await response.json();
    seteditData(data.Item);
    setShow(true);
  };
  const MySwal = withReactContent(Swal);

  useEffect(() => {
    kFetch(API_URL + "userinfo");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [masterData]);

  // const handleEdit = () => {};

  const handleSave = () => {
    const data = {
      rolePosition: role,
    };
    const requestOptions = {
      method: "put",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    };

    fetch(`${API_URL}userinfo/${sId}`, requestOptions)
      .then((response) => response)
      .then((res) =>
        Toast.fire({
          icon: "success",
          title: "Update successfully",
        })
      )
      .catch((error) => {
        MySwal.fire({
          icon: "error",
          title: "Oops...",
          text: "Something went wrong!",
        });
      });
    // console.log("master Data", masterData);

    masterData.filter((name: any, Index: any) => {
      if (name.id === sId) {
        name.rolePosition = role;
        // console.log("found");
      }
      return name;
    });
    // console.log("master Data after edit", masterData);
    setShow(false);
    navigate("/master");
  };
  const handleDelete = (id: any) => {
    const requestOptions = {
      method: "delete",
      headers: { "Content-Type": "application/json" },
    };
    fetch(`${API_URL}userinfo/${id}`, requestOptions)
      .then((response) => response)
      .then((res) =>
        MySwal.fire({
          position: "center",
          icon: "success",
          title: '"User Deleted !',
          showConfirmButton: false,
          timer: 1500,
        })
      )
      .catch((error) => {
        MySwal.fire({
          icon: "error",
          title: "Oops...",
          text: "Something went wrong!",
        });
      });

    setmasterData((prevMasterData: any[]) =>
      prevMasterData.filter((masterData) => masterData.id !== sId)
    );

    navigate("/master");
  };

  return (
    <>
      <div className="container-fluid">
        <table className="table table-striped table-hover">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Name</th>
              <th scope="col">Email</th>
              {/* <th scope="col">Password</th> */}
              <th scope="col">Role</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            {masterData &&
              masterData.map((data: any, key: number) => {
                return (
                  <tr key={key}>
                    <th scope="row">{key + 1}</th>
                    <td>{data.fullName}</td>
                    <td>{data.id}</td>
                    {/* <td>{data.password}</td> */}
                    <td>{data.rolePosition}</td>
                    <td>
                      <button
                        className="btn btn-sm btn-danger"
                        onClick={() => handleDelete(data.id)}
                      >
                        Delete
                      </button>
                      &nbsp;
                      {/* <UserEdit id={data.id} /> */}
                      <button
                        className="btn btn-sm btn-warning"
                        onClick={() => handleShow(data.id)}
                      >
                        Edit
                        {/* <UserEdit id={data.id} fullName={data.fullName} /> */}
                      </button>
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit</Modal.Title>
        </Modal.Header>
        {editData && (
          <Modal.Body>
            <div className="row">
              <div className="col-md-12">
                <label>
                  <b>Name</b>
                </label>
                <input
                  className="form-control"
                  id="Question"
                  defaultValue={editData.fullName}
                  // readOnly
                />
                <br />

                <label>
                  <b> Role</b>
                </label>
                <div>
                  <input
                    type="radio"
                    value="Default"
                    name="role"
                    // checked={editData.rolePosition === "Admin"}
                    defaultChecked={editData.rolePosition === "Default"}
                    onChange={(e) => {
                      setRole(e.target.value);
                    }}
                  />{" "}
                  Default &nbsp;
                  <input
                    type="radio"
                    value="User"
                    name="role"
                    // checked={editData.rolePosition === "User"}
                    defaultChecked={editData.rolePosition === "User"}
                    onChange={(e) => {
                      setRole(e.target.value);
                    }}
                  />{" "}
                  User &nbsp;
                  <input
                    type="radio"
                    value="Admin"
                    name="role"
                    // checked={editData.rolePosition === "Admin"}
                    defaultChecked={editData.rolePosition === "Admin"}
                    onChange={(e) => {
                      setRole(e.target.value);
                    }}
                  />{" "}
                  Admin &nbsp;
                  {/* Removed redundant code */}
                  {/* <input
                    type="radio"
                    value="Master"
                    name="role"
                    // checked={editData.rolePosition === "Admin"}
                    defaultChecked={editData.rolePosition === "Master"}
                    disabled
                    // onChange={(e) => {
                    //   setRole(e.target.value);
                    // }}
                  />{" "}
                  Master &nbsp; */}
                </div>
              </div>
            </div>
          </Modal.Body>
        )}
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
