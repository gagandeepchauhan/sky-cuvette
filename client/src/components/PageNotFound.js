import React from 'react'
import {Link,useHistory} from 'react-router-dom'
import PNF from '../SVGS/page_not_found.svg'

export default function PageNotFound() {
	const history=useHistory()
	function goBack(){
		history.goBack()
	}
	return (
		<div className="page-not-found" align="center">
			<div className="jumbotron">
			  <img className="home-illustration" src={PNF} alt='cuvette pnf svg' />
			  <h1 className="text-container">Page Not Found</h1>
			  <p className="light-para">It seems you are looking for a page that does not exists.</p>
			  <hr className="my-4"/>
			  <p className="light-para">If you find this behaviour unexpected then please inform us.</p>
			  <p className="">
			  	<button className="btn btn-dark" onClick={goBack}>Back</button>
			    <Link className="ml-2 btn btn-light" to="/">Go home</Link>
			  </p>
			</div>
		</div>
	)
}