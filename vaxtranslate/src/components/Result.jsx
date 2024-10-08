import React from "react";
import { useLocation } from "react-router-dom";
import CISResult from "./CISResult";

const Result = () => {
  const location = useLocation();
  const { cis } = location.state || {};
  console.log(cis);


  return (
    <div className="d-flex align-items-center justify-content-center mt-5">
      <div className="w-100" style={{ maxWidth: '900px' }}>
        <div
          className="bg-white shadow-md rounded-md p-5 flex flex-col"
          style={{
            width: "900px",
            borderRadius: "10px",
            margin: "0 auto",
            marginTop: "50px",
          }}
        >
          <h2 className="text-center">Certificate of Immunization (CIS)</h2>
          <CISResult cis={cis} />
        </div>
        
      </div>
    </div>
  );
};

export default Result;
