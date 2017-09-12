import React, { Component } from 'react';
import axios from 'axios';
import Songs from './Songs'

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

	render(){
		const {artist, songs, albums} = this.state;
		console.log("render = ", artist, songs, albums)
		return (
			<div>
			  <h3>{artist.name}</h3>
			  <h4>ALBUMS</h4>
			  <h4>SONGS</h4>
			  <Songs songs={songs} />
			</div>
		);
	}


}