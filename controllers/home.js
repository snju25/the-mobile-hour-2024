import express from "express"

const homeController = express.Router()

homeController.get("/",(req,res)=>{
    res.status(200).render('home.ejs')
})



export default homeController