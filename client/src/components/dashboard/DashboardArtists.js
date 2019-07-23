import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import RecommendItem from './RecommendItem';
import { getArtists } from '../../actions/artists';

const DashboardArtists = ({
  artist: { artists, loading },
  profile: { profile },
  getArtists
}) => {
  useEffect(() => {
    getArtists(profile.artists);
  }, [getArtists]);
  if (loading || !artists) return <h1>Loading...</h1>;
  else {
    const { urls, recommends } = artists;
    const names = profile.artists;
    return (
      <div className='dashboard-artists'>
        <h4 className='lead'>My favorite Artists</h4>
        <ul>
          {names.map((name, index) => (
            <li key='index' className='artist'>
              <a
                href={urls[index].spotify}
                target='_blank'
                className='btn btn-primary'
              >
                <i className='fas fa-music fa-1x' />
                {name}
              </a>
            </li>
          ))}
        </ul>
        <h4 className='lead recommends-title'>What to listen...</h4>
        <div className='recommends'>
          {recommends.map((item, index) => (
            <RecommendItem key={index} album={item.album} />
          ))}
        </div>
      </div>
    );
  }
};

const mapStateToProps = state => ({
  profile: state.profile,
  artist: state.artist
});

export default connect(
  mapStateToProps,
  { getArtists }
)(DashboardArtists);
