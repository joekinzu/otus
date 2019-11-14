import {UPDATE_CITY, FETCH_CITY, FETCH_CITY_FULL, ADD_FAVORITE, DELETE_FAVORITE} from './actionTypes'

export const updatecity = name => dispatch => {
    dispatch({type: UPDATE_CITY, payload: name})
}

export const fetchcity = name => dispatch => {
    fetch('https://api.openweathermap.org/data/2.5/weather?q='+name+'&APPID=931f4ae609990c40539f493d8d345801').then(res => res.json()).then(res =>
    dispatch({type: FETCH_CITY, payload: res}))
}

export const fetchcityfull = name => dispatch => {
    fetch('https://api.openweathermap.org/data/2.5/forecast?q='+name+'&APPID=931f4ae609990c40539f493d8d345801').then(res => res.json()).then(res =>
    dispatch({type: FETCH_CITY_FULL, payload: res.list}))
}

export const addfavorite = name => dispatch => {
    dispatch({type: ADD_FAVORITE, payload: name})
}

export const deletefavorite = name => dispatch => {
    dispatch({type: DELETE_FAVORITE, payload: name})
}