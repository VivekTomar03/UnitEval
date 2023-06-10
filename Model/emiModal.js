const mongoose = require("mongoose")


const emiSchema = mongoose.Schema({
    loanamt:Number,
    intrest:Number,
    month:Number,
}, {
    versionKey:false
})


const EmiModal = mongoose.model("/emi", emiSchema) 
module.exports= {
   EmiModal
}