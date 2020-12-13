import React from "react";
import { useSelector } from "react-redux";
import { Link, withRouter } from "react-router-dom";
import Loader from "../layout/Loader";

const SearchResults = (props) => {
  const trackList = useSelector((state) => state.tracks.tracks);
  const artistList = useSelector((state) => state.tracks.artists);

  const GetTracks = (props) => {
    const { tracks } = props;
    return tracks.map(
      (item, index) =>
        index < 5 && (
          <>
            <li key={index} className="list-group-item">
              <strong>{item.track.track_name}</strong>
              <Link
                to={`lyrics/track/${item.track.track_id}`}
                className="btn btn-dark btn-block mt-auto"
              >
                {" "}
                View Lyrics
              </Link>
            </li>
          </>
        )
    );
  };
  const GetArtists = (props) => {
    const { artists } = props;

    return artists.map(
      (item, index) =>
        index < 5 && (
          <>
            <li key={index} className="list-group-item">
              <strong>{item.artist.artist_name}</strong>
              <Link
                to={`artist/${item.artist.artist_id}`}
                className="btn btn-dark btn-block mt-auto"
              >
                {" "}
                View Artist
              </Link>
            </li>
          </>
        )
    );
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
      <h1>Search Results</h1>
      <div className="row">
        <div className="col-md-6 mb-3">
          <div className="card">
            <h5 className="card-header">Tracks Found:</h5>
            {trackList === undefined ? (
              <Loader />
            ) : (
              <ul className="list-group">
                {trackList.length === 0 ? (
                  <p>There are no tracks that match your query.</p>
                ) : (
                  <GetTracks tracks={trackList} />
                )}
              </ul>
            )}
          </div>
          {trackList.length > 5 && <p>to be button for more...</p>}
        </div>
        <div className="col-md-6 mb-3">
          <div className="card">
            <h5 className="card-header">Artists Found:</h5>
            {artistList === undefined ? (
              <Loader />
            ) : (
              <ul className="list-group">
                {artistList.length === 0 ? (
                  <p>There are no artists that match your query.</p>
                ) : (
                  <GetArtists artists={artistList} />
                )}
              </ul>
            )}
          </div>
          {artistList.length > 5 && <p>to be button for more...</p>}
        </div>
      </div>
    </>
  );
};
export default withRouter(SearchResults);
