import { FETCH_FAIL, FETCH_START, 
    FETCH_SUCCESS, SPECIES_SET } from '../actions/plantActions';

const initialState = {
    isFetching = false,
    plants = [],
    plant_species = []
}

export const reducer = (state = initialState, action) => {
    switch (action.type) {
        case(FETCH_START):
          return({
            ...state,
            isFetching: true
          })
        case(FETCH_SUCCESS):
          return({
            ...state,
            plants: action.payload,
            isFetching: false
          })
          case(FETCH_FAIL):
          return({
            ...state,
            error: action.payload,
            isFetching: false
          })
          case(SPECIES_SET):
          return({
              ...state,
              plant_species: action.payload
          })
      }
}
