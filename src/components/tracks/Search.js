import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { searchForLyrics, clearState } from "../../actions/TrackActions";
import { withRouter } from "react-router-dom";

const Search = ({ history }) => {
  const [trackTitle, setTrackTitle] = useState("");
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setTrackTitle(e.target.value);
  };

  const findTrack = (e) => {
    e.preventDefault();
    setTrackTitle("");
    dispatch(clearState());
    dispatch(searchForLyrics(trackTitle));
    history.push(`/results`);
  };

  return (
    <div className="card card-body mb-4 p-4">
      <h1 className="display-4 text-center">Search For A Song</h1>
      <p className="lead text-center">Get the lyrics for any song</p>
      <form onSubmit={findTrack}>
        <div className="form-group">
          <input
            type="text"
            className="form-control form-control-lg"
            placeholder="Song title or artist name..."
            name="trackTitle"
            value={trackTitle}
            onChange={handleChange}
          />
        </div>
        <button className="btn btn-primary btn-lg btn-block mb-3" type="submit">
          SEARCH
        </button>
      </form>
    </div>
  );
};

export default withRouter(Search);
