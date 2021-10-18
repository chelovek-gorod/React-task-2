import React, { useState, useEffect } from 'react';

import './Albums.css';

function Albums() {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [items, setItems] = useState([]);
  let [album, setAlbum] = useState(0);

  const albumsToLoad = 6;
  const albumsArr = [];
  for (let i = 1; i <= albumsToLoad; i++) albumsArr.push(i);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/albums")
      .then(res => res.json())
      .then(
        (result) => {
          setIsLoaded(true);
          let albums = result.filter(e => {
            if (e.userId <= albumsToLoad) return e;
          })
          setItems(albums);
        })
        .catch((error) => {
          setIsLoaded(true);
          setError(error);
        })
  }, []);

  function getAlbum() {
    return items.filter(e => e.userId === album)
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  } else if (!isLoaded) {
    return <div>Loading...</div>;
  } else if (album === 0){
    return (
        <div className="albums">
            { albumsArr.map(e => <div className="album-div" key={e} onClick={() => setAlbum(album = e)}><span>Album #{e}</span></div>) }
        </div>
    );
  } else {
    return (
        <div className="photos">
        <div><button onClick={() => setAlbum(album = 0)}>Back to albums</button></div>
        {getAlbum().map(e => <div className="photo" key={e.id}>{e.title}</div>)}
        </div>
    );
  }
}

export default Albums;