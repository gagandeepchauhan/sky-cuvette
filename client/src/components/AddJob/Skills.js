import React from 'react'

export default function Skills({skills,removeSkill}) {
	return (
		<div className="skills py-3">
			{skills?.map((skill,index)=>(
				<div key={index} className="skill">
					<span>{skill} </span>
					{removeSkill && 
					<span className="skill-cross" onClick={()=>removeSkill(index)}><small className="px-1">X</small></span>
					}
				</div>
			))}
		</div>
	)
}