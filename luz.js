//1 importar las librerias que van a usar
let express = require("express"); // import 
let Palabra = require("./palabra");


// 2 instanciar express
let server = express();

let diccionario = [ new Palabra("Archucha", "Pepino de guiso" ,"Valle del Cauca") ];

server.get("/todas", (req, res, next)=>{ //request : peticion , response : respuesta, next :siguiente
    res.json(diccionario);
});

server.post ("/palabras",(req,res,next)=>{
    res.json("este es el post");
})



//paso ultimo
server.listen(5000,()=>{
    console.log("ya empezo a escuchar");
})

