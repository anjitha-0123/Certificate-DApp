import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'
import { BrowserProvider, Contract } from 'ethers'
import {abi} from '../assets/Cert.json'
import { CertModuleVCert } from "../assets/deployed_addresses.json"
import Navbar from '../components/Navbar';


const IssuePage = () => {
  const [cId,setCId ] = useState("") 
  const [course,setCourse ] = useState("Certified Blockchain Associate")
  const [cName,setCName ] = useState("")
  const [grade,setGrade ] = useState("S")
  const [issueDate,setIssueDate ] = useState("")
  const [error,setError ] = useState("")
  const navigate=useNavigate()


  const provider= new BrowserProvider(window.ethereum)
    async function connectToMetamask(){
        const signer=await provider.getSigner();
        console.log("signer",signer.address)
        
    }   
    async function issueCertificate(e){
        e.preventDefault()
        const signer=await provider.getSigner();
        console.log("signer",signer.address)
        const instance =new Contract(CertModuleVCert,abi,signer)

        const txl = await instance.issue(
          Number(cId), 
          cName,
          course,
          grade,
          issueDate
        );
        console.log('formdata',txl)
        navigate('/')
    }
  
  return (
    <>
    
    <div className="bg-slate-300 h-[100vh]">
     <Navbar/>
    <div className="bg-white border border-gray-300 shadow-lg rounded-xl p-8 w-full max-w-2xl ml-auto mr-auto mt-8">
    <h3 className="text-2xl mt-7 text-center">ISSUE NEW CERTIFICATE</h3>
      <form onSubmit={issueCertificate}>

        <label className="block text-gray-700 font-medium" >Select Course*</label>
        <select 
          className="w-full mt-2 px-3 py-2 border border-gray-400 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500" 
          value={course} 
          onChange={(e)=>setCourse(e.target.value)} 
        >
          <option>Certified Blockchain Associate</option>
          <option>Certified Blockchain Architect</option>
          <option>Cyber Security</option>
        </select>

        <label className="block text-gray-700 font-medium">Certificate Id*</label>
        <input 
          className="w-full mt-2 px-3 py-2 border border-gray-400 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500" 
          value={cId} 
          onChange={(e)=>setCId(e.target.value)} 
          type="text" placeholder="Certificate Id" required 
        />

        <label className="block text-gray-700 font-medium">Candidate name*</label>
        <input 
          className="w-full mt-2 px-3 py-2 border border-gray-400 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          value={cName} onChange={(e)=>setCName(e.target.value)}
          type="text" placeholder="name" required
        />

        <label className="block text-gray-700 font-medium">Select Grade*</label>
        <select 
          className="w-full mt-2 px-3 py-2 border border-gray-400 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500" 
          value={grade} onChange={(e)=>setGrade(e.target.value)}>
            <option>S</option>
            <option>A</option>
            <option>B</option>
            <option>C</option>
            <option>D</option>
            <option>Failed</option>
        </select>

        <label className="block text-gray-700 font-medium">Issue Date *</label>
        <input 
          className="w-full mt-2 px-3 py-2 border border-gray-400 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          value={issueDate} onChange={(e)=>setIssueDate(e.target.value)}
          type="date" required
        />
        <button 
          type="submit" 
          className="border-solid rounded-lg text-white text-sm w-full mt-4 h-10 bg-blue-500 "
          >Issue Certificate
        </button>
      </form>
    </div>
    </div>
    </>
  )
}

export default IssuePage


