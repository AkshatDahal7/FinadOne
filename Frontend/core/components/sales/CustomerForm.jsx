
//Create new sales or invoice 

import { useState } from "react";
import "../common/page.css"
const CustomerForm= ()=>{
    const[formData, setFormData]= useState({
        customerType: "business",
        primaryContactSalutation : "",
        primaryContactFName: "",
        primaryContactLName: "",
        customerEmail: "",
        customerPhone: "",
        
    })
    const [activeTab, setActiveTab] = useState('other-details')
    
    const tabs = [
        {id: 'other-details',label: 'Other Details'},
        {id: 'billing-address',label: 'Billing Address'},
        { id: 'contact-persons', label: 'Contact Persons' },
         { id: 'remarks', label: 'Remarks' }
    ]

    const handleInputChange = (field,value)=>{
        setFormData(prev=>({
            ...prev,
            [field]:value
        }));


    const renderOtherDetail = ()=>(
        <div>
            <h3>Other Details</h3>
            <div>
                <label>Tax rate : </label>
                <select>
                    <option>Standard Rate</option>
                    <option>Reduced Rate</option>
                </select>

            </div>
                <div>
            <label>Currency:</label>
            <select>
            <option>INR</option>
            <option>NPR</option>
            <option>USD</option>
            <option>EUR</option>
            </select>
        </div>
        </div>
    )
    }
    return(
        <div>

        </div>
    )
}
export default CustomerForm;