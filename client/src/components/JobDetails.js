import React,{useState,useEffect} from 'react'
import {useHistory} from 'react-router-dom'
import {useApi} from '../contexts/ApiContext'
import Skills from './AddJob/Skills'

export default function JobDetails(props) {
	const jobId=props.match.params._id
	const {getJob}=useApi()
	const [job,setJob]=useState({})
	const [error,setError]=useState({err:false,desc:''})
	const history=useHistory()


	function goBack(){
		history.goBack()
	}
	useEffect(()=>{
		async function fetchData(){
			const result= await getJob(jobId)
			if(result && result.success){
				setJob(result.data)
			}else{
				setError({err:true,desc:result.desc})
			}
		}
		fetchData()
	},[jobId])

	return (
		<div className="container job-cont">
			{error.err ? 
				<div className="alert alert-danger p-2">
					{error.desc}
				</div>
				:
				<div className="job-details py-4">
					<h1 className="d-flex justify-content-between" style={{fontWeight:"bolder"}} >
						<i style={{cursor:"pointer"}} onClick={goBack} className="fas fa-arrow-left"></i>
						<div className="pl-4">Job details</div>
					</h1>
					<hr style={{color:"rgb(218, 223, 226)"}}/>
					<div className="mt-4">
						<h3 style={{fontWeight:"bolder"}}>{job.title}</h3>
						<small className="light-normal-para">{job.isRemote==="true" ? 'Remote' : job.location}</small>
						<h5 style={{fontWeight:"bolder"}} className="pt-5">Job Description</h5>
						<p className="light-para">{job.description}</p>
						<h5 style={{fontWeight:"bolder"}}>Skills</h5>
						<p>
							<Skills skills={job.skills} />
						</p>
						<h5 style={{fontWeight:"bolder"}}>Mode</h5>
						<p className="light-normal-para">{job.mode?.join(' | ')}</p>
						<h5 style={{fontWeight:"bolder"}}>Starting</h5>
						<p className="light-normal-para">{new Date(job.startDate?.toString()).toDateString()}</p>
						<h5 style={{fontWeight:"bolder"}}>Duration</h5>
						<p className="light-normal-para">{job.duration} Months</p>
						<h5 style={{fontWeight:"bolder"}}>Stipend</h5>
						<p className="light-normal-para">({job.stipendRange}) Rs</p>
					</div>
				</div>
			}
		</div>
	)
}