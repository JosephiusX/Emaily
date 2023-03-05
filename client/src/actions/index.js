import axios from 'axios';
import { FETCH_USER } from './types';

//export fn with redux-thunks async dispatch argument fn passed in, select action to respond only once this request is complete.  
// export const fetchUser = () => async dispatch => dispatch({ type: FETCH_USER, payload: await axios.get('/api/current_user')}); // finding it impossible to abstracy the data into its own property this oneliner

// export const fetchUser = () => async dispatch => { 
//   dispatch({ type: FETCH_USER, payload: await axios.get('/api/current_user')})
// };

export const fetchUser = () => async dispatch => { // fetch user fn implicidly calls async dispatch functio
  const res = await axios.get('/api/current_user'); // set response constant to await the api request.
  dispatch({ type: FETCH_USER, payload: res.data });// finally dispatch 
};

    // Before Refactor and async await.
// export const fetchUser = () => {
//   return function(dispatch) { // redux-thunk gives this dispatch
//     axios
//     .get('/api/current_user') // we send a request
//     .then(res => dispatch({ type: FETCH_USER, payload: res })); // then despatch once the response is recieved. 
//   };
// };