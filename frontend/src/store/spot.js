//************************Imports*******************//
import { csrfFetch } from "./csrf";

//************************ Imports *******************//
const LOAD_SPOTS = "spot/loadSpots";
const LOAD_SINGLE_SPOT = "spot/loadSingleSpot"
const CREATE_SPOT = 'spot/createSpot'
const EDIT_SPOT = 'spot/editSpot'
const CURRENT_USER_SPOTS = 'spot/currentuserspot'
const DELETE_SPOT = 'spot/deleteSpot'


//************************ Action Creators *******************//
const loadSpots = (spots) => {
  return {
    type: LOAD_SPOTS,
    payload: spots,
  };
};

const loadSingleSpot = (spot) => {
  
  return {
    type: LOAD_SINGLE_SPOT,
    spot
    
  };
};

const createSpot = (newSpot) => {
  return {
    type: CREATE_SPOT,
    newSpot
    
  };
};
const currentuserspot = (spots) => {
  return {
    type : CURRENT_USER_SPOTS,
    payload:spots
  }
}

const editSpot = (editspot) => {
  return {
    type: EDIT_SPOT,
    editspot
    
  };
};
const deleteSpot = (deleteid) => {
  return {
    type: DELETE_SPOT,
    deleteid
    
  };
};








//************************ Thunk Creators *******************//
export const thunkloadspots = () => async (dispatch) => {
  const response = await csrfFetch("/api/spots")
  if(response.ok) {
    const spots = await response.json();
    dispatch(loadSpots(spots));
    return spots
    
  }  
};

export const thunkloadsinglespot = (spotId) => async (dispatch) => {
  const response = await csrfFetch(`/api/spots/${spotId}`)
  if(response.ok) {
    const spot = await response.json();
    dispatch(loadSingleSpot(spot));
    return spot
    
  }  
  
};

export const thunkcreateanewspot = (spot,images) => async (dispatch) => {
  const response = await csrfFetch('/api/spots',{
  method:'POST',
  headers:{ "Content-Type" : 'application/json' },
  body: 
   JSON.stringify(spot)
  
  })
  let newSpot 
  if(response.ok) {
    newSpot = await response.json();
    
    //dispatch(createSpot(newSpot));
    //let imageArray=[];
    for(let i = 0; i < images.length; i++){
      // let imageObject = {
      //   url:images[i],
      //   preview:true
      // }
      const res = await csrfFetch (`/api/spots/${newSpot.id}/images`,{
        method:'POST',
        headers:{ "Content-Type" : 'application/json' },
        body: 
        JSON.stringify(images[i])
    })
    
   // const res = await csrfFetch (`/api/spots/${newSpot.id}`)
    //const newSpotEdit = await response.json();
    //imageArray.push(newSpotImages)
     dispatch(createSpot(newSpot))
    
    //return newSpot;
  } 
  } 
  //const data = await response.json()
  return newSpot;  
};

export const thunkcurrentuserspot = () => async (dispatch) => {
  const response = await csrfFetch("/api/spots/current")
  if(response.ok) {
    const currentspots = await response.json();
    dispatch(currentuserspot(currentspots));
    return currentspots
    
  }  
};




export const thunkeditnewspot = (spot) => async (dispatch) => {

  const response = await csrfFetch(`/api/spots/${spot.id}`,{
  method:'PUT',
  headers:{ "Content-Type" : 'application/json' },
  body: 
   JSON.stringify(spot)
  
  })
  if(response.ok) {
    const Spottoedit = await response.json();
    dispatch(editSpot(Spottoedit))
    
    return Spottoedit
  }
}

export const thunkdeletespot = (spotId) => async (dispatch) => {
  
  const response = await csrfFetch(`/api/spots/${spotId}`,{
  method:'DELETE'
  })
  if(response.ok) {
    const Spottodelete = await response.json();
    dispatch(deleteSpot(Spottodelete.id))
    return Spottodelete
  }
}





//************************ Reducer *******************//
const initialState = { 
  allSpots:{},
  singleSpot:{}
 };

const spotReducer = (state = initialState, action) => {
  let newState= { ...state, allSpots: {...state.allSpots}, singleSpot: {...state.singleSpot}}
  switch (action.type) {
    case LOAD_SPOTS:
     
      action.payload.Spots.map((spot) => {
       newState.allSpots[spot.id]=spot
      })
      return newState;
      
    case LOAD_SINGLE_SPOT:
      
        newState.singleSpot = {...action.spot}
        return newState
    case CREATE_SPOT:
      newState.allSpots[action.newSpot.id]=action.newSpot
      return newState
    case EDIT_SPOT:
      
      newState.allSpots[action.editspot.id]=action.editspot
      return newState
    case CURRENT_USER_SPOTS:
      const userState = {allSpots:{},singleSpot:{}}
      action.payload.Spots.forEach((spot) => {
        userState.allSpots[spot.id]=spot
      })
      return userState
    case DELETE_SPOT:
      
      delete newState.allSpots[action.deleteid]
      return newState;
        

  
    
    
    default:
      return state;
  }
};

export default spotReducer;
