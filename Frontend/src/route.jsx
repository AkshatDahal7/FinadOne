import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NavBar from "../core/components/common/navbar";
import Dashboard from "../core/pages/dashboard";
import Banking from "../core/pages/Banking";
import Sales from "../core/pages/Sales";
import Purchases from "../core/pages/Purchases";
import SideNav from "../core/components/common/SideNav";
import Sales

const ARouter=()=>{
    return(
        <Router>
            <NavBar/>
            <SideNav/>
                <Routes>


                    <Route path ="/" element = {<Dashboard/>} />
                    <Route path = "/banking" element = {<Banking/>}/>
                    <Route path= "/sales" element = {<Sales/>}/>
                    <Route path ="/purchases" element = {<Purchases/>}/>

                    
                </Routes>
        </Router>
    )
}

export default ARouter;