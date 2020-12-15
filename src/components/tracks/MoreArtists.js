import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Link, withRouter } from "react-router-dom";
import Loader from "../layout/Loader";
import Pagination from "./Pagination";

const MoreArtists = (props) => {
  const artistList = useSelector((state) => state.tracks.artists);
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(10);

  //get current artists
  const indexOfLastArtist = currentPage * perPage;
  const indexOfFirstArtist = indexOfLastArtist - perPage;
  const currentArtists = artistList.slice(
    indexOfFirstArtist,
    indexOfLastArtist
  );

  //change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  if (artistList === undefined || artistList.length === 0) {
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
        <h1>Artists</h1>
        <div className="row"></div>
        <Pagination
          perPage={perPage}
          totalList={artistList.length}
          paginate={paginate}
        />
      </>
    );
  }
};

export default withRouter(MoreArtists);
