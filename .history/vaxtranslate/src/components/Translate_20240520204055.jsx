import React, {useRef, useState} from "react";
import Upload from "../img/upload.png";

const Translate = () => {
  const fileInputRef = useRef(null);
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileUploadClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
    console.log("Selected file:", file);
  };

  return (
    <div className="d-flex align-items-center justify-content-center" style={{marginTop: "50px"}}>
      <div className="d-flex align-items-center justify-content-center"> 
        <div className="card shadow p-5 d-flex flex-column align-items-center" style={{ width: "800px", height: "650px", borderRadius: "10px" }}>
          <div className="file-upload  text-center" style={{ backgroundColor: "#E2F0FF", border: "2px dashed #3485FF", cursor: "pointer", borderRadius: "10px", padding: "70px 140px 30px 140px" }}>
            {selectedFile ? (
                <div style={{ width: "200px", height: "200px" }}> {/* Added container for sizing */}
                  <img 
                    src={URL.createObjectURL(selectedFile)} 
                    alt="Uploaded" 
                    className="mb-4" 
                    style={{ 
                      borderRadius: "10px", 
                      width: "100%",  // Make image fit container width
                      height: "100%", // Make image fit container height
                      objectFit: "contain", // Maintain aspect ratio and fit within container
                    }} 
                    onClick={handleFileUploadClick} 
                  />
                </div>
              ) : (
                <>
                  <input 
                    type="file" 
                    ref={fileInputRef} 
                    style={{ display: "none" }} 
                    onChange={handleFileChange} 
                  />
                  <img src={Upload} alt="upload" className="mb-4" style={{ borderRadius: "10px" }} onClick={handleFileUploadClick} /> 
                  <h5 className="fw-bold text-uppercase">Drag & drop items or UPLOAD</h5> 
                  <p className="small text-muted">Supported formats: JPEG, PNG, PDF, SVG, BMP, TIFF, TGA</p>
                </>
              )}
          </div>
          
          <div className="row mt-4">
            <div className="col">
              <button className="btn btn-outline-primary rounded-pill w-100">Button 1</button>
            </div>
            <div className="col">
              <button className="btn btn-outline-primary rounded-pill w-100">Button 2</button>
            </div>
            <div className="col">
              <button className="btn btn-outline-primary rounded-pill w-100">Button 3</button>
            </div>
            <div className="col">
              <button className="btn btn-outline-primary rounded-pill w-100">Button 4</button>
            </div>
          </div>

          <div className="mt-5">
            <button className="btn btn-primary btn-lg rounded-pill" style={{boxShadow: "0 2px 4px rgba(0,0,0,0.2)", padding: "10px 80px 10px 80px", marginTop: "50px"}}>Translate</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Translate;
