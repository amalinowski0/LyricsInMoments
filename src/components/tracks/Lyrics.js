import React, { useState, useEffect } from "react";
import axios from "axios";
import Loader from "../layout/Loader";
import { Link } from "react-router-dom";

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
  }, [props.match.params.id]);

  return (
    <div>
      {track === undefined ||
      lyrics === undefined ||
      Object.keys(track).length === 0 ||
      Object.keys(lyrics).length === 0 ? (
        <Loader />
      ) : (
        <React.Fragment>
          <Link to="/" className="btn btn-dark btn-sm mb-4">
            Return
          </Link>
          <div className="card">
            <h5 className="card-header">
              {track.track_name} by{" "}
              <span className="text-secondary">{track.artist_name}</span>
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
                {
                  track.primary_genres.music_genre_list[0].music_genre
                    .music_genre_name
                }
              </li>
              <li className="list-group-item">
                <strong>Explicit</strong>: {track.explicit === 0 ? "No" : "Yes"}
              </li>
            </ul>
          </div>
        </React.Fragment>
      )}
    </div>
  );
};

export default Lyrics;
