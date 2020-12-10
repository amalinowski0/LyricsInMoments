import { FETCH_TRACKS, SEARCH_TRACK, CLEAR_TRACKS } from "../actions/Types";

let initialState = {
  heading: "",
  tracks: [],
  artists: [],
};

export default function TrackReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_TRACKS: {
      return {
        ...state,
        tracks: action.payload,
        heading: action.heading,
      };
    }
    case SEARCH_TRACK: {
      return {
        ...state,
        tracks: action.payload.track_list,
        artists: action.payload.artist_list,
        heading: action.heading,
      };
    }
    case CLEAR_TRACKS: {
      return {
        ...state,
        tracks: [],
      };
    }
    default: {
      return state;
    }
  }
}
