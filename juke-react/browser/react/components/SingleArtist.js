import React, { Component } from 'react';
import axios from 'axios';
import Songs from './Songs';
import AllAlbums from './AllAlbums';
import { Link, Route } from 'react-router-dom';

export default class SingleArtist extends Component{
	constructor(){
		super();
		this.state = {
			artist: {},
			songs: [],
			albums: []
		}
	}

	componentDidMount(){
		const artistId = this.props.match.params.artistId;
		Promise.all([
			axios.get(`/api/artists/${artistId}`),
			axios.get(`/api/artists/${artistId}/songs`),
			axios.get(`/api/artists/${artistId}/albums`)
		])
		.then(([artist, songs, albums]) => {
		 	// console.log(artist.data, songs.data, albums.data)
			this.setState({
			 	artist: artist.data, 
			 	songs: songs.data,
			 	albums: albums.data
			 })
		})
	}

	render () {

  const {artist, songs, albums} = this.state; 
  const albumsPath = `/artists/${artist.id}/albums`;
  const songsPath = `/artists/${artist.id}/songs`

  return (
    <div>
      <h3>{ artist.name }</h3>
      <ul className="nav nav-tabs">
        <li><Link to={albumsPath}>ALBUMS</Link></li>
        <li><Link to={songsPath}>SONGS</Link></li>
      </ul>

      <Route  path={albumsPath} render={() => (<AllAlbums albums={albums}/>)}/>
      <Route  path={songsPath} render={() => (<Songs songs={songs}/>)}/>

    </div>
  );
}


}