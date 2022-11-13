import minimist from "minimist";

let args = process.argv.slice(2);

let options = {
    default:{
        puerto:8080,
        modo: 'fork'
    },
    alias:{
        m: 'modo',
        p: 'puerto',
    },
}

let argv = minimist(args,options);

const modoServer = argv;

export default modoServer;