import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NavBar from "../core/components/common/navbar";
import Dashboard from "../core/pages/dashboard";
import Banking from "../core/pages/Banking";
import Sales from "../core/pages/Sales";
import Purchases from "../core/pages/Purchases";
import SideNav from "../core/components/common/SideNav";
import CustomerForm from "../core/components/sales/CustomerForm";
import CustomerList from "../core/components/sales/CustomerList";
import VendorForm from "../core/components/purchases/PurchaseForm";
import VendorList from "../core/components/purchases/PurchasesTable";
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
                    <Route path = "/sales/customer" element = {<CustomerList/>}/>
                    <Route path = "purchases/vendor" element = {<VendorList/>}/>

                    
                </Routes>
        </Router>
    )
}

export default ARouter;