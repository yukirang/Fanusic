import React from 'react';
import PropTypes from 'prop-types';

const ProfileTop = ({
  profile: {
    location,
    social,
    user: { name, avatar }
  }
}) => (
  <div className='bg-primary p-2'>
    <img className='round-img' src={avatar} alt='' />
    <h1 className='large'>{name}</h1>

    <p>{location && <span>{location}</span>}</p>
    <div className='icons my-1'>
      {social && social.twitter && (
        <a href={social.twitter} target='_blank' rel='noopener noreferrer'>
          <i className='fab fa-twitter fa-lg' />
        </a>
      )}
      {social && social.facebook && (
        <a href={social.facebook} target='_blank' rel='noopener noreferrer'>
          <i className='fab fa-facebook fa-lg' />
        </a>
      )}
      {social && social.youtube && (
        <a href={social.youtube} target='_blank' rel='noopener noreferrer'>
          <i className='fab fa-youtube fa-lg' />
        </a>
      )}
      {social && social.instagram && (
        <a href={social.instagram} target='_blank' rel='noopener noreferrer'>
          <i className='fas fa-camera fa-lg' />
        </a>
      )}
    </div>
  </div>
);

ProfileTop.propTypes = {
  profile: PropTypes.object.isRequired
};

export default ProfileTop;
