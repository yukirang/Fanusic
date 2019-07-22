import axios from 'axios';
import { GET_ARTISTS, ARTISTS_ERROR } from './type';

// Get Aritists (include Recommendations)
export const getArtists = artists => async dispatch => {
  try {
    const res = await axios.get(
      `/api/profile/artists?artists=${artists.toString()}`
    );
    dispatch({
      type: GET_ARTISTS,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: ARTISTS_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};
