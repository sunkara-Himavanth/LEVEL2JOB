import mongoose from "mongoose";

const companySchema=new mongoose.Schema({
      name:{type:"string",required:true},
      email:{type:"string",required:true,unique:true},
      image:{type:"string",required:true},
      password:{type:"string",required:true},
});

const Company=mongoose.model("Company",companySchema);
export default Company;