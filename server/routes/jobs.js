const express=require('express')
const router=express.Router()

const Jobs=require("../models/Jobs")

router.get("/get-jobs",async (req,res)=>{
	try{
		const jobsList= await Jobs.find()
		res.json({
			success:true,
			desc:'Jobs List',
			data:jobsList
		})
	}
	catch(err){
		res.json({
			success:false,
			desc:err.message
		})
	}
})
router.get("/get-job/:_id",async (req,res)=>{
	const {_id}=req.params
	try{
		const job= await Jobs.findById(_id)
		if(job==null){
			return res.json({
				success:false,
				desc:'specified job id does not exist'
			})
		}
		res.json({
			success:true,
			desc:'Job Details',
			data:job
		})
	}
	catch(err){
		res.json({
			success:false,
			desc:err.message
		})
	}
})
router.post("/add-job",async (req,res)=>{
	const jobDetails=req.body
	try{
		const newlyCreatedJob= await Jobs.create(jobDetails)
		res.json({
			success:true,
			desc:'New job added successfully',
			data:newlyCreatedJob
		})
	}
	catch(err){
		res.json({
			success:false,
			desc:err.message
		})
	}
})

module.exports=router