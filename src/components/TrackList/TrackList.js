import React from 'react';
import './TrackList.css';
import Track from '../Track/Track.js';

class TrackList extends React.Component{

  render() {
    const tracks = this.props.tracks != undefined ? this.props.tracks : [];
    return(
      <div className="TrackList">
      {
        tracks.map((value) => {
          return (
            <Track key={value.id} track={value}></Track>
          )
        })
      }
      </div>
    );
  }
};

export default TrackList;
