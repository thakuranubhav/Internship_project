const express=require('express');
const bodyParser= require('body-parser');
const cors= require('cors');
const morgan= require('morgan');
const dotenv= require('dotenv');
const colors= require('colors');
const connectDb= require('./config/db')
//config dotenv file
dotenv.config();

//rest object
const app=express();
// call to db
connectDb()
//middleware
app.use(express.json());
app.use(cors())
app.use(morgan('dev'))
//routes
//user routes
app.use('/api/v1/users',require('./routes/userRoutes'))
//transection routes
app.use('/api/v1/transections',require('./routes/transectionRoutes'))
const PORT= 3001 || process.env.PORT
app.listen(PORT,()=>{
    console.log(`Server running on port ${PORT}`);
})