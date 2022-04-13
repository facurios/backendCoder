// import express from "express";
// import { uploader } from "../utils.js";
// const router = express.Router();


//let users = [];
// const miMiddleware = (req,res,next)=>{ //creo mi middleware
//     console.log('mi middleware')
//     next()
// }

// router.get('/',(req,res)=>{
//     res.send({status:"success", payload:users})
// })
// router.post('/',uploader.single('file'),(req,res)=>{ //middleware a nivel ruta
//     console.log(req.file)
   
//     let user = req.body;
//     user.picture = req.file.filename
//     users.push(user);
//     res.send({status:'success', messege:'user added'})
// })
// router.put('/',(req,res)=>{
    
// })
// router.delete('/',(req,res)=>{
    
// })

// export default router