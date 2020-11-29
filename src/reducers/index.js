import { combineReducers } from "redux";
import TrackReducer from "./TrackReducer";

export default combineReducers({
  tracks: TrackReducer,
});
