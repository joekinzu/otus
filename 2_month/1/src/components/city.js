import React, {useContext, useEffect} from 'react'
import CityContext from '../context/city/cityContext'

const City = () => {

	const cityContext = useContext(CityContext)
	const {url, data, fetchcity, updatecity} = cityContext
  
	useEffect(() => {
	  fetchcity(url)
	  console.log(url)
	  // eslint-disable-next-line
	}, [url])

	return (
		<div className='card tex-center'>
        	<input onChange={(e) => updatecity(e.target.value)}/>
			<h2>{data.name}</h2>
			<ul>temperature={data && data.main ? data.main.temp : null}</ul>
			<ul>wind={data && data.wind ? data.wind.speed : null}</ul>
			<ul>humidity={data && data.main ? data.main.humidity : null}</ul>
		</div>
	)
}


export default City