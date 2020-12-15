import React, { useState, useEffect } from "react";
import axios from "axios";
import Loader from "../layout/Loader";
import { Link, withRouter } from "react-router-dom";

const Lyrics = (props) => {
  const [track, setTrack] = useState({});
  const [lyrics, setLyrics] = useState({});

  useEffect(() => {
    axios
      .get(
        `https://cors-anywhere.herokuapp.com/https://api.musixmatch.com/ws/1.1/track.lyrics.get?track_id=${props.match.params.id}&apikey=${process.env.REACT_APP_MM_KEY}`
      )
      .then((res) => {
        setLyrics(res.data.message.body.lyrics);
        return axios.get(
          `https://cors-anywhere.herokuapp.com/https://api.musixmatch.com/ws/1.1/track.get?track_id=${props.match.params.id}&apikey=${process.env.REACT_APP_MM_KEY}`
        );
      })
      .then((res) => {
        setTrack(res.data.message.body.track);
      })
      .catch((err) => console.log(err));
    return () => {
      setLyrics({});
      setTrack({});
    };
  }, [props.match.params.id]);

  if (track === undefined || Object.keys(track).length === 0) {
    return <Loader />;
  } else if (track.has_lyrics === 0) {
    return (
      <>
        <button
          className="btn btn-dark btn-sm mb-4"
          onClick={props.history.goBack}
        >
          RETURN
        </button>
        <Link to="/" className="btn btn-dark btn-sm mb-4 ml-3">
          HOME
        </Link>
        <div className="card">
          <h5 className="card-header">
            {track.track_name} by{" "}
            <span className="text-secondary">
              <Link className="btn" to={`/artist/${track.artist_id}`}>
                {track.artist_name}
              </Link>
            </span>
          </h5>
          <div className="card-body">
            <p className="card-text">We don't have lyrics for this track.</p>
          </div>
          <ul className="list-group mt-3">
            <li className="list-group-item">
              <strong>Album:ID</strong>: {track.album_id}
            </li>
            <li className="list-group-item">
              <strong>Genre</strong>:{" "}
              {track.primary_genres.music_genre_list[0] !== undefined
                ? track.primary_genres.music_genre_list[0].music_genre
                    .music_genre_name
                : "---"}
            </li>
            <li className="list-group-item">
              <strong>Explicit</strong>: {track.explicit === 0 ? "No" : "Yes"}
            </li>
          </ul>
        </div>
      </>
    );
  } else if (lyrics === undefined || Object.keys(lyrics).length === 0) {
    return <Loader />;
  } else
    return (
      <>
        <button
          className="btn btn-dark btn-sm mb-4"
          onClick={props.history.goBack}
        >
          RETURN
        </button>
        <Link to="/" className="btn btn-dark btn-sm mb-4 ml-3">
          HOME
        </Link>
        <div className="card">
          <h5 className="card-header">
            {track.track_name} by{" "}
            <span className="text-secondary">
              <Link to={`/artist/${track.artist_id}`}>{track.artist_name}</Link>
            </span>
          </h5>
          <div className="card-body">
            <p className="card-text">{lyrics.lyrics_body}</p>
          </div>
          <ul className="list-group mt-3">
            <li className="list-group-item">
              <strong>Album:ID</strong>: {track.album_id}
            </li>
            <li className="list-group-item">
              <strong>Genre</strong>:{" "}
              {track.primary_genres.music_genre_list[0] !== undefined
                ? track.primary_genres.music_genre_list[0].music_genre
                    .music_genre_name
                : "-"}
            </li>
            <li className="list-group-item">
              <strong>Explicit</strong>: {track.explicit === 0 ? "No" : "Yes"}
            </li>
          </ul>
        </div>
      </>
    );
};

export default withRouter(Lyrics);
