import React, { useState, useEffect } from "react";
import axios from "axios";
import Loader from "../layout/Loader";
import { Link, withRouter } from "react-router-dom";

const Artist = (props) => {
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

  const GetDiscography = () => {
    if (albums === undefined || albums.length === 0) {
      return <p>This artist has no albums known to us.</p>;
    } else {
      return albums.map((item) => (
        <>
          <div key={item.album.album_id} className={`discography-list-row`}>
            <ul className="list-group list-group-flush">
              <li className="album-name">
                <strong>{item.album.album_name}</strong>
              </li>
              <li className="list-group-item">
                <strong>Genre</strong>:{" "}
                {item.album.primary_genres.music_genre_list.length > 0
                  ? item.album.primary_genres.music_genre_list.map(
                      (item) => `${item.music_genre.music_genre_name} `
                    )
                  : "--"}
              </li>
              <li className="list-group-item">
                <strong>Release date</strong>: {item.album.album_release_date}
              </li>
            </ul>
            <div className="row mt-3">
              <Link
                to={{
                  pathname: `/artist/${item.album.artist_id}/album/${item.album.album_id}`,
                  state: { item },
                }}
                className="btn btn-dark mt-auto ml-auto mr-auto w-50"
              >
                {" "}
                View Album
              </Link>
            </div>
          </div>
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
        <button
          className="btn btn-dark btn-sm mb-4"
          onClick={props.history.goBack}
        >
          RETURN
        </button>
        <Link to="/" className="btn btn-dark btn-sm mb-4 ml-3">
          HOME
        </Link>
        <div className="row">
          <h2>
            <strong>{artist.artist_name}</strong>
          </h2>
          <div className="col-md-10 mb-3 mt-5">
            <div className="card shadow-sm">
              <h4 className="card-header">DISCOGRAPHY </h4>
              <div className="discography-list">
                <GetDiscography />
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
};
export default withRouter(Artist);
