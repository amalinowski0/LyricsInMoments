import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import { fetchTopTracks } from "../../actions/TrackActions";

import Track from "./Track";
import Loader from "../layout/Loader";

const Tracks = () => {
  const trackList = useSelector((state) => state.tracks.tracks);
  const heading = useSelector((state) => state.tracks.heading);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchTopTracks());
  }, [dispatch]);

  if (trackList === undefined || trackList.length === 0) {
    //dispatch(fetchTopTracks());
    return <Loader />;
  } else {
    return (
      <>
        <h1>{heading}</h1>
        <div className="row">
          {trackList.map((item) => (
            <Track key={item.track.track_id} track={item.track} />
          ))}
        </div>
      </>
    );
  }
};

Tracks.propTypes = {
  fetchTracks: PropTypes.func.isRequired,
  tracks: PropTypes.array.isRequired,
};

export default Tracks;
