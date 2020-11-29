import { FETCH_TRACKS, SEARCH_TRACK } from "./Types";
import axios from "axios";

export const fetchTracks = () => (dispatch) => {
  axios
    .get(
      `https://cors-anywhere.herokuapp.com/https://api.musixmatch.com/ws/1.1/chart.tracks.get?chart_name=top&page=1&page_size=10&country=uk&f_has_lyrics=1&apikey=${process.env.REACT_APP_MM_KEY}`
    )
    .then((res) => console.log(res.data))
    .then((tracks) =>
      dispatch({
        type: FETCH_TRACKS,
        payload: tracks,
      })
    )
    .catch((err) => console.log(err));
};
