import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { API_URL } from "../services/API_URL";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import useAuth from "../hooks/useAuth";
import "./AddQnA.css";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { PhotoProvider, PhotoView } from "react-photo-view";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFilePdf,
  faFileExcel,
  faFile,
  IconDefinition,
} from "@fortawesome/free-solid-svg-icons";

const AddQnA = () => {
  const [Question, setQuestion] = useState("");
  const [Answer, setAnswer] = useState("");
  let navigate = useNavigate();
  const MySwal = withReactContent(Swal);

  interface image {
    preview: string;
    data: string;
  }
  const [selectedAllFiles, setSelectedAllFiles] = useState<image[]>([]);

  const { auth }: any = useAuth();

  const handleFileChange = (e: any) => {
    console.log(e.target.files);

    if (selectedAllFiles.length < 4) {
      const selectedFiles = e.target.files;
      const selectedFilesArray = Array.from(selectedFiles);

      let imagesArray = selectedFilesArray.map((file: any) => {
        return {
          preview: URL.createObjectURL(file),
          data: file,
          name: file.name,
          type: file.type,
        };
      });
      if (selectedAllFiles.length > 0) {
        const newImagesArray = selectedAllFiles.map((file: any) => {
          return {
            preview: file.preview,
            data: file.data,
            name: file.name,
            type: file.type,
          };
        });
        imagesArray = [...imagesArray, ...newImagesArray];
      }
      console.log(imagesArray.length);
      if (imagesArray.length <= 4) {
        setSelectedAllFiles(imagesArray);
      } else {
        toast.error("Maximum 4 images can be uploaded");
      }
    } else {
      toast.error("Maximum 4 images can be uploaded");
    }
  };

  const handleAdd = async (e: any) => {
    if (Question === "" || Answer === "") {
      alert("please Add all the fields");
      return;
    }
    const current = new Date();
    const currentDateTime = current.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });

    const date =
      `${current.getDate()}/${
        current.getMonth() + 1
      }/${current.getFullYear()}` +
      " " +
      `${currentDateTime}`;

    const formData = new FormData();

    for (let i = 0; i < selectedAllFiles.length; i++) {
      console.log(selectedAllFiles[i].data);
      formData.append("images", selectedAllFiles[i].data);
    }

    const data = {
      question: Question,
      answer: Answer,
      createdBy: auth.id,
      authorRole: auth.role,
      status: 1,
      dateLog: date,
      secondary: [],
    };

    console.log(date);
    formData.append("data", JSON.stringify(data));

    const requestOptions = {
      method: "POST",
      body: formData,
    };
    MySwal.fire({
      title: "Uploading...",
      allowOutsideClick: false,
      didOpen: () => {
        MySwal.showLoading();
      },
    });
    await fetch(API_URL + "Questions", requestOptions)
      .then((response) => {
        //console.log(response);
      })
      .then((res) => {
        console.log(res);
        MySwal.close();
        MySwal.fire({
          position: "center",
          icon: "success",
          title: "Question Answer Added!",
          text: "You're being rediected to homePage",
          showConfirmButton: false,
          timer: 1500,
        });
      })
      .catch((error) => {
        MySwal.close();
        MySwal.fire({
          position: "center",
          icon: "error",
          title: "Oops..  ",
          text: "Something went wrong!",
          showConfirmButton: false,
          timer: 1500,
        });
      });
    navigate("/");
  };
  const handleDownload = (fileUrl: any) => {
    // Perform the download action using the provided fileUrl
    window.open(fileUrl, "_blank");
  };

  return (
    <>
      <ToastContainer />
      <div className="container-lg mt-3">
        <div className="row justify-content-center my-3">
          <div className="col-lg-6 text-start">
            <h2 style={{ textAlign: "center" }}>
              Add Q<span style={{ color: "red" }}>n</span>A
            </h2>
            <form>
              <div className="mb-3">
                <label htmlFor="question" className="form-label">
                  Question<span style={{ color: "red" }}>*</span>
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="question"
                  value={Question}
                  onChange={(e) => {
                    setQuestion(e.target.value);
                  }}
                />
              </div>

              <div className="my-3">
                <label htmlFor="answer" className="form-label">
                  Answer<span style={{ color: "red" }}>*</span>
                </label>

                <ReactQuill theme="snow" value={Answer} onChange={setAnswer} />
              </div>
              <div className="my-3 image__div">
                <label htmlFor="images" className="add__image">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5"
                    />
                  </svg>
                  Add Files
                  <br />
                  <span>(max 4 files)</span>
                  <input
                    type="file"
                    name="images"
                    id="images"
                    onChange={handleFileChange}
                    multiple
                    accept="*/*"
                  />
                </label>
                <PhotoProvider>
                  {selectedAllFiles &&
                    selectedAllFiles.map((file: any, index) => {
                      if (file.type.startsWith("image")) {
                        return (
                          <div className="single__image" key={index}>
                            <PhotoView src={file.preview}>
                              <img
                                src={file.preview}
                                style={{
                                  height: "120px",
                                  width: "120px",
                                }}
                                alt="Uploaded_Image"
                              />
                            </PhotoView>

                            <button
                              className="image__delete"
                              onClick={(e) => {
                                e.preventDefault();
                                setSelectedAllFiles(
                                  selectedAllFiles.filter((e) => e !== file)
                                );
                              }}
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={1.5}
                                stroke="currentColor"
                                className="w-6 h-6"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  d="M6 18L18 6M6 6l12 12"
                                />
                              </svg>
                              Remove
                            </button>
                          </div>
                        );
                      } else if (file.type.startsWith("video")) {
                        return (
                          <div className="single__image" key={index}>
                            <video controls width="272" height="150">
                              <source src={file.preview} type="video/mp4" />
                            </video>
                            <button
                              className="image__delete"
                              onClick={(e) => {
                                e.preventDefault();
                                setSelectedAllFiles(
                                  selectedAllFiles.filter((e) => e !== file)
                                );
                              }}
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={1.5}
                                stroke="currentColor"
                                className="w-6 h-6"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  d="M6 18L18 6M6 6l12 12"
                                />
                              </svg>
                              Remove
                            </button>
                          </div>
                        );
                      } else {
                        const getFileIcon = (
                          fileType: string
                        ): IconDefinition => {
                          const iconMap: { [key: string]: IconDefinition } = {
                            "application/pdf": faFilePdf,
                            "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet":
                              faFileExcel,
                          };

                          return iconMap[fileType] || faFile;
                        };
                        return (
                          <div className="single__image" key={index}>
                            <div
                              key={index}
                              onClick={() => handleDownload(file.preview)}
                              style={{ cursor: "pointer" }}
                            >
                              <span>
                                <FontAwesomeIcon
                                  className="fa-6x"
                                  icon={getFileIcon(file.type)}
                                />
                                <br></br>
                                {file.name}
                              </span>
                            </div>
                            <button
                              className="image__delete"
                              onClick={(e) => {
                                e.preventDefault();
                                setSelectedAllFiles(
                                  selectedAllFiles.filter((e) => e !== file)
                                );
                              }}
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={1.5}
                                stroke="currentColor"
                                className="w-6 h-6"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  d="M6 18L18 6M6 6l12 12"
                                />
                              </svg>
                              Remove
                            </button>
                          </div>
                        );
                      }
                    })}
                </PhotoProvider>
              </div>

              {selectedAllFiles?.length > 0 && selectedAllFiles?.length > 10 ? (
                <p>Please upload less than 10 images.</p>
              ) : (
                <button
                  type="button"
                  className="btn btn-primary btn-lg"
                  onClick={handleAdd}
                >
                  Add QnA
                </button>
              )}
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddQnA;
