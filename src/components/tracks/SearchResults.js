import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const SearchResults = () => {
  const trackList = useSelector((state) => state.tracks.tracks);
  const artistList = useSelector((state) => state.tracks.artists);
  const heading = useSelector((state) => state.tracks.heading);

  const GetTracks = (props) => {
    const { tracks } = props;

    if (tracks === undefined || tracks.length === 0) {
      return <p>There are no tracks that match your query.</p>;
    } else {
      return tracks.map((item) => (
        <>
          <li className="list-group-item">
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
      ));
    }
  };
  const GetArtists = (props) => {
    const { artists } = props;

    if (artists === undefined || artists.length === 0) {
      return <p>There are no artists that match your query.</p>;
    } else {
      return artists.map((item) => (
        <>
          <li className="list-group-item">
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
      ));
    }
  };

  return (
    <>
      <h1>{heading}</h1>
      <div className="row">
        <div className="col-md-6 mb-3">
          <div className="card">
            <h5 className="card-header">Tracks Found:</h5>
            <ul className="list-group">
              <GetTracks tracks={trackList} />
            </ul>
          </div>
          <p>to be button for more...</p>
        </div>
        <div className="col-md-6 mb-3">
          <div className="card">
            <h5 className="card-header">Artists Found:</h5>
            <ul className="list-group">
              <GetArtists artists={artistList} />
            </ul>
          </div>
          <p>to be button for more...</p>
        </div>
      </div>
    </>
  );
};
export default SearchResults;
