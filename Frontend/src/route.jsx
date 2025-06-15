import { BrowserRouter as Route ,Router, Routes} from "react-router-dom";
import NavBar from "../core/components/common/navbar";
import Dashboard from "../core/pages/dashboard";
import Banking from "../core/pages/Banking";
import Sales from "../core/pages/Sales";
import Purchases from "../core/pages/Purchases";


const ARouter=()=>{
    return(
        <Router>
            <NavBar>
                <Routes>


                    <Route path ="/" element = {Dashboard} />
                    <Route path = "/banking" element = {Banking}/>
                    <Route path= "/sales" element = {Sales}/>
                    <Route path ="/purchases" element = {Purchases}/>

                    
                </Routes>
            </NavBar>
        </Router>
    )
}

export default ARouter;