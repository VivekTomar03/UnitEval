const express = require("express")
const emiRouter = express.Router()

emiRouter.post("/cal" , async(req,res)=> {
  const {loanamt, intrest,month} = req.body
    const r = ((intrest/12)/100).toFixed(4)
    // console.log(r)
   // EMI:E = P x r x ( 1 + r )n / ( ( 1 + r )n - 1 ) 
   const EMI = loanamt*r*(1+r)*month / ((1+r)*month-1)
   console.log(EMI*3)
   console.log(loanamt+(EMI*3))
   res.send({
    EMI:+EMI.toFixed(4),
    InterestPayable:+(EMI*3).toFixed(4),
    TotalPayment:+(loanamt+(EMI*3)).toFixed(4),
    Formula:"EMI:E = P x r x ( 1 + r )n / ( ( 1 + r )n - 1 )"
   })
})

module.exports= {
    emiRouter
}