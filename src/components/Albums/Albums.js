import React, { useState, useEffect } from 'react';

import './Albums.css';

function Albums() {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [items, setItems] = useState([]);
  let [album, setAlbum] = useState(0);
  let [page, setPage] = useState(0);

  const albumsOnPage = 6;

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/albums")
      .then(res => res.json())
      .then(
        (result) => {
          setIsLoaded(true);
          let resultSize = result.length;
          let albums = [];
          let page = [];
          for (let i = 0; i < resultSize; i++) {
            page.push(result[i]);
            if (page.length === albumsOnPage) {
              albums.push(page);
              page = [];
            }
          }
          if (page.length) albums.push(page);
          setItems(albums);
          console.log(albums);
        })
        .catch((error) => {
          setIsLoaded(true);
          setError(error);
        })
  }, []);

  function getAlbum () {
    return items.filter(e => e.userId === album)
  }

  function getPage () {
    return items[page]
  }

  function addPhoto () {
    console.log('- ADD PHOTO -');
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  } else if (!isLoaded) {
    return <div>Loading...</div>;
  } else if (album === 0){
    return (
        <div className="albums">
            { console.log(getPage()) /*getPage().map(e => <div className="album-div" key={e.id} onClick={() => setAlbum(album = e)}><span>Album #{e}</span></div>) */}
            <div>
              <button onClick={() => setPage(page -= 1)}>Previous albums</button>
              <button onClick={() => setPage(page += 1)}>Next albums</button>
            </div>
        </div>
    );
  } else {
    return (
        <div className="photos">
        <div><button onClick={() => setAlbum(album = 0)}>Back to albums</button></div>
        {getAlbum().map(e => <div className="photo" key={e.id}>{e.title}</div>)}
        <div className="addPhoto" onClick={addPhoto}>Add photo</div>
        </div>
    );
  }
}

export default Albums;