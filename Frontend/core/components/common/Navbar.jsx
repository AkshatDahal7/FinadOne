import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import './NavBar.css'
import { IoSettingsOutline } from "react-icons/io5";
import { FaHome } from "react-icons/fa";
import { FaUserCircle } from "react-icons/fa";

const NavBar = () =>{
    const [CurrentPage , setCurrentPage] = useState("")
    const navigate = useNavigate();

    const handlePageChange = (page) =>{
        setCurrentPage(page);
        navigate(page);
    }

    return(
        <div className="Navbar-overview">
            <div 
        className={`nav-item ${CurrentPage == "/"?"active":""}`}
        onClick={()=>handlePageChange("/")}
        ><FaHome /></div>

         <div
        className={`nav-item ${CurrentPage === "/setting" ? "active" : ""}`}
        onClick={() => handlePageChange("/setting")}
      >
        <IoSettingsOutline />
      </div>
      <div
        className={`nav-item ${CurrentPage === "/contact" ? "active" : ""}`}
        onClick={() => handlePageChange("/contact")}
      >
        <FaUserCircle />

      </div>
        </div>
        
    )
}
export default NavBar;