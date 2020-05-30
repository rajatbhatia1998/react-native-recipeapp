import {SET_FAVORITES} from './actionCreator'

export default function setFavorites(payload){
    return {
        type:SET_FAVORITES,
        payload
    }
}