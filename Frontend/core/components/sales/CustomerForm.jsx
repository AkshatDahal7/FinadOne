
//Create new sales or invoice 

import { useState } from "react";
import "../common/page.css"
const CustomerForm= ()=>{
    const[formData, setFormData]= useState({
        customerType: "",
        primaryContactSalutation : "",
        primaryContactFName: "",
        primaryContactLName: "",
        customerEmail: "",
        customerPhone: "",
        
    })
    const [activeTab, setActiveTab] = useState('other-details')
    
    return(
        <div>

        </div>
    )
}
export default CustomerForm;