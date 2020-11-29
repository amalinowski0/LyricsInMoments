import { FETCH_TRACKS, SEARCH_TRACK } from "../actions/Types";

const initialState = {
  items: [],
  item: {},
};

export default function (state = initialState, action) {
  switch (action.type) {
    case FETCH_TRACKS: {
      return {
        ...state,
        items: action.payload,
      };
    }
    default: {
      return state;
    }
  }
}
