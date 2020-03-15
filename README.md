# Fanusic

This is a MERN stack based social platform for fans and music lovers. Integrated with the [Spotify Web API](https://developer.spotify.com/documentation/web-api/).

## demo

You can try it [here](https://fanusic.herokuapp.com/).

## description

Users are able to

- customize their profiles
- add their favorite artists
- explore and connect to other music lovers
- get their personalized album recommendations(with profile created)
- write posts
- like/dislike a post
- add comments

and so on...

![image](https://s1.ax1x.com/2020/03/15/81WPgK.png)


## config

To run it locally, you need to

- get a [Spotify Client Id](https://developer.spotify.com/dashboard/)
- create a default.json file under the config folder:

```
{
  "mongoURI": "YOUR_MONGODB_CONNECTION",
  "jwtSecret": "SOME_SECRET",
  "client_id": "YOUR_SPOTIFY_CLIENT_ID",
  "client_secret": "YOUR_SPOTIFY_CLIENT_SECRET"
}
```

## build

```
cd client
npm run build
```

## run

```
#Install server dependencies
npm install

#Install client dependencies
npm run client-install

#Run the server
npm run server

#Run the client
npm run client
```

Hope you enjoy!
