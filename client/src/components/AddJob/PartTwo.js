import React,{useState,useEffect} from 'react'
import {Modal,Form,Button} from 'react-bootstrap'

import Skills from './Skills'
import Range from './Range'

const skillTemplate=['reactjs','node.js','html','css','javascript','python','mongoDB','mysqlDB']
export default function PartTwo({job,postJob,backToModalOne}) {
	const [duration,setDuration]=useState('')
	const [description,setDescription]=useState('')
	const [skills,setSkills]=useState([])
	const [mode,setMode]=useState([])
	const [startDate,setStartDate]=useState('')
	const [skill,setSkill]=useState('')
	const [tmpSkills,setTmpSkills]=useState([])
	const [error,setError]=useState({on:'NA',desc:''})
	const [loading,setLoading]=useState(false)
	const [minValue,setMinValue]=useState('20000')
	const [maxValue,setMaxValue]=useState('80000')

	function back(){
		const job={
			duration,
			description,
			skills,
			mode,
			stipendRange:`${minValue}-${maxValue}`,
			startDate
		}
		backToModalOne(job)
	}
	function handleSearch(e){	
		setSkill(e.target.value)	
		const value=e.target.value.toLowerCase()
		if(value==''){
			setTmpSkills([])
			return
		}														
		setTmpSkills(skillTemplate.filter(item=>item.includes(value)).sort((a,b)=>getRelevancy(value,b)-getRelevancy(value,a)))
	}
	function getRelevancy(value,skill){
		if(value===skill)
			return 2
		if(skill.startsWith(value))
			return 1
		return 0
	}
	function addSkill(skill){
		setError({on:'NA',desc:''})
		setSkill('')
		setTmpSkills([])
		if(skills.find(skl=>skl===skill))
			return
		setSkills(prev=>([...prev,skill]))
	}
	function addMode(mod){
		if(mode.find(md=>md===mod))
			setMode(prev=>{
				return prev.filter(md=>md!==mod)
			})
		else{
			setError({on:'NA',desc:''})
			setMode(prev=>([...prev,mod]))
		}
	}
	function removeSkill(index){
		setSkills(prev=>{
			return prev.filter((skill,i)=>i!==index)
		})
	}
	function handleSubmit(e){
		e.preventDefault()
		if(skills.length==0){
			setError({on:'skills',desc:"Select at least one skill"})
			return
		}
		if(mode.length==0){
			setError({on:'mode',desc:"Check at least one mode"})
			return
		}
		setLoading(true)
		postJob({duration,skills,mode,description,stipendRange:`${minValue}-${maxValue}`,startDate})
		setLoading(false)
	}
	useEffect(()=>{
		const stipendRange=job?.stipendRange
		const [minv,maxv]=stipendRange?.split('-') || ['20000','50000']
		setDuration(job?.duration ?? '')
		setDescription(job?.description ?? '')
		setSkills(job?.skills ?? [])
		setMode(job?.mode ?? [])
		setStartDate(job?.startDate ?? '')
		// console.log(stipendRange,minv,maxv)	
		if(stipendRange && minv && maxv){
			// console.log(minv,maxv)
			setMinValue(minv)
			setMaxValue(maxv)
		}	
	},[job])
	return (
		<>
			<Modal.Body>
				<span className="label-head normal-link" onClick={back} ><i className="fas fa-arrow-left"></i></span>
				<h5 style={{textAlign:"center"}} className="mb-5 label-head"># Intern Details</h5>
				<Form onSubmit={handleSubmit}>
					<div className="row">
						<label className="col col-sm-4 label-head">Skill(s)</label>
						<div className="col col-sm-8 skill-div">
						<input 
							type="search"
							placeholder="Start typing and select the tab"
							value={skill}
							className="col col-sm-8 loc-input"
							onChange={handleSearch}
						/>
						{error.on==='skills' && <span className="text-danger small-text">{error.desc}</span>}
						<ul className="skill-list">
							{tmpSkills.map((skill,index)=>(
								<li onClick={()=>addSkill(skill)} key={index}>{skill}</li>
							))}
						</ul>
						</div>
						<Skills skills={skills} removeSkill={removeSkill} />
					</div>
					<div className="row mb-3">
						<label className="col col-sm-4 label-head">Mode</label>
						<div className="col col-sm-8">
						<div className="form-check form-check-inline">
						  <input className="form-check-input" type="checkbox" id="part" onChange={()=>addMode('part-time')} />
						  <label className="light-normal-para form-check-label" for="part">Part-time</label>
						  <div className="pl-2 small-text light-text">(20 hrs/week)</div>
						</div>
						<div className="form-check form-check-inline">
						  <input className="form-check-input" type="checkbox" id="semi-full" onChange={()=>addMode('semi-full-time')} />
						  <label className="light-normal-para form-check-label" for="semi-full">Semi Full-time</label>
						  <div className="pl-2 small-text light-text">(30 hrs/week)</div>
						</div>
						<div className="form-check form-check-inline">
						  <input className="form-check-input" type="checkbox" id="full" onChange={()=>addMode('full-time')} />
						  <label className="light-normal-para form-check-label" for="full">Full-time</label>
						  <div className="pl-2 small-text light-text">(40 hrs/week)</div>
						</div>
						{error.on==='mode' && <div className="text-danger small-text">{error.desc}</div>}
						</div>
					</div>
					<div className="row mb-3">
						<label className="col col-sm-4 label-head">Stipend Range</label>
						<div className="col col-sm-8">
						<Range minValue={minValue} maxValue={maxValue} setMinValue={setMinValue} setMaxValue={setMaxValue} />
						</div>
					</div>
					<div className="row mb-3">
						<label className="col col-sm-4 label-head">Start Date</label>
						<div className="col col-sm-8">
						<input 
							type="date"
							value={startDate}
							className="form-control"
							onChange={(e)=>setStartDate(e.target.value)}
							required
						/>
						</div>
					</div>
					<div className="row mb-3">
						<label className="col col-sm-4 label-head">Duration</label>
						<div className="col col-sm-8">
						<Form.Control 
							type="number" 
							value={duration} 
							onChange={(e)=>setDuration(e.target.value)} 
							required
						/> 
						<small className="small-text light-para">Months</small>
						</div>
					</div>
					<div className="row mb-3">
						<label className="mb-2 label-head">Job description</label>
						<div>
						<textarea
							row="5" 
							className="form-control p-3" 
							value={description} 
							onChange={(e)=>setDescription(e.target.value)}
							required
							placeholder="Enter the job description (250-300 words) "
						/>
						</div>
					</div>
					<div align="right">
						{loading ? 
  						  	<button className="btn btn-primary" type="button" disabled>
  								<span className="mr-1 spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
  								Posting...
							</button>
  						  	:
							<button type="submit" className="btn btn-primary">Post</button>
						}
					</div>
				</Form>
			</Modal.Body>
		</>
	)
}