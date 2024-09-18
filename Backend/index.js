const express=require('express');
const app=express();
const port=8000;
const db=require('./config/mongoose');
const bodyParser=require('body-parser');
const cors=require('cors');
const passport=require('passport');
const passportJWT=require("./config/passportJWT");

app.use(cors());
app.use(bodyParser.json());
app.use(passport.initialize());

app.use('/',require('./routes'))

app.listen(port,()=>{
    console.log(`Server running on port:${port}`);
});
