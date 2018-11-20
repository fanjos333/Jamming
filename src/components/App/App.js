import React from 'react';
import './App.css';
import SeachBar from '../SearchBar/SearchBar.js';
import SearchResults from '../SearchResults/SearchResults.js';
import PlayList from '../PlayList/PlayList.js';

class App extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      searchResults:[{
        name: 'name',
        artist: 'artist',
        album: 'album'
      }],
      playlistName:"Play List",
      playlistTracks:[{
        name:"name",
        artist:"artist",
        album:"album",
        id:"id"
      }]

    }
  }

  render(){
    return (
      <div>
      <h1>Ja<span className="highlight">mmm</span>ing</h1>
      <div className="App">
      <SeachBar />
      <div className="App-playlist">
      <SearchResults searchResults = {this.state.searchResults}/>
      <PlayList playlistName={this.state.playlistName} playlistTracks={this.state.playlistTracks}/>
      </div>
      </div>
      </div>);
    }
  };

  export default App;
