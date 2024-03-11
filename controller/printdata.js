const path= require('path');

const express=require('express')
const router=express.Router();

const modelclass= require('../model/model.js');

exports.datacontroller = (req,res,next)=>
{
  
    res.render('forms',{
        path:'/data'
    })
}

exports.savedatacontoller= (req,res,next) =>
{
  
  const name = req.body.name;
   const city= req.body.city;
   const email = req.body.email;
   console.log(email)

   modelclass.create({
    name:name,
    city:city,
    email:email,
   })
   .then(()=>{
    res.redirect('/print') ;
   })
   .catch((err)=>{
    res.send('Not Found')
   })

}

exports.fetch= (req,res,next)  =>{
modelclass.findAll()
.then((result)=>{
    res.render('table',{
        prod:result
    })
 
}).catch((err)=>{
    console.log(err)
})
}

exports.show=(req,res,next) =>{
    let userid=req.params['id']

   modelclass.findAll({where:{id:userid}})
    .then((result)=>{
        res.render('product_details',{
        prod:result
        });
       
    }).catch((err)=>{
        res.send("Not Found")
    })
}

exports.delete= (req,res,next)=>{
    
    let userid=req.params['id']
    console.log(userid)

    modelclass.destroy({where:{id:userid}})
    .then((result)=>{
        res.redirect('/print')
    })
    .catch((e)=>{
        res.send("No Found")
    })
    
}

exports.update = (req,res,next) =>{

    let userid = req.params['id']

   modelclass.findAll({where:{id:userid}})
    .then((result)=>{
      
        res.render('update',{
        prod:result
        });
       
    }).catch((err)=>{
        res.send("Not Found")
    })
}

exports.edit= async (req,res,next) =>{
    const p={
        name :req.body.name,
        city: req.body.city,
        email: req.body.email
    }
     const userid= req.body.id  
   await modelclass.update(p,{where:{id:userid}})
   .then((result)=>{
    console.log(result);
       res.redirect('/print')
   })
   .catch((e)=>{console.log(e)})
}

