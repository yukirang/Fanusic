import React, { useState, Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import { addProfile, getCurrentProfile } from '../../actions/profile';

const EditProfile = ({
  profile: { profile, loading },
  addProfile,
  getCurrentProfile,
  history
}) => {
  const [formData, setFormData] = useState({
    location: '',
    artists: '',
    bio: '',
    twitter: '',
    facebook: '',
    youtube: '',
    instagram: ''
  });

  useEffect(() => {
    getCurrentProfile();

    setFormData({
      location: loading || !profile.location ? '' : profile.location,
      artists: loading || !profile.artists ? '' : profile.artists.join(','),
      bio: loading || !profile.bio ? '' : profile.bio,
      twitter: loading || !profile.social ? '' : profile.social.twitter,
      facebook: loading || !profile.social ? '' : profile.social.facebook,
      youtube: loading || !profile.social ? '' : profile.social.youtube,
      instagram: loading || !profile.social ? '' : profile.social.instagram
    });
  }, [loading, getCurrentProfile]);

  const {
    location,
    artists,
    bio,
    twitter,
    facebook,
    youtube,
    instagram
  } = formData;

  const onChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = e => {
    e.preventDefault();
    addProfile(formData, history, true);
  };

  return (
    <Fragment>
      <h1 className='large text-primary'>Create Your Profile</h1>
      <p className='lead'>
        <i className='fas fa-user' />
      </p>
      <form className='form' onSubmit={e => onSubmit(e)}>
        <div className='form-group'>
          Location
          <input
            type='text'
            placeholder='Location'
            name='location'
            value={location}
            onChange={e => onChange(e)}
          />
        </div>

        <div className='form-group'>
          Introduction
          <textarea
            placeholder='Introduce yourself...'
            name='bio'
            value={bio}
            onChange={e => onChange(e)}
          />
        </div>
        <div className='form-group'>
          Fav Artists
          <input
            type='text'
            placeholder='Favorite artists, split with ","'
            name='artists'
            value={artists}
            onChange={e => onChange(e)}
          />
        </div>

        <div className='form-group social-input'>
          <i className='fab fa-twitter fa-2x' />
          <input
            type='text'
            placeholder='Twitter URL'
            name='twitter'
            value={twitter}
            onChange={e => onChange(e)}
          />
        </div>

        <div className='form-group social-input'>
          <i className='fab fa-facebook fa-2x' />
          <input
            type='text'
            placeholder='Facebook URL'
            name='facebook'
            value={facebook}
            onChange={e => onChange(e)}
          />
        </div>

        <div className='form-group social-input'>
          <i className='fab fa-youtube fa-2x' />
          <input
            type='text'
            placeholder='YouTube URL'
            name='youtube'
            value={youtube}
            onChange={e => onChange(e)}
          />
        </div>

        <div className='form-group social-input'>
          <i className='fab fa-instagram fa-2x' />
          <input
            type='text'
            placeholder='Instagram URL'
            name='instagram'
            value={instagram}
            onChange={e => onChange(e)}
          />
        </div>
        <input type='submit' className='btn btn-primary' />
        <Link to='/dashboard' className='btn btn-light'>
          Go Back
        </Link>
      </form>
    </Fragment>
  );
};

EditProfile.propTypes = {
  addProfile: PropTypes.func.isRequired,
  getCurrentProfile: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile
});
export default connect(
  mapStateToProps,
  { addProfile, getCurrentProfile }
)(withRouter(EditProfile));
