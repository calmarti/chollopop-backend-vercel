'use strict';

const mongoose = require('mongoose');

mongoose.set('strictQuery', true); 

mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .catch(err=>console.log("Error al intentar establecer la conexión: ", err));


const conn = mongoose.connection;

conn.on('error', function(err){
    console.error('Error de conexión: ', err);
    process.exit(1);
})

conn.once('open', function(){
    console.log('Conectado a MongoDB en: ', conn.name);
})


module.exports = conn;