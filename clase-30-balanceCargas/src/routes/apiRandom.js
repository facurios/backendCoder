import express from "express";
import {fork} from "child_process";
const { Router } = express;
const router = Router();


router.get('/:cant', async (req,res) =>{    
    try{        
        const childProcess = fork('./child_random.js');
        const cantidad = Number(req.params.cant);
        childProcess.send(cantidad);
        childProcess.on('message', mensaje =>{
            res.status(200).json(mensaje);
        })
    }catch(err){
        res.status(500).json({
            success: false,
            message: err.message
        });
    }
})

router.get('/', async (req,res) =>{    
    try{
        const cantidad = 100000000;
        const childProcess = fork('./child_random.js');
        childProcess.send(cantidad);
        childProcess.on('message', mensaje =>{
            res.status(200).json(mensaje);
        })
    }catch(err){
        res.status(500).json({
            success: false,
            message: err.message
        });
    }
})
export default router;