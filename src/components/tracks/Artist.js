import React, { useState, useEffect } from "react";
import axios from "axios";
import Loader from "../layout/Loader";
import { Link } from "react-router-dom";

export const Artist = (props) => {
  const [artist, setArtist] = useState({});
  const [albums, setAlbums] = useState([]);

  useEffect(() => {
    axios
      .get(
        `https://cors-anywhere.herokuapp.com/https://api.musixmatch.com/ws/1.1/artist.get?artist_id=${props.match.params.id}&apikey=${process.env.REACT_APP_MM_KEY}`
      )
      .then((res) => {
        setArtist(res.data.message.body.artist);
        return axios.get(
          `https://cors-anywhere.herokuapp.com/https://api.musixmatch.com/ws/1.1/artist.albums.get?artist_id=${props.match.params.id}&s_release_date=desc&g_album_name=1&apikey=${process.env.REACT_APP_MM_KEY}`
        );
      })
      .then((res) => {
        setAlbums(res.data.message.body.album_list);
      })
      .catch((err) => console.log(err));
  }, [props.match.params.id]);

  const GetAlbums = (props) => {
    const { albums } = props;
    if (albums === undefined || albums.length === 0) {
      return <p>This artist has no albums known to us.</p>;
    } else {
      return albums.map((item) => (
        <>
          <li className="list-group-item">
            <strong>{item.album.album_name}</strong>
            {/* <Link
              to={`/artist/album/${item.album.album_id}`}
              className="btn btn-dark btn-block mt-auto"
            >
              {" "}
              View Album
            </Link> */}
          </li>
        </>
      ));
    }
  };

  if (
    artist === undefined ||
    Object.keys(artist).length === 0 ||
    albums === undefined ||
    albums.length === 0
  ) {
    return <Loader />;
  } else {
    return (
      <>
        <Link to="/" className="btn btn-dark btn-sm mb-4">
          HOME
        </Link>
        <h3>
          <strong>{artist.artist_name}</strong>
        </h3>
        <div className="card">
          <h5 className="card-header">DISCOGRAPHY </h5>
          <ul className="list-group">
            <GetAlbums albums={albums} />
          </ul>
        </div>
      </>
    );
  }
};
