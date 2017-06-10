import { combineReducers } from 'redux';




const Geolocation = (state = {}, action) => {
  switch (action.type) {
    case 'START_GEO':
    case 'FOUND_GEO':
    default:
      return state
  }
}



const rootReducer = combineReducers({
  Geolocation
});


export default rootReducer;
