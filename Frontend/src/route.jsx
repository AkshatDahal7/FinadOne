import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NavBar from "@core/components/common/navbar";
import Dashboard from "@core/pages/dashboard";
import Banking from "@core/pages/Banking";
import Sales from "@core/pages/Sales";
import Purchases from "@core/pages/Purchases";
import SideNav from "@core/components/common/SideNav";
import CustomerList from "@core/components/sales/CustomerList";
import VendorList from "@core/components/purchases/PurchasesTable";
import InvoiceList from "@core/components/sales/InvoiceHome";
import BillList from "@core/components/purchases/BillHome";
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
                    <Route path = "/sales/invoice" element = {<InvoiceList/>}/>
                    <Route path = "/purchases/bill" element = {<BillList/>}/>


                    
                </Routes>
        </Router>
    )
}

export default ARouter;