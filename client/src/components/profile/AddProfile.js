import React, { useState, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import { addProfile } from '../../actions/profile';

const AddProfile = ({ addProfile, history }) => {
  const [formData, setFormData] = useState({
    location: '',
    artists: '',
    bio: '',
    twitter: '',
    facebook: '',
    youtube: '',
    instagram: ''
  });
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
    addProfile(formData, history);
  };

  return (
    <Fragment>
      <h1 className='large text-primary'>Create Your Profile</h1>
      <p className='lead'>
        <i className='fas fa-user' />
      </p>
      <small>* = required field</small>
      <form className='form' onSubmit={e => onSubmit(e)}>
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
          * Fav Artists
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

AddProfile.propTypes = {
  addProfile: PropTypes.func.isRequired
};

export default connect(
  null,
  { addProfile }
)(withRouter(AddProfile));
