require('dotenv').config();
const express = require('express'); 
const mongoose = require('mongoose');
const cors = require('cors');
const cookieparser = require('cookie-parser');

const app = express();
app.use(express.json());
app.use(cors());
app.use(cookieparser());

app.use('/socialapi', require('./routes/authRoute'));

const URI = process.env.MONGO_URL;
mongoose.connect(URI, {
    useCreateIndex: true,
    useFindAndModify: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
}, err =>{
    if(err) throw err;
    console.log('Connected to MongoDB');
}) 

const PORT = process.env.PORT || 5000
app.listen(PORT,()=>{
    console.log(`Server is listening on ${PORT}`);
});