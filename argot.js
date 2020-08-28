//1 importar las librerias que van a usar
let express = require("express"); // import 
let mongoose = require("mongoose");
let Palabra = require("./palabra");


// 2 instanciar express
let server = express();

// 3 middelware global
server.use(express.json());


// definir la estructura 
const palabraSchema = mongoose.Schema({
    name: {
      type: String,
      required: true,
      unique: true,
    },
    definition: {
        type: String,
        required: true
    },
    location: {
      type: String,
      required: true
    },
  });

  const CollectionPalabras = mongoose.model("palabras", palabraSchema);

let diccionario = [ new Palabra("Archucha", "Pepino de guiso" ,"Valle del Cauca") ];

server.get("/todas", (req, res, next)=>{ //request : peticion , response : respuesta, next :siguiente
    //res.json(diccionario);
    CollectionPalabras.find({})
    .then((data) => { //si todo sale bien el resultado de la consulta llega a data
      res.json(data); //responda todos los datos
    })
    .catch(() => { //si hay error
      res.status(400);
      res.json({
        message: "No puedo regresar todas las palabras",
      });
    });
});




server.post("/palabras",(req, res, next)=>{
    let nuevaPalabra = new Palabra( req.body.name, req.body.definition, req.body.location);
    diccionario.push(nuevaPalabra)
    res.json(nuevaPalabra);
});






//paso ultimo
server.listen(5000,()=>{
    console.log("ya empezo a escuchar el servidor Express");
    mongoose.connect("mongodb://localhost:27017/diccionario", { useNewUrlParser: true, useUnifiedTopology: true })
    .then(()=>{
        console.log("Se pudo conectar correctamente a la base de datos")
    })
    .catch((error)=>{
        console.log("ha ocurrido un error"+error);
    })
})

