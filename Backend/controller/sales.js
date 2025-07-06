
const Customer = require ("../model/customer.js");
const Invoice = require("../model/invoice.js");

const invoiceHandler = async(req,res)=>{
    try{
        const {invoiceNumber, customerName , companyName , amount , status ,
            issueDate , dueDate , paymentDate
        } = req.body;
        const invoice = new Invoice({
            invoiceNumber, customerName , companyName , amount , status ,
            issueDate , dueDate , paymentDate
        })
        await invoice.save();
        res.status(201).send(invoice);
    }
    catch(e){
        console.log("In invoiceHandler")
        console.log(e);
    }
}

const customerHandler = async(req,res)=>{
    try{
        console.log("CustomerHandlerHasbeenLOaded")
        const {customerType, firstName, lastName, displayName, email, workPhone,
            mobile, companyName,salutation, address, taxRate, currency, paymentTerms,
            reportingTags, remarks, contactPersons, customFields
        } = req.body;
        const customer = new Customer({
            customerType, firstName, lastName, displayName, email, workPhone,
            mobile, companyName,salutation, address, taxRate, currency, paymentTerms,
            reportingTags, remarks, contactPersons, customFields
        })
        await customer.save();
        res.status(201).send(customer);
    }
    catch(e){
        console.log("In customerHandler")
        console.log(e);
    }
}

module.exports = {invoiceHandler, customerHandler};
