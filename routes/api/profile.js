const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const { check, validationResult } = require('express-validator');
const Profile = require('../../models/Profile');
const User = require('../../models/User');
const encode64 = require('../../utils/encode64');
const axios = require('axios');
const config = require('config');

// @route GET api/profile/me
// @desc Get current user profile
// @access Private
router.get('/me', auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user.id }).populate(
      'user',
      ['name', 'avatar']
    );

    if (!profile) {
      return res.status(400).json({ msg: 'There is no profile for this user' });
    }

    res.json(profile);
  } catch (err) {
    console.error('Server error');
    res.status(500).send('Server Error');
  }
});

// @route POST api/profile
// @desc Create or update user
// @access Private
router.post(
  '/',
  auth,
  [
    // check('status', 'Status is required')
    //   .not()
    //   .isEmpty(),
    check('artists', 'Artists is required')
      .not()
      .isEmpty()
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const {
      location,
      bio,
      artists,
      youtube,
      facebook,
      twitter,
      instagram
    } = req.body;

    //build profile array
    const profileFields = {};
    profileFields.user = req.user.id;
    if (location) profileFields.location = location;
    if (bio) profileFields.bio = bio;
    if (artists) {
      profileFields.artists = artists.split(',').map(artist => artist.trim());
    }

    //build social object
    profileFields.social = {};
    if (youtube) profileFields.social.youtube = youtube;
    if (twitter) profileFields.social.twitter = twitter;
    if (facebook) profileFields.social.facebook = facebook;
    if (instagram) profileFields.social.instagram = instagram;

    //interact with database
    try {
      let profile = await Profile.findOne({ user: req.user.id });
      if (profile) {
        //update
        profile = await Profile.findOneAndUpdate(
          { user: req.user.id },
          { $set: profileFields },
          { new: true }
        );
        return res.json(profile);
      }
      profile = new Profile(profileFields);
      await profile.save();
      res.json(profile);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error.');
    }

    console.log(profileFields);
  }
);

// @route GET api/profile
// @desc Get current user profile
// @access Public
router.get('/', async (req, res) => {
  try {
    const profiles = await Profile.find().populate('user', ['name', 'avatar']);
    res.json(profiles);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error.');
  }
});

// @route GET api/profile/user/:user_id
// @desc Get profile by userid
// @access Public
router.get('/user/:user_id', async (req, res) => {
  try {
    const profile = await Profile.findOne({
      user: req.params.user_id
    }).populate('user', ['name', 'avatar']);

    if (!profile) return res.status(400).json({ msg: 'Profile not found' });

    res.json(profile);
  } catch (error) {
    console.error(error.message);
    if (error.kind == 'ObjectId') {
      res.status(400).json({ msg: 'Profile not found' });
    }
    res.status(500).send('Server Error');
  }
});

// @route DELETE api/profile/
// @desc delete profile, user & posts
// @access Private
router.delete('/', auth, async (req, res) => {
  try {
    // remove user posts
    await Post.deleteMany({ user: req.user.id });
    // remove user profile
    await Profile.findOneAndRemove({ user: req.user.id });
    // remove user
    await User.findOneAndRemove({ _id: req.user.id });
    res.json({ msg: 'User deleted' });
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
});

// @route GET api/profile/artists
// @desc Get artist urls and album recommendations
// @access Public
router.get('/artists', async (req, res) => {
  try {
    const artists = req.query.artists.split(',');

    const ext_urls = [];
    const spotify_ids = [];
    let res_artist = '';
    let result = {};
    const client_id = config.get('client_id');
    const client_secret = config.get('client_secret');
    const basic = encode64(client_id + ':' + client_secret);
    // console.log(basic);
    const cred = await axios({
      url: 'https://accounts.spotify.com/api/token',
      method: 'post',
      params: {
        grant_type: 'client_credentials'
      },
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      auth: {
        username: client_id,
        password: client_secret
      }
    });
    // .then(function(response) {
    //   console.log(response.data.access_token);
    const bearer = cred.data.access_token;

    console.log(`Bearer ${bearer}`);
    let axiosArray = [];
    artists.forEach(artist => {
      const options = {
        method: 'GET',
        url: `https://api.spotify.com/v1/search?q=${artist}&type=artist`,
        headers: {
          Authorization: `Bearer ${bearer}`,
          Accept: 'application/json',
          'Content-Type': 'application/json'
        }
      };
      // const res_artist = await axios(options);
      axiosArray.push(axios(options));
    });
    try {
      const res_artists = await axios.all(axiosArray);
      res_artists.forEach(res_artist => {
        ext_urls.push(res_artist.data.artists.items[0].external_urls);
        spotify_ids.push(res_artist.data.artists.items[0].id);
      });

      // res.json(spotify_ids);

      const rand_id =
        spotify_ids[Math.floor(Math.random() * spotify_ids.length)];
      try {
        const option = {
          method: 'GET',
          url: `https://api.spotify.com/v1/recommendations?seed_artists=${rand_id}&limit=8&market=CA`,
          headers: {
            Authorization: `Bearer ${bearer}`,
            Accept: 'application/json',
            'Content-Type': 'application/json'
          }
        };
        const res_albums = await axios(option);
        res.json({ urls: ext_urls, recommends: res_albums.data.tracks });
      } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
      }
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }

  // artists.map(async (artist, index) => {
  //   console.log(artist);
  //   res_artist = await axios.get('https://api.spotify.com/v1/search', {
  //     params: {
  //       type: 'artist',
  //       q: artist
  //     },
  //     headers: {
  //       Authorziation: bearer
  //     }
  //   });

  //   ext_urls.push(res_artist.data.external_urls);
  //   spotify_ids.push(res_artist.data.id);
  // });
  // console.log(res.artists);
  // //  res.json({ext_urls, spotify_ids});
  // try {
  //   const rand_id =
  //     spotify_ids[Math.floor(Math.random() * spotify_ids.length)];
  //   res_albums = await axios.get(
  //     'https://api.spotify.com/v1/recommendations',
  //     {
  //       params: {
  //         seed_artists: rand_id,
  //         limit: 5,
  //         market: 'CA'
  //       },
  //       headers: {
  //         Authorziation: bearer
  //       }
  //     }
  //   );
  //   console.log(res_albums);
  //   res.json(res_albums.data);
  // } catch (err) {
  //   console.error(err.message);
  // }
});

module.exports = router;
