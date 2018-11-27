import React from 'react';
import './TrackList.css';
import Track from '../Track/Track.js';

class TrackList extends React.Component{

  render() {
    //const tracks = this.props.tracks !== undefined ? this.props.tracks : [];
    return(
      <div className="TrackList">
      {
        this.props.tracks.map((track) => {
          return (
            <Track
              isRemoval={this.props.isRemoval}
              key={track.id}
              onAdd={this.props.onAdd}
              onRemove={this.props.onRemove}
              track={track}
            />
          );
        })
      }
      </div>
    );
  }
};

export default TrackList;
