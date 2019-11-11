import React from 'react'

const City = (props) => {
	return (
		<section>
			<h2>{props.name}</h2>
			<p>temperature: {props.temperature}</p>
			<p>wind: {props.wind}</p>
			<p>humidity: {props.humidity}</p>
		</section>
	)
}

export default City