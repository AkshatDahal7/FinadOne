const Bill = require("../model/bill");
const Vendor = require("../model/vendor");


const billHandler = async(req,res)=>{
    try{
        const {billNumber, vendorName , companyName , amount , status ,
            issueDate , dueDate , paymentDate
        } = req.body;
        const bill = new Bill({
            billNumber, vendorName , companyName , amount , status ,
            issueDate , dueDate , paymentDate
        })
        await bill.save();
        res.status(201).send(bill);
    }
    catch(e){
        console.log("In billHandler")
        console.log(e);
    }
}

const vendorHandler = async(req,res)=>{
    try{
        const {vendorType, firstName, lastName, displayName, email, workPhone,
            mobile, companyName,salutation, address, taxRate, currency, paymentTerms,
            reportingTags, remarks, contactPersons, customFields
        } = req.body;
        const vendor = new Vendor({
            vendorType, firstName, lastName, displayName, email, workPhone,
            mobile, companyName,salutation, address, taxRate, currency, paymentTerms,
            reportingTags, remarks, contactPersons, customFields
        })
        await vendor.save();
        res.status(201).send(vendor);
    }
    catch(e){
        console.log("In vendorHandler")
        console.log(e);
    }
}

module.exports = {billHandler, vendorHandler};
