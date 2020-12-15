import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Link, withRouter } from "react-router-dom";
import Loader from "../layout/Loader";
import Pagination from "./Pagination";
import Track from "./Track";

const MoreTracks = (props) => {
  const trackList = useSelector((state) => state.tracks.tracks);
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage] = useState(10);

  //get current tracks
  const indexOfLastTrack = currentPage * perPage;
  const indexOfFirstTrack = indexOfLastTrack - perPage;
  const currentTracks = trackList.slice(indexOfFirstTrack, indexOfLastTrack);

  //change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  if (trackList === undefined || trackList.length === 0) {
    return <Loader />;
  } else {
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
        <h1>Tracks</h1>
        <div className="row">
          {currentTracks.map((item) => (
            <Track key={item.track.track_id} track={item.track} />
          ))}
        </div>
        <Pagination
          perPage={perPage}
          totalList={trackList.length}
          paginate={paginate}
        />
      </>
    );
  }
};
export default withRouter(MoreTracks);
