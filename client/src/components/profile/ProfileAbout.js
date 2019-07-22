import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

const ProfileAbout = ({ profile: { bio, artists } }) => (
  <div className='bg-primary p-2'>
    {bio && (
      <Fragment>
        <h2 className='text-primary'>Bio</h2>
        <p>{bio}</p>
        <div className='line' />
      </Fragment>
    )}
    <h2 className='text-primary'>Favorite Artists</h2>
    <div className='artists'>
      {artists.map((artist, index) => (
        <div key={index} className='p-1'>
          {artist}
        </div>
      ))}
    </div>
  </div>
);

ProfileAbout.propTypes = {
  profile: PropTypes.object.isRequired
};

export default ProfileAbout;
