import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { searchForTracks } from "../../actions/TrackActions";

const Search = () => {
  const [trackTitle, setTrackTitle] = useState("");
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setTrackTitle(e.target.value);
  };

  const findTrack = (e) => {
    e.preventDefault();
    dispatch(searchForTracks(trackTitle));
    setTrackTitle("");
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
            placeholder="Song title..."
            name="trackTitle"
            value={trackTitle}
            onChange={handleChange}
          />
        </div>
        <button className="btn btn-primary btn-lg btn-block mb-3" type="submit">
          Get Lyrics
        </button>
      </form>
    </div>
  );
};

export default Search;
