import {UPDATE_CITY, FETCH_CITY, FETCH_CITY_FULL, ADD_FAVORITE, DELETE_FAVORITE} from '../actions/actionTypes'

const initialState = {
    data: [],
    fulldata: [],
    url: 'Izhevsk',
    fav: []
}

export default function city(state = initialState, action){
    switch(action.type){
        case FETCH_CITY:
            return{
                ...state,
                data: action.payload
            }
        case FETCH_CITY_FULL:
            return{
                ...state,
                fulldata: action.payload
            }    
        case UPDATE_CITY:
            return{
                ...state,
                url: action.payload
            }
        case ADD_FAVORITE:
            return{
                ...state,
                fav: [...state.fav, action.payload]
            }
        case DELETE_FAVORITE:
            let tempfav=[...state.fav]
            tempfav.splice(action.payload,1)
            return{
                ...state,
                fav: tempfav
        }            
    default:
        return state
    }
}