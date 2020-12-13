import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, withRouter } from "react-router-dom";
import Loader from "../layout/Loader";

const Album = (props) => {
  const [trackList, setTrackList] = useState([]);
  const { item } = props.location.state;

  useEffect(() => {
    axios
      .get(
        `https://cors-anywhere.herokuapp.com/https://api.musixmatch.com/ws/1.1/album.tracks.get?album_id=${item.album.album_id}&apikey=${process.env.REACT_APP_MM_KEY}`
      )
      .then((res) => {
        setTrackList(res.data.message.body.track_list);
      })
      .catch((err) => console.log(err));
  }, [item.album.album_id]);

  const GetTrackList = () => {
    return trackList.map((track) => (
      <>
        <div
          key={track.track.track_id}
          className="d-flex align-items-center list-group-item"
        >
          {track.track.track_name}
          <Link
            to={`/artist/${track.track.artist_id}/album/${track.track.album_id}/lyrics/track/${track.track.track_id}`}
            className="btn btn-dark mt-auto ml-auto"
          >
            {" "}
            View Lyrics
          </Link>
        </div>
      </>
    ));
  };

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
        <h4 className="card-header">
          {item.album.album_name} by{" "}
          <span className="text-secondary">{item.album.artist_name}</span>
        </h4>
        {trackList === undefined || trackList.length === 0 ? (
          <Loader />
        ) : (
          <ul className="list-group list-group-flush">
            <GetTrackList />
          </ul>
        )}
      </div>
    </>
  );
};

export default withRouter(Album);
