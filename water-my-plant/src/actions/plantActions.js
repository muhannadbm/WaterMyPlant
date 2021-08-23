export const FETCH_FAIL = "FETCH_FAIL";
export const FETCH_START = "FETCH_START";
export const FETCH_SUCCESS = "FETCH_SUCCESS";
export const SPECIES_SET = "SPECIES_SET"

import axiosWithAuth from '../Components/axiosWithAuth/axiosWithAuth';

export const fetchPlants = () => {
    return (dispatch => {
      dispatch({type: FETCH_START});
      
      dispatch(fetchStart());
      axiosWithAuth().get('/api/plants')
      .then(res=> {
        dispatch({type: FETCH_SUCCESS, payload:res.data});
      })
      .catch(err=>{
        dispatch({type: FETCH_FAIL, payload:err});
      })
    });
  }
  
export const fetchStart = ()=> {
    return({type: FETCH_START});
}

    
