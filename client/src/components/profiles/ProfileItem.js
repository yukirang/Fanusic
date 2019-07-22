import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const ProfileItem = ({
  profile: {
    user: { _id, name, avatar },
    location,
    artists
  }
}) => {
  return (
    <div className='profile'>
      <Link to={`/profile/${_id}`}>
        <img src={avatar} alt='' className='round-img' />
      </Link>
      <div>
        <h2>{name}</h2>
        <p className='my-1'>{location && <span>{location}</span>}</p>
        <Link to={`/profile/${_id}`} className='btn btn-primary'>
          View Profile
        </Link>
      </div>
      <ul>
        {artists.map((artist, index) => (
          <li key={index} className='artist'>
            <i className='fas fa-music fa-1x' /> {artist}
          </li>
        ))}
      </ul>
    </div>
  );
};

ProfileItem.propTypes = {
  profile: PropTypes.object.isRequired
};

export default ProfileItem;
