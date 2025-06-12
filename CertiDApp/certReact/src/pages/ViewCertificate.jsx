import React, { useEffect, useState } from "react";
import cImage from '../assets/images/cImage.png';
import { useParams, useNavigate } from "react-router-dom";
import { BrowserProvider, Contract } from "ethers";
import { abi } from "../assets/Cert.json";
import { CertModuleVCert } from "../assets/deployed_addresses.json";
import Navbar from "../components/Navbar";

const ViewCertificate = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [cId, setCId] = useState(id || "");  
  const [certificateData, setCertificateData] = useState(null);
  const [error, setError] = useState("");

  const fetchCertificate = async (certId) => {
    try {
      setError("");
      if (!window.ethereum) throw new Error("MetaMask not found");

      const provider = new BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const contract = new Contract(CertModuleVCert, abi, signer);

      const result = await contract.Certificates(certId);
      console.log("Fetched:", result);

      if (!result[0]) {
        throw new Error("Certificate not found.");
      }

      setCertificateData({
        cName: result[0],
        course: result[1],
        grade: result[2],
        issueDate: result[3]  
      });
    } catch (err) {
      setCertificateData(null);
      setError(err.message);
      console.error("Error fetching certificate:", err);
    }
  };

  useEffect(() => {
    if (id) fetchCertificate(id);
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (cId) {
      navigate(`/view-certificate/${cId}`);
    }
  };

  return (
    <>
      <div className="bg-slate-300 min-h-screen">
      <Navbar></Navbar>
        <div className="pt-8 flex flex-col items-center">
          <h1 className="text-center text-4xl font-semibold text-gray-800 mb-8">
            Certificate Dapp
          </h1>
          <div className="flex justify-center items-center mb-8">
            <img src={cImage} alt="Online course certification" className="h-32 w-32" />
          </div>

          
          <form onSubmit={handleSubmit} className="bg-white p-4 rounded-lg shadow-md">
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Enter Certificate ID"
                className="px-4 py-2 border rounded w-64"
                value={cId}
                onChange={(e) => setCId(e.target.value)}
              />
              <button
                type="submit"
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              >
                Search
              </button>
            </div>
          </form>

          {error && <p className="mt-4 text-red-600">{error}</p>}

          {certificateData && (
            <div className="border-2 border-gray-950 bg-slate-50 py-6 px-6 mt-8 mx-4 max-w-2xl w-full">
              <div className="border-2 border-gray-950 bg-slate-50 mx-auto">
                <h3 className="text-center text-3xl mb-4">Kerala Blockchain Academy</h3>
                <div className="flex justify-center items-center mb-4">
                  <img src={cImage} alt="course" height="150" width="150" />
                </div>
                <div className="text-center space-y-2">
                  <p>This is to certify that <strong>{certificateData.cName}</strong></p>
                  <p>has successfully completed <strong>{certificateData.course}</strong> course</p>
                  <p>with grade <strong>{certificateData.grade}</strong> on <strong>
                  {certificateData.issueDate}
                   </strong>
                  </p>

                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default ViewCertificate;


