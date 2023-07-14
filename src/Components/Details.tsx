import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Edit } from "./Edit";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { API_URL } from "../services/API_URL";
import EditedInfo from "./EditedInfo";
import * as DOMPurify from "dompurify";
import { PhotoProvider, PhotoView } from "react-photo-view";
import "react-photo-view/dist/react-photo-view.css";
import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import {
  faFile,
  faFileExcel,
  faFilePdf,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./Details.css";

interface secData {
  question: string;
  answer: string;
  modifyInfo: string;
  editedBy: string;
}

export const Details = () => {
  const { id } = useParams();
  let navigate = useNavigate();

  const [secondaryData, setSecondary] = useState<secData[]>([]);

  const [Details, setDetails] = useState<React.SetStateAction<any>>();

  const [reloadKey, setReloadKey] = useState(0);

  const [postCreatorRole, setPostCreatorRole] = useState();
  const fetchDetails = async () => {
    try {
      const response = await fetch(`${API_URL}questions/${id}`);

      if (!response) {
        console.log("error");
      }
      const data = await response.json();
      setDetails(data);

      const responseRole = await fetch(
        `${API_URL}userinfo/${data.Item.createdBy}`
      );
      if (!responseRole) {
        console.log("error");
      }
      const role = await responseRole.json();
      setPostCreatorRole(role.Item.rolePosition);

      if (data.Item.secondary.length === 0) {
        setSecondary([]);
      } else {
        setSecondary(data.Item.secondary);
      }
    } catch (err) {
      console.log("error", err);
    }
  };

  useEffect(() => {}, [reloadKey]);

  useEffect(() => {
    const fetchDetail = async () => {
      try {
        const response = await fetch(`${API_URL}questions/${id}`);

        if (!response) {
          console.log("error");
        }
        const data = await response.json();
        setDetails(data);

        console.log(data);

        const responseRole = await fetch(
          `${API_URL}userinfo/${data.Item.createdBy}`
        );
        if (!responseRole) {
          console.log("error");
        }
        const role = await responseRole.json();
        setPostCreatorRole(role.Item.rolePosition);

        if (data.Item.secondary.length === 0) {
          setSecondary([]);
        } else {
          setSecondary(data.Item.secondary);
        }
      } catch (err) {
        console.log("error", err);
      }
    };
    fetchDetail();
  }, [id, reloadKey]);

  const handleEditSuccess = async () => {
    console.log("success");
    await fetchDetails();
    setReloadKey((prevKey) => prevKey + 1);
  };

  const MySwal = withReactContent(Swal);

  const handleDelete = async () => {
    const s3keys = Details.Item.s3Keys;

    const requestOptions = {
      method: "delete",
      body: JSON.stringify({ s3keys }),
      headers: { "Content-Type": "application/json" },
    };
    MySwal.fire({
      title: "Deleting...",
      allowOutsideClick: false,
      didOpen: () => {
        MySwal.showLoading();
      },
    });

    await fetch(`${API_URL}questions/${id}`, requestOptions)
      .then((response) => response)
      .then((res) => {
        MySwal.close();
        MySwal.fire({
          position: "center",
          icon: "success",
          title: '"Question Answer Delete!',
          showConfirmButton: false,
          timer: 1500,
        });
      })
      .catch((error) => {
        MySwal.close();
        MySwal.fire({
          icon: "error",
          title: "Oops...",
          text: "Something went wrong!",
        });
      });
    navigate("/");
  };

  const { auth }: any = useAuth();

  const handleDownload = (fileUrl: any, fileName: string) => {
    const link = document.createElement("a");
    link.href = fileUrl;

    link.download = fileName;

    // Programmatically trigger the click event
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <>
      {Details && (
        <div className="container-fluid h-100">
          <div className="row mt-3 ">
            <div className="col-lg-8 col-md-8 p-4 h-100">
              <h3>Q: {Details.Item.question} </h3>
              <div>created by {Details.Item.createdBy}</div>
              {secondaryData?.length > 0 ? (
                <div>
                  last edited by {secondaryData[0]?.editedBy} at{" "}
                  {secondaryData[0]?.modifyInfo}
                </div>
              ) : (
                <></>
              )}

              <br />
              <div
                dangerouslySetInnerHTML={{
                  __html: DOMPurify.sanitize(Details.Item.answer),
                }}
              />
              {Details.Item.imageLocation !== "null" ? (
                // <img
                //   style={{ marginLeft: "20px" }}
                //   className="previewimg"
                //   src={Details.Item.imageLocation}
                //   alt="UploadImage"
                //   width="200"
                //   height="200"
                // />
                <PhotoProvider>
                  <div>
                    {Details.Item.imageLocation.map((file: any, index: any) => {
                      const FileType = () => {
                        const fileExtension = file
                          .substring(file.lastIndexOf(".") + 1)
                          .toLowerCase()
                          .toString();
                        //console.log(fileExtension);

                        return fileExtension;
                      };
                      const fltype = FileType();
                      //console.log(FileType());
                      if (
                        fltype === "png" ||
                        fltype === "jpeg" ||
                        fltype === "jpg"
                      ) {
                        //console.log(file);
                        return (
                          <div
                            className="single__image"
                            style={{
                              display: "inline-flex",
                              flexDirection: "column",
                              verticalAlign: "bottom",
                              margin: "10px",
                            }}
                            key={index}
                          >
                            <PhotoView src={file}>
                              <img
                                src={file}
                                style={{
                                  height: "150px",
                                  width: "150px",
                                }}
                                alt="Uploaded_Image"
                              />
                            </PhotoView>
                          </div>
                        );
                      } else if (
                        fltype === "mp4" ||
                        fltype === "mov" ||
                        fltype === "avi" ||
                        fltype === "mkv"
                      ) {
                        return (
                          <div
                            key={index}
                            style={{
                              display: "inline-flex",
                              flexDirection: "column",
                              verticalAlign: "bottom",
                              margin: "10px",
                            }}
                          >
                            <video controls width="272" height="150">
                              <source src={file} type="video/mp4" />
                            </video>
                          </div>
                        );
                      } else {
                        // Helper function to get the file icon based on file type
                        const getFileIcon = (
                          fileType: string
                        ): IconDefinition => {
                          // Define the mapping of file types to FA icons
                          const iconMap: { [key: string]: IconDefinition } = {
                            pdf: faFilePdf,
                            xlsx: faFileExcel,
                            xls: faFileExcel,
                            // Add more file types and their respective FA icons
                          };

                          // Return the FA icon based on the file type
                          return iconMap[fileType] || faFile;
                        };
                        // Split the URL by "/"
                        const urlParts = file.split("/");

                        // Get the last part of the URL
                        const lastPart = urlParts[urlParts.length - 1];

                        // Decode the URL-encoded string
                        const decodedString = decodeURIComponent(
                          lastPart.replace("%20", " ")
                        );

                        // Extract the original filename
                        const originalFilename: any =
                          decodedString.split("?")[0];

                        const fileName = originalFilename.substring(36);

                        return (
                          <div
                            className="single__image"
                            key={index}
                            style={{
                              display: "inline-flex",
                              flexDirection: "column",
                              verticalAlign: "bottom",
                              margin: "10px",
                            }}
                          >
                            <div
                              onClick={() => handleDownload(file, fileName)}
                              style={{ cursor: "pointer" }}
                            >
                              <span>
                                <FontAwesomeIcon
                                  className="fa-6x"
                                  icon={getFileIcon(fltype)}
                                />
                                <br></br>
                                {fileName}
                              </span>
                            </div>
                          </div>
                        );
                      }
                    })}
                  </div>
                </PhotoProvider>
              ) : (
                <></>
              )}
            </div>

            {auth.id === Details.Item.createdBy ||
            (auth.role === "Admin" && postCreatorRole === "User") ? (
              <div
                className="col-lg-4 col-md-4 d-flex flex-column justify-content-center align-items-center"
                style={{ borderLeft: "5px solid black" }}
              >
                <div className="card text-center bg-light text-dark mb-4 col-sm-6 col-md-10">
                  <div className="card-header">Actions</div>
                  <div className="card-body">
                    <Edit
                      details={Details}
                      fetchDetails={fetchDetails}
                      onEditSuccess={handleEditSuccess}
                    />
                    <button
                      className="btn btn-danger w-100 mb-3"
                      onClick={handleDelete}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-6 h-6 mb-2"
                        style={{ height: "20px", width: "20px", margin: "5px" }}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                        />
                      </svg>
                      Delete Post
                    </button>
                  </div>
                </div>
                {/* <div className="container d-flex flex-column w-50 mb-4 justify-content-center">
                  <Edit
                    details={Details}
                    onEdit={handleEdit}
                    fetchDetails={fetchDetails}
                  />
                  &nbsp; &nbsp;
                  <button
                    className="btn btn-sm btn-danger"
                    onClick={handleDelete}
                  >
                    Delete
                  </button>
                  &nbsp; &nbsp;
                  {/* <button
                    className="btn btn-sm btn-info"
                    onClick={() => {
                      showEditedInfo();
                    }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-1 h-1"
                      style={{ width: "20px", height: "20px" }}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99"
                      />
                    </svg>
                    Refresh Prev Edits
                  </button> */}
                {/* </div> */}
                {secondaryData.length > 0 ? (
                  <div
                    className="container d-flex justify-content-center"
                    style={{ paddingBottom: "100px" }}
                  >
                    <ul className="list-group">
                      <EditedInfo data={secondaryData} />
                    </ul>
                  </div>
                ) : (
                  <div className="container d-flex justify-content-center">
                    <ul className="list-group">
                      <p>No Edited Info Present</p>
                    </ul>
                  </div>
                )}
              </div>
            ) : (
              <></>
            )}
          </div>
        </div>
      )}
    </>
  );
};

//old return for edited info
// return (
//   <div
//     className="accordion"
//     id="accordionExample"
//     key={val.editId}
//     style={{ marginBottom: "10px" }}
//   >
//     <div className="accordion-item">
//       <h2 className="accordion-header" id={`heading` + val.editId}>
//         <button
//           className="accordion-button"
//           type="button"
//           data-bs-toggle="collapse"
//           data-bs-target={`#collapse` + val.editId}
//           aria-expanded="true"
//           aria-controls={`collapse` + val.editId}
//         >
//           {val.modifyInfo}
//         </button>
//       </h2>
//       <div
//         id={`collapse` + val.editId}
//         className="accordion-collapse collapse"
//         aria-labelledby={`heading` + val.editId}
//         data-bs-parent="#accordionExample"
//       >
//         <div className="accordion-body">
//           Ques: {val.question}
//           <br />
//           Ans: {val.answer}
//         </div>
//       </div>
//     </div>
//   </div>
// );
