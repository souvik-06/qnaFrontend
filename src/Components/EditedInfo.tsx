import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import {
  faFile,
  faFileExcel,
  faFilePdf,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import DOMPurify from "dompurify";
import { Accordion } from "react-bootstrap";
import { PhotoProvider, PhotoView } from "react-photo-view";

const EditedInfo = ({ data }: any) => {
  //console.log(data);
  return (
    <>
      <h5 className="mb-3">Previous Edits </h5>
      <div
        className="list-group pe-1"
        style={{ overflow: "auto", height: "350px" }}
      >
        <Accordion>
          {data.map((val: any, index: number) => (
            <Accordion.Item eventKey={index.toString()} key={index}>
              <Accordion.Header>
                <div>
                  {val.modifyInfo}
                  <br />
                  {val.editedBy}
                </div>
              </Accordion.Header>
              <Accordion.Body>
                <div
                  dangerouslySetInnerHTML={{
                    __html: DOMPurify.sanitize(val.answer),
                  }}
                />
                <PhotoProvider>
                  {val.imgdata.map((file: any, index: number) => {
                    const FileType = () => {
                      const fileExtension = file
                        .substring(file.lastIndexOf(".") + 1)
                        .toLowerCase()
                        .toString();
                      //console.log(fileExtension);

                      return fileExtension;
                    };
                    const fltype = FileType();
                    if (
                      fltype === "png" ||
                      fltype === "jpeg" ||
                      fltype === "jpg"
                    ) {
                      //console.log(file);
                      return (
                        <div className="single__image" key={index}>
                          <PhotoView src={file}>
                            <img
                              src={file}
                              style={{
                                height: "100px",
                                width: "100px",
                                margin: "10px",
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
                        <div key={index}>
                          <video controls width="162" height="100">
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
                      const originalFilename: any = decodedString.split("?")[0];

                      const fileName = originalFilename.substring(36);

                      return (
                        <div key={index}>
                          <div>
                            <span>
                              <FontAwesomeIcon icon={getFileIcon(fltype)} />
                              {fileName}
                            </span>
                          </div>
                        </div>
                      );
                    }
                  })}
                </PhotoProvider>
              </Accordion.Body>
            </Accordion.Item>

            // <div
            //   key={index}
            //   className="list-group-item list-group-item-action list-group-item-dark"
            //   aria-current="true"
            //   style={{ maxHeight: "150px" }}
            // >
            //   <div className="d-flex w-100 justify-content-between">
            //     <h5 className="mb-1">{val.changeDesc}</h5>
            //     <small>{val.modifyInfo}</small>
            //   </div>
            //   <p className="mb-1">
            //     {/* {val.answer.length > 40
            //       ? val.answer.substring(0, 40) + "..."
            //       : val.answer} */}
            //     {val.editedBy}

            //   </p>
            //   <small></small>
            // </div>
          ))}
        </Accordion>
      </div>
    </>
  );
};

export default EditedInfo;
