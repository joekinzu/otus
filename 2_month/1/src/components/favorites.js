import React, {useContext, useEffect} from 'react'
import {NavLink} from 'react-router-dom'
import CityContext from '../context/city/cityContext'

const Favorites = () =>{

    const cityContext = useContext(CityContext)
	const {fav, addfavorite, deletefavorite, data} = cityContext
  
	useEffect(() => {
	  console.log(fav)
	  // eslint-disable-next-line
	}, [fav])
    return (
        <>
        <h4>Favorites</h4> 
        <button className='btn btn-success btn-sm' onClick={() => addfavorite(data)}>Add</button>
        {fav.map((favs,index) =>
        <li className='list ul' key={index}>
            <NavLink to={'/town/'+favs.name}>
                {favs.name},
            </NavLink>
            {favs.main.temp},  {favs.wind.speed+'  '}
            <button className='btn btn-sm' onClick={() => deletefavorite(index)}>Delete</button>
        </li>
        )}
        </>
    )
}

export default Favorites