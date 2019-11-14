import {UPDATE_CITY, FETCH_CITY} from './actionTypes'

export const updatecity = name => dispatch => {
    dispatch({type: UPDATE_CITY, payload: name})
}

export const fetchcity = name => dispatch => {
    console.log('got',name)
    fetch('https://api.openweathermap.org/data/2.5/weather?q='+name+'&APPID=931f4ae609990c40539f493d8d345801').then(res => res.json()).then(res =>
    dispatch({type: FETCH_CITY, payload: res}))
}