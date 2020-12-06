import { FETCH_TRACKS, SEARCH_TRACK } from "./Types";
import axios from "axios";

export const fetchTracks = () => (dispatch) => {
  axios
    .get(
      `https://cors-anywhere.herokuapp.com/https://api.musixmatch.com/ws/1.1/chart.tracks.get?chart_name=top&page=1&page_size=10&country=uk&f_has_lyrics=1&apikey=${process.env.REACT_APP_MM_KEY}`
    )
    .then((tracks) =>
      dispatch({
        type: FETCH_TRACKS,
        payload: tracks.data.message.body.track_list,
      })
    )
    .catch((err) => console.log(err));
};

export const searchForTracks = (trackTitle) => (dispatch) => {
  axios
    .get(
      `https://cors-anywhere.herokuapp.com/https://api.musixmatch.com/ws/1.1/track.search?q_track=${trackTitle}&page_size=10&page=1&s_track_rating=desc&apikey=${process.env.REACT_APP_MM_KEY}`
    )
    .then((tracks) =>
      dispatch({
        type: SEARCH_TRACK,
        payload: tracks.data.message.body.track_list,
      })
    )
    .catch((err) => console.log(err));
};
