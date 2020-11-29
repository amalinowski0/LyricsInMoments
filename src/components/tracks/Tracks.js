import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTracks } from "../../actions/TrackActions";

const Tracks = () => {
  const topTracks = useSelector((state) => state.tracks.items);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchTracks());
  }, []);

  // const topTrackList = topTracks.map((track) => (
  //   <div key={track.id}>
  //     <h3>{track.title}</h3>
  //     <p>{track.body}</p>
  //   </div>
  // ));

  return (
    <div>
      <h1>Tracks</h1>
      {console.log(topTracks)}
    </div>
  );
};

export default Tracks;
