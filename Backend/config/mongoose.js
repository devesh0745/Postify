const mongoose=require('mongoose');

mongoose.connect('mongodb://0.0.0.0/postify_db');

const db=mongoose.connection;

db.on('error',console.error.bind(console,'Error in connecting to DB'));

db.once('open',()=>{
    console.log('Successfully connected to DB');
});
module.exports=db;