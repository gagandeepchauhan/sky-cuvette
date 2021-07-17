import React,{useState,useEffect} from 'react'
import {Modal,Form,Button} from 'react-bootstrap'

export default function PartOne({job,savePartOne}) {
	const [title,setTitle]=useState('')
	const [location,setLocation]=useState('')
	const [isRemote,setIsRemote]=useState('false')
	const [loading,setLoading]=useState(false)

	function handleSubmit(e){
		e.preventDefault()
		setLoading(true)
		savePartOne({title,location,isRemote})
		setLoading(false)
	}
	useEffect(()=>{
		setTitle(job?.title ?? '')
		setLocation(job?.location ?? '')
		setIsRemote(job?.isRemote ?? 'false')
	},[job])
	return (
		<>
			<Modal.Body className="part-one">
				<Form onSubmit={handleSubmit}>
					<div className="row px-3">
						<label className="mb-0 col col-12 col-md-4 label-head" >Job title</label>
						<input 
							type="text" 
							value={title} 
							required
							className="col col-12 col-md-8 title-input"
							onChange={(e)=>setTitle(e.target.value)}
						/>
					</div>
					<div className="row  px-3 mt-4 mb-2">
						<label className="mb-0 col col-12 col-md-4 label-head" >Job location</label>
						<div className="col col-12 col-md-8 px-0">
						<input 
							type="text" 
							value={location} 
							disabled={isRemote==='true' ? true : false}
							required
							placeholder="Enter location"
							className="loc-input"
							onChange={(e)=>setLocation(e.target.value)}
						/>
						<div className="mt-2 form-check form-check-inline">
						  <input className="form-check-input" type="checkbox" id="remote" checked={isRemote==='true'} onChange={()=>setIsRemote(prev=>prev==='true' ? 'false' : 'true')} />
						  <label className="form-check-label" for="remote"><small className="light-para">This job is remote</small></label>
						</div>
						</div>
					</div>
					<div className="mt-3" align="right">
						{loading ? 
  						  	<button className="btn btn-primary" type="button" disabled>
  								<span className="mr-1 spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
  								Proceeding...
							</button>
  						  	:
							<button type="submit" className="btn btn-primary">Next</button>
						}
					</div>
				</Form>
			</Modal.Body>
		</>
	)
}