const transectionModel= require('../models/transectionModel')
const colors= require('colors')
const moment= require('moment')

const getAllTransection= async (req,res)=>{
     try {
    const { frequency, userid,selectDate,type } = req.body;

    const transactions = await transectionModel.find({
      ...(frequency !== 'custom' ? {
        date: {
        $gt: moment().subtract(Number(frequency), 'd').toDate()
      },
      }:{
        date:{
            $gte:selectDate[0],
            $lte:selectDate[1]
        }
      }),
       userid: userid,
      
       ...(type !== 'all' &&  {type}),
    
      
    });

    res.status(200).json(transactions);
  }  catch(error){
         console.log(error)
        res.status(400).json({
            success:false,
            error
        })

    }

}
const deleteTransection= async (req,res) =>{
    try{
        await transectionModel.findOneAndDelete({_id:req.body.transactionId});
        res.status(200).send("Transaction deleted successfully");

    } catch(error){
        console.log(error);
    res.status(400).json({
      success: false,
      error,
    });

    }
}
const editTransection = async (req, res) => {
  try {
    const { transactionId, payload } = req.body;

    if (!transactionId || !payload) {
      return res.status(400).json({ success: false, message: "Missing required fields" });
    }

    await transectionModel.findByIdAndUpdate(transactionId, payload);

    res.status(200).send("Transaction edited successfully");
  } catch (error) {
    console.log(error);
    res.status(400).json({
      success: false,
      error,
    });
  }
};


const addTransection= async (req,res)=>{
    try{
        //using req.body we can get the data and then we use .save() to save the data
        const newTransection= new transectionModel(req.body);
        await newTransection.save();
        res.status(201).send('transection created')

    }  catch(error){
        console.log(error)
        res.status(400).json({
            success:false,
            error
        })

    }


}
module.exports={getAllTransection,addTransection,editTransection,deleteTransection}