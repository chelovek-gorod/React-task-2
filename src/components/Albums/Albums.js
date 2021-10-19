import React, { useState, useEffect } from 'react';

import './Albums.css';

// ХУКИ
// USE SELECTOR (date from store -> map in component)
// USE DISPATCH (throw actin to reducer)

// !!!! READ HIGH ORDER COMPONENT !!!! (Компонент высшего порядка) // Умные глупые (smart/dump) компоненты

function Albums() {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [items, setItems] = useState([]);
  let [album, setAlbum] = useState(-1);
  let [page, setPage] = useState(0);

  const albumsOnPage = 6;

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/albums")
      .then(res => res.json())
      .then(
        (result) => {
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
          setIsLoaded(true);
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
    console.log('page =', page);
    console.log(items[page]);
    return items[page]
  }

  function addPhoto () {
    console.log('- ADD PHOTO -');
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }
  if (!isLoaded) {
    return <div>Loading...</div>;
  }
  if (album < 0){
    return (
        <div className="albums">
            { getPage().map(element => {
            return <div className="album-div" key={element.id} onClick={() => setAlbum(element.id)}>
                <span>Album #{element.id}</span>
              </div>
            }) }
            <div>
              <button onClick={() => setPage(page - 1)}>Previous albums</button>
              <button onClick={() => setPage(page + 1)}>Next albums</button>
            </div>
        </div>
    );
  } else {
    return (
        <div className="photos">
        <div><button onClick={() => setAlbum(album = 0)}>Back to albums</button></div>
        {getAlbum().map(element => <div className="photo" key={element.id}>{element.title}</div>)}
        <div className="addPhoto" onClick={addPhoto}>Add photo</div>
        </div>
    );
  }
}

export default Albums;