import {SET_FAVORITES} from '../action/actionCreator'
const initialState = {
    meals:[]
}




export default function favoriteReducer(state=initialState,action){
    switch(action.type){
        case SET_FAVORITES:
            return {
                meals:action.payload
            }
        default:
            return state;
    }
}