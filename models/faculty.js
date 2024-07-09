const mongoose =require("mongoose");



let facultySchema=new mongoose.Schema({
    fullName:{
        type:String,
        required:true
    },
    subjectName:{
        type:String,
    },
    Rating:{
        type:Number,
        required:true
    },
    Review:{
        type:Array,
        required:true,
        default:[]
    },
    averageReview:{
        type:Number
    }

},
{
    timestamps:true
}
)

const facultyModel=mongoose.model("Faculty",facultySchema);
module.exports=facultyModel;
