import {UPDATE_CITY, FETCH_CITY} from '../actions/actionTypes'

const initialState = {
    data: '',
    url: 'Izhevsk'
}

export default function city(state = initialState, action){
    switch(action.type){
        case FETCH_CITY:
            return{
                ...state,
                data: action.payload
            }
        case UPDATE_CITY:
            return{
                ...state,
                url: action.payload
            }
    default:
        return state
    }
}