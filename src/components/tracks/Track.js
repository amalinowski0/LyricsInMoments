import React from "react";
import { Link } from "react-router-dom";

const Track = (props) => {
  const { track } = props;
  return (
    <div className="col-md-6 mb-3">
      <div className="card mb-4 shadow-sm h-100">
        <div className="card-body d-flex flex-column">
          <h4>{track.artist_name}</h4>
          <p className="card-text mt-auto mb-auto">
            <strong> Track </strong>: {track.track_name}
            <br />
            <strong> Album </strong>: {track.album_name}
          </p>
          <Link
            to={`lyrics/track/${track.track_id}`}
            className="btn btn-dark btn-block mt-auto"
          >
            {" "}
            View Lyrics
          </Link>
        </div>
      </div>
    </div>
  );
};
export default Track;
