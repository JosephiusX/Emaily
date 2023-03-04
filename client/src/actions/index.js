import axios from 'axios';
import { FETCH_USER } from './types';

export const fetchUser = () => async dispatch => {// redux-thunk gives this dispatch
  const res = await axios.get('/api/current_user'); // we send a request
  
  dispatch({ type: FETCH_USER, payload: res }); // then despatch once the response is recieved. 
};

    // Before Refactor and async await.
// export const fetchUser = () => {
//   return function(dispatch) {
//     axios
//     .get('/api/current_user')
//     .then(res => dispatch({ type: FETCH_USER, payload: res }));
//   };
// };