import { GET_ARTISTS, ARTISTS_ERROR } from '../actions/type';

const initialState = {
  artists: [],
  loading: true,
  error: {}
};

export default function(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case GET_ARTISTS:
      return {
        ...state,
        artists: payload,
        loading: false
      };
    case ARTISTS_ERROR:
      return {
        ...state,
        error: payload,
        loading: false
      };
    default:
      return state;
  }
}
