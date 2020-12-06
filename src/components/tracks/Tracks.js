import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import { fetchTracks } from "../../actions/TrackActions";

import Track from "./Track";
import Loader from "../layout/Loader";

const Tracks = () => {
  const topTracks = useSelector((state) => state.tracks.items);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchTracks());
  }, []);

  return (
    <div>
      {topTracks === undefined || topTracks.length === 0 ? (
        <Loader />
      ) : (
        <React.Fragment>
          <h1>Tracks</h1>
          <React.Fragment>
            <div className="row">
              {topTracks.map((item) => (
                <Track key={item.track.track_id} track={item.track} />
              ))}
            </div>
          </React.Fragment>
        </React.Fragment>
      )}
    </div>
  );
};

Tracks.propTypes = {
  fetchTracks: PropTypes.func.isRequired,
  tracks: PropTypes.array.isRequired,
};

export default Tracks;
