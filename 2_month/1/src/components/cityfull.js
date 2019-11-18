import React, {useContext, useEffect} from 'react'
import CityContext from '../context/city/cityContext'

const CityFull = () => {

  const cityContext = useContext(CityContext)
  const {url, fulldata, fetchcityfull} = cityContext

  useEffect(() => {
    fetchcityfull(url)
    // eslint-disable-next-line
  }, [url])

    return (
        <>
            {console.log('url param: ',url)}
            <h2>{url}</h2> 5 day forecast
            <hr/>
            {fulldata.map((favs,index) => 
                <li className='list' key={index}>
                    {favs.dt_txt + ' - '} 
                    {favs && favs.main ? favs.main.temp : null},
                    {favs && favs.wind ? favs.wind.speed : null}
                </li>
            )} 
        </>
    )
}

  
export default CityFull