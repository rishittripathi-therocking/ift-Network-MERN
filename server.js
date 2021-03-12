require('dotenv').config();
const express = require('express'); 
const mongoose = require('mongoose');
const cors = require('cors');
const cookieparser = require('cookie-parser');

const app = express();
app.use(express);
app.use(express.json());
app.use(cors());
app.use(cookieparser());

app.get('/',(req,res)=>{
    res.json({msg:'Hello'});
});


const PORT = process.env.PORT || 5000
app.listen(PORT,()=>{
    console.log(`Server is running on${PORT}`);
});
