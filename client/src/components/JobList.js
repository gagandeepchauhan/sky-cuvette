import React,{useState,useEffect} from 'react'
import { Link } from 'react-router-dom'


export default function JobList({jobs:Data}) {
	const [jobs,setJobs]=useState([])

	useEffect(()=>{
		setJobs(Data)
	},[Data])

	return (
		<div className="job-list">
			<table>
				<tbody>
					{jobs.map((job,index)=>(
						<tr key={job._id}>
							<td>{index+1}.</td>
							<td>{job.title}</td>
							<td>{new Date(job.createdAt?.toString())?.toDateString()}</td>
							<td><Link to={`/job-details/${job._id}`}><small>Details</small></Link></td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	)
}