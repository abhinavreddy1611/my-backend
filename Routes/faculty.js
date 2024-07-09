const express=require("express");
const router=express.Router();
const {getFaculty,addReview,getFacultyReview} =require("../contollers/faculty.js");



router.get("/facultyreview",getFaculty);
router.post("/facultyreview",addReview);
router.get("/facultyreview/:id",getFacultyReview);


module.exports=router;