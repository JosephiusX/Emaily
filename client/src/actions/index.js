import axios from 'axios';
import { FETCH_USER } from './types';

export const fetchUser = () => {
  return function(dispatch) { // redux-thunk gives this dispatch
    axios
    .get('/api/current_user') // we send a request
    .then(res => dispatch({ type: FETCH_USER, payload: res })); // then despatch once the response is recieved. 
  };
};