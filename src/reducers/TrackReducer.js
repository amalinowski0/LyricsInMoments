import { FETCH_TOPTRACKS, SEARCH_TRACK, CLEAR_STATE } from "../actions/Types";

let initialState = {
  topTracks: [],
  tracks: [],
  artists: [],
  query: "",
};

export default function TrackReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_TOPTRACKS: {
      return {
        ...state,
        topTracks: action.payload,
      };
    }
    case SEARCH_TRACK: {
      return {
        ...state,
        tracks: action.payload.track_list,
        artists: action.payload.artist_list,
        query: action.payload.query,
      };
    }
    case CLEAR_STATE: {
      return {
        ...state,
        tracks: [],
        artists: [],
        query: "",
      };
    }
    default: {
      return state;
    }
  }
}
