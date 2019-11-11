import React from 'react'
import { withRouter } from 'react-router-dom'
import fetchme from '../utils/api'

const CityFull = (props) => {
	return (
		<section>
            {console.log('url param: ',props.match.params.name)}
            <h2>{props.match.params.name}</h2> 5 day forecast
            <hr/>
            {props.fulldata.map((favs,index) => 
            <li key={index}>
                {favs.dt_txt + ' - '} 
                {favs && favs.main ? favs.main.temp : null},
                {favs && favs.wind ? favs.wind.speed : null}
            </li>
            )} 
		</section>
	)
}

export default withRouter(CityFull)