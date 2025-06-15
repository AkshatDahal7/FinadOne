import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import './NavBar.css'
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
        >Home</div>

         <div
        className={`nav-item ${CurrentPage === "/about" ? "active" : ""}`}
        onClick={() => handlePageChange("/about")}
      >
        ℹ️ About
      </div>
      <div
        className={`nav-item ${CurrentPage === "/contact" ? "active" : ""}`}
        onClick={() => handlePageChange("/contact")}
      >
        📞 Contact
      </div>
        </div>
        
    )
}
export default NavBar;