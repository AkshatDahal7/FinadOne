import React from "react";
import { CiSettings } from "react-icons/ci";
const TopBar=()=>{
    return(
        <div className="NavBarWhole">
            <div className="NavBarTop">
                <div className="profile">

                </div>
                <div className="settings">
                    <CiSettings />
                </div>
            </div>

        </div>
    )
}
export default TopBar;