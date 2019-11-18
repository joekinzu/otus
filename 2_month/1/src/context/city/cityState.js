import React, {useReducer} from 'react'
import CityContext from './cityContext'
import cityReducer from './cityReducer'
import {UPDATE_CITY, FETCH_CITY, FETCH_CITY_FULL, ADD_FAVORITE, DELETE_FAVORITE} from '../actionTypes'


const CityState = props => {

  const initialState = {
      data: [],
      fulldata: [],
      url: 'Izhevsk',
      fav: []
  }
    
  const [state, dispatch] = useReducer(cityReducer, initialState);

  const updatecity = async name => {
      await dispatch({type: UPDATE_CITY, payload: name})
  }

  const fetchcity = async name => {
      await fetch('https://api.openweathermap.org/data/2.5/weather?q='+name+'&APPID=931f4ae609990c40539f493d8d345801').then(res => res.json()).then(res =>
      dispatch({type: FETCH_CITY, payload: res}))
  }

  const fetchcityfull = async name => {
      await fetch('https://api.openweathermap.org/data/2.5/forecast?q='+name+'&APPID=931f4ae609990c40539f493d8d345801').then(res => res.json()).then(res =>
      dispatch({type: FETCH_CITY_FULL, payload: res.list}))
  }

  const addfavorite = async name => {
      await dispatch({type: ADD_FAVORITE, payload: name})
  }

  const deletefavorite = async name => {
      dispatch({type: DELETE_FAVORITE, payload: name})
  }

  return (
      <CityContext.Provider
        value={{
          data: state.data,
          fulldata: state.fulldata,
          url: state.url,
          fav: state.fav,
          updatecity,
          fetchcity,
          fetchcityfull,
          addfavorite,
          deletefavorite
        }}
      >
        {props.children}
      </CityContext.Provider>
    )
}

export default CityState