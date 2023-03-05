import { FETCH_USER } from '../actions/types';

export default function (state = null, action) {
  switch (action.type) {
    case FETCH_USER:
      return action.payload || false; // returns false if no payload is returned.
    default:
      return state;
  }
}