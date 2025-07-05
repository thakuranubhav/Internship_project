const express=require('express');
const cors= require('cors');
const morgan= require('morgan');
const dotenv= require('dotenv');
const path= require('path');
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
app.use('/',require('./routes/userRoutes'))
//transection routes
app.use('/transections',require('./routes/transectionRoutes'))

//read static files
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, 'client', 'build')));

  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'));
  });
}

const PORT= 3001 || process.env.PORT
app.listen(PORT,()=>{
    console.log(`Server running on port ${PORT}`);
})