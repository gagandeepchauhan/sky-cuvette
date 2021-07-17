import React,{useEffect,useState} from 'react'
import {Modal} from 'react-bootstrap'
import {useApi} from '../contexts/ApiContext'

import JobList from './JobList'
import PartOne from './AddJob/PartOne'
import PartTwo from './AddJob/PartTwo'

export default function Home() {
	const {getJobs,addJob}=useApi()
	const [job,setJob]=useState({})
	const [jobs,setJobs]=useState([])
	const [error,setError]=useState({err:false,desc:''})
	const [showModalOne,setShowModalOne]=useState(false)
	const [showModalTwo,setShowModalTwo]=useState(false)

	function savePartOne(data){
		setJob(prev=>({...prev,...data}))
		setShowModalOne(false)
		setShowModalTwo(true)
	}
	async function postJob(data){
		const newJob={...job,...data}
		const result= await addJob(newJob)
		if(result && result.success){
			setJob({})
			setJobs(prevJobs=>([...prevJobs,{...result.data}]))
		}else{
			setError({err:true,desc:result.desc})
		}
		// console.log(newJob)
		setShowModalTwo(false)
	}
	function closeModalOne(){
		setJob({})
		setShowModalOne(false)
	}
	function closeModalTwo(){
		setJob({})
		setShowModalTwo(false)
	}
	function backToModalOne(data){
		setShowModalTwo(false)
		setShowModalOne(true)
		setJob(prev=>({...prev,...data}))
		console.log(data)
	}

	useEffect(()=>{
		async function fetchData(){
			const result= await getJobs()
			if(result && result.success){
				setJobs(result.data)
			}else{
				setError({err:true,desc:result.desc})
			}
		}
		fetchData()
	},[])
	return (
		<div className="home-container">
		<div>
			{error.err && 
				<div className="alert alert-danger p-2">
					{error.desc}
				</div>
			}
			{jobs.length==0 ?
				<div align="center">
					<h2 className="home-heading">Hi Company user, Welcome to Cuvette Tech</h2>
					<button onClick={()=>setShowModalOne(true)} className="post-btn">+Post a job</button>
				</div>
				:
				<div className="list-div">
					<h6 align="right"><span className="normal-link" onClick={()=>setShowModalOne(true)}>+Add another job</span></h6>
					<JobList jobs={jobs} />
				</div>
			}
			<Modal show={showModalOne} onHide={closeModalOne}>
				<PartOne job={job} savePartOne={savePartOne} />
			</Modal>
			<Modal show={showModalTwo} onHide={closeModalTwo}>
				<PartTwo job={job} postJob={postJob} backToModalOne={backToModalOne} />
			</Modal>
		</div>
		</div>
	)
}