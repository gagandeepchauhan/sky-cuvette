import React from 'react'
import { Link } from 'react-router-dom'
import logo from '../SVGS/logo.svg'

export default function Header() {
	return (
		<>
		<div className="header">
			<div className="logo">
				<img src={logo} alt="cuvette logo" />
			</div>
			<div className="nav">
				<Link to="/" className="listing">
					My Listings
				</Link>
				<div className="ml-5 icons">
					<i className="ml-3 fas fa-bell"></i>
					<i className="ml-3 fas fa-user-tie"></i>
				</div>
			</div>
		</div>
		<div class="line"></div>
		</>
	)
}