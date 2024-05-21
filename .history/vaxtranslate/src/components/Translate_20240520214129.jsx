import React, { useRef, useState } from "react";
import Upload from "../img/upload.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import "../App.css";

const Translate = () => {
  const fileInputRef = useRef(null);
  const [selectedFiles, setSelectedFiles] = useState([]);

  const handleFileUploadClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (event) => {
    const files = Array.from(event.target.files);
    setSelectedFiles((prevFiles) => [...prevFiles, ...files]);
  };

  const handleFileDelete = (index) => {
    setSelectedFiles((prevFiles) =>
      prevFiles.filter((_, i) => i !== index)
    );
  };

  return (
    <div className="flex items-center justify-center mt-20">
      <div className="flex items-center justify-center">
        <div className="bg-white shadow-md rounded-md p-5 flex flex-col items-center flex-grow w-full max-w-3xl h-[42rem]">
          <div
            onClick={handleFileUploadClick}
            className="file-upload text-center"
            style={{
              backgroundColor: "#E2F0FF",
              border: "2px dashed #3485FF",
              cursor: "pointer",
              borderRadius: "10px",
              padding: "70px 140px 30px 140px",
            }}
          >
            <input
              type="file"
              ref={fileInputRef}
              style={{ display: "none" }}
              onChange={handleFileChange}
            />
            <img
              src={Upload}
              alt="upload"
              className="mb-4"
              style={{ borderRadius: "10px", width: "100px" }}
            />
            <h5 className="font-bold text-uppercase">
              Drag & drop items or UPLOAD
            </h5>
            <p className="text-sm text-gray-500">
              Supported formats: JPEG, PNG, PDF, SVG, BMP, TIFF, TGA
            </p>
          </div>

          <div className="mt-4 grid grid-cols-4 gap-4 w-full">
            <div className="col">
              <button className="btn btn-outline-primary rounded-pill w-full">
                Button 1
              </button>
            </div>
            <div className="col">
              <button className="btn btn-outline-primary rounded-pill w-full">
                Button 2
              </button>
            </div>
            <div className="col">
              <button className="btn btn-outline-primary rounded-pill w-full">
                Button 3
              </button>
            </div>
            <div className="col">
              <button className="btn btn-outline-primary rounded-pill w-full">
                Button 4
              </button>
            </div>
          </div>

          <div className="mt-4 w-full file-list overflow-y-auto max-h-48">
            {selectedFiles.map((file, index) => (
              <div
                key={index}
                className="flex items-center border rounded p-2 mb-2"
              >
                <img
                  src={URL.createObjectURL(file)}
                  alt="uploaded"
                  style={{ width: "50px", marginRight: "20px" }}
                />
                <span className="mr-auto">{file.name}</span>
                <button
                  onClick={() => handleFileDelete(index)}
                  className="btn btn-link p-0"
                >
                  <FontAwesomeIcon
                    icon={faTimes}
                    className="h-5 w-5 text-gray-500"
                  />
                </button>
              </div>
            ))}
          </div>

          <div className="mt-auto">
            <button
              className="btn btn-primary btn-lg rounded-pill"
              style={{
                boxShadow: "0 2px 4px rgba(0,0,0,0.2)",
                padding: "10px 80px 10px 80px",
                marginTop: "50px",
              }}
            >
              Translate
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Translate;
