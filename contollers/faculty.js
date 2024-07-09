const express=require("express");
const Faculty=require("../models/faculty.js");
const { getSummary } = require("../chatGpt/chatGpt.js");



const getFaculty=async (req,res)=>{
    try{
let faculty=await Faculty.find();
let send=faculty.map((indiv)=>{
const {_id,fullName,subjectName,Rating,averageReview}=indiv;
return {
     _id,
    fullName,
    subjectName,
    Rating,
    averageReview
}

    
})
res.status(201).send(send);



}
catch(error){
    res.status(401).json({
        messge:error
    })
}

}

const addReview=async (req,res)=>{
    try{
    const {fullName,subjectName,Rating,Review}=req.body;
    console.log(req.body);
    const currentFaculty= await Faculty.findOne(
        {
            fullName:fullName
        }
    );
    if(currentFaculty){
          currentFaculty.averageReview.push(Rating);
          let average=0;
          for(let i=0;i<averageReview.length;i++){
                       average=average+averageReview[i];
          }
          average=average/averageReview.length;
          currentFaculty.Review.push(Review);
          currentFaculty.averageReview=average;
          await currentFaculty.save();

    }
    else{
        console.log("1")
        console.log({
            fullName,
            subjectName,
            Rating,
            Review,
        })
         let newFaculty= new Faculty({
            fullName,
            subjectName,
            Rating,
            Review,
            averageReview:Rating
         })
         console.log(newFaculty);
         await newFaculty.save();
         console.log(newFaculty);


    }
    res.status(201).json({
        message:"successfully updated"
    })
    }
    catch(error){
        res.status(402).json({
            message:error
        })

    }
}


const getFacultyReview=async (req,res)=>{
    try{
const {id}=req.params;
const currFaculty = await Faculty.findOne({
    _id:id
}) ;
console.log(currFaculty);
let reviews="";
console.log("1");
for(let i=0;i<currFaculty.Review.length;i++){
    console.log(currFaculty.Review[i]);
    reviews=reviews+" "+ currFaculty.Review[i];
    console.log("2");

}

let summaryReview=await getSummary(reviews);
console.log(summaryReview);
let {
    fullName,
    subjectName,
    Rating,
    Review,
    averageReview


}=currFaculty;

res.status(200).json({
    fullName,
    subjectName,
    Rating,
    Review,
    averageReview,
    summaryReview
})
    }
    catch(error){
        res.status(401).json({
            message:error
        })
    }

}











module.exports={getFaculty,addReview,getFacultyReview}