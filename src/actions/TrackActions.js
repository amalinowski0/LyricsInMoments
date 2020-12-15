import { FETCH_TOPTRACKS, SEARCH_TRACK, CLEAR_STATE } from "./Types";
import axios from "axios";

export const fetchTopTracks = () => (dispatch) => {
  axios
    .get(
      `https://cors-anywhere.herokuapp.com/https://api.musixmatch.com/ws/1.1/chart.tracks.get?chart_name=top&page=1&page_size=10&country=uk&f_has_lyrics=1&apikey=${process.env.REACT_APP_MM_KEY}`
    )
    .then((tracks) =>
      dispatch({
        type: FETCH_TOPTRACKS,
        payload: tracks.data.message.body.track_list,
      })
    )
    .catch((err) => console.log(err));
};

export const searchForLyrics = (trackTitle) => (dispatch) => {
  axios
    .get(
      `https://cors-anywhere.herokuapp.com/https://api.musixmatch.com/ws/1.1/track.search?q_track=${trackTitle}&page_size=100&s_track_rating=desc&apikey=${process.env.REACT_APP_MM_KEY}`
    )
    .then((tracks) => {
      axios
        .get(
          `https://cors-anywhere.herokuapp.com/https://api.musixmatch.com/ws/1.1/artist.search?q_artist=${trackTitle}&page_size=100&apikey=${process.env.REACT_APP_MM_KEY}`
        )
        .then((artists) => {
          dispatch({
            type: SEARCH_TRACK,
            payload: {
              track_list: tracks.data.message.body.track_list,
              artist_list: artists.data.message.body.artist_list,
              query: trackTitle,
            },
          });
        })
        .catch((err) => console.log(err));
    })
    .catch((err) => console.log(err));
};

export const clearState = () => (dispatch) => {
  dispatch({
    type: CLEAR_STATE,
  });
};
