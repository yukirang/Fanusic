import React from 'react';

const RecommendItem = ({ album }) => {
  return (
    <div className='recommend'>
      <a
        href={album.external_urls.spotify}
        target='_blank'
        rel='noopener noreferrer'
      >
        <img src={album.images[0].url} alt='' className='round-img' />
      </a>
      <div>
        <h3>{album.name}</h3>
        <i className='fas fa-music fa-1x' />
        {album.artists[0].name}
      </div>
    </div>
  );
};

export default RecommendItem;
