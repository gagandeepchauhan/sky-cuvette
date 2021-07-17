import React,{useContext} from 'react'
const API_URL= 	process.env.NODE_ENV === "development" ? 
				process.env.REACT_APP_DEVELOPMENT_API_URL :
				process.env.REACT_APP_PRODUCTION_API_URL;

const ApiContext= React.createContext()
export function useApi(){
	return useContext(ApiContext)
}

export default function ApiProvider({children}){
	const api={}

	api.getJobs=()=>{
		return fetch(`${API_URL}/get-jobs`)
		.then(response=>response.json())
		.then(json=>{
			console.log(json)
			return {
				success:json.success,
				data:json.data,
				desc:json.desc
			}
		}) 
	}
	api.getJob=(_id)=>{
		return fetch(`${API_URL}/get-job/${_id}`)
		.then(response=>response.json())
		.then(json=>{
			console.log(json)
			return {
				success:json.success,
				data:json.data,
				desc:json.desc
			}
		}) 
	}
	api.addJob=(newJob)=>{
		return fetch(`${API_URL}/add-job`,{
			headers:{
				'Content-Type':'application/json',
			},
			method:'POST',
			body:JSON.stringify(newJob)
		})
		.then(response=>response.json())
		.then(json=>{
			console.log(json)
			return {
				success:json.success,
				data:json.data,
				desc:json.desc
			}
		})
	}

	return (
		<ApiContext.Provider value={api} >
			{children}
		</ApiContext.Provider>
	)
}

