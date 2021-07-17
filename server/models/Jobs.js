const { Schema,model } = require('mongoose')

const jobSchema= new Schema(
	{
		title:String,
		location:String,
		isRemote:{
			type:String,
			enum:['true','false'],
			default:'false'
		},
		skills:[String],
		mode:[String],
		stipendRange:String,
		startDate:Date,
		duration:Number,
		description:String
	},
	{
		timestamps:true
	}
)


module.exports= model("jobs",jobSchema)