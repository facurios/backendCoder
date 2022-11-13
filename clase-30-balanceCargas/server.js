const PORT = puerto;
const modo = modoServer;
const { fork } = require('child_process');
const os = require('os');
const CPUs = os.cpus();
const numCPUs = CPUs.length;
const cluster = require('cluster');

if(cluster.isPrimary && modo === 'cluster'){
    console.log(`Primary ${process.pid} is running`);
    for (let i = 0; i < numCPUs; i++) {
        cluster.fork();
    }
    cluster.on('online', (worker, code, signal) =>{
        console.log(` Worker: ${worker.process.pid} start. Date: ${new Date().toLocaleDateString()}`);
    })
    cluster.on('exit', (worker, code, signal) =>{
        console.log(` Worker: ${worker.process.pid} died. Date: ${new Date().toLocaleDateString()}`);
    })
}else {
    httpServer.listen(PORT, (err) =>{
        if(err) throw new Error(`Error on server: ${err}`)
        console.log(`Servidor escuchando en el puerto http://localhost:${PORT}/ - Process ID: ${process.pid}. Date: ${new Date().toLocaleDateString()}`)
    })
}

//tasklist /fi "imagename eq node.exe" -> lista todos los procesos de node.js activos
//taskkill /pid numpid /f -> mata un proceso por su número de PID

//npm i -g pm2
//npm list -g | grep pm2

// -------------- MODO FORK -------------------
//pm2 start server.js --name="ServerX" --watch -- PORT
//pm2 start server.js --name="Server1" --watch -- 8081
//pm2 start server.js --name="Server2" --watch -- 8082
//pm2 start server.js --name="Server2" --watch -- 8083

// -------------- MODO CLUSTER -------------------
//pm2 start server.js --name="ServerX" --watch -i max -- PORT
//pm2 start server.js --name="Server3" --watch -i max -- 8080

//pm2 list
//pm2 delete id/name
//pm2 desc name
//pm2 monit
//pm2 --help
//pm2 logs
//pm2 flush

// import express from 'express';

// const app = express();

// const PORT = parseInt(process.argv[2]) || 8080;

// app.get('/datos', (req, res)=>{
//     res.send(`Servidor express en ${PORT} - PID ${process.pid} - ${new Date().toLocaleString()}`)
// })

// app.get('/prueba', (req, res)=>{
//     res.send(`Ruta especial en ${PORT} - PID ${process.pid} - ${new Date().toLocaleString()}`)
// })

// app.listen(PORT, err => {
//     if (!err) console.log(`Servidor express escuchando en el puerto ${PORT} - PID WORKER ${process.pid}`)
// });
