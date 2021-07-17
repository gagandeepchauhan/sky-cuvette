// requiring neccessary libraries
const express=require('express')
const app=express()
const mongoose=require("mongoose")
const cors=require('cors')

// configuring env vars - in dev mode only
process.env.NODE_ENV==="development" && require('dotenv').config()

const PORT=process.env.PORT

// configuring cors
app.use(cors({
	origin:process.env.CORS_ORIGIN
}))
app.use(express.json())

// DB connection
mongoose.connect(process.env.DB_URL,{
	useNewUrlParser:true,
	useUnifiedTopology:true,
	useFindAndModify:false,
	useCreateIndex:true	
})
.then(()=>console.log("DB CONNECTED"))
.catch((err)=>console.log(err.message))

// requiring route files
const jobsRoute=require('./routes/jobs') 

// using routes
app.use(jobsRoute)

// App listener
app.listen(PORT,()=>console.log(`App launched on ${PORT}`))