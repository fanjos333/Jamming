let accessToken;

const client_id = '2edc50ff19064f3993df01afc5f3bcad';
const redirect_uri = 'https://fanjos_jammming.surge.sh';
//const redirect_uri = 'http://localhost:3000/';
const apiUrl = 'https://api.spotify.com/v1/';


const Spotify={
  getAccessToken(){
    const urlAccessToken=window.location.href.match(/access_token=([^&]*)/);
    const expirationTime=window.location.href.match(/expires_in=([^&]*)/);

    if(accessToken){
      return accessToken;
    }
    else if(!accessToken && urlAccessToken){
      accessToken = urlAccessToken[1];
      let expiresIn = expirationTime[1];
      window.setTimeout(() => accessToken = '', expiresIn * 1000);
      window.history.pushState('Access Token', null, '/');
      return accessToken;
    }
    else{
      const endPoint=`https://accounts.spotify.com/authorize?client_id=${client_id}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirect_uri}`;
      window.location=endPoint;
    }
  },
  search(searchTerm){
    const accessToken = Spotify.getAccessToken();
    return fetch(`${apiUrl}search?type=track&q=${searchTerm}`,{
      method:"GET",
      headers:{
        Authorization: `Bearer ${accessToken}`
      }
    }).then((response) => {
      return response.json();
    }).then((jsonResponse)=>{
      if(jsonResponse.tracks){
        return jsonResponse.tracks.items.map((track)=>{
          return {
            id:track.id,
            name:track.name,
            artist:track.artists[0].name,
            album:track.album.name,
            uri:track.uri
          };
        });
      }
    })
  },
  savePlaylist(playlistName, trackURIs){
    const accessToken = Spotify.getAccessToken();
    let userId;
    let playlistId;

    if(!playlistName && !trackURIs){
      return;
    }
    else{
      let endPoint=`${apiUrl}me`
      return fetch(endPoint,{
        method:"GET",
        headers:{
          Authorization: `Bearer ${accessToken}`
        }

      }).then((response)=>{
        return response.json();
      }).then((jsonResponse)=>{
        userId=jsonResponse.id;
        endPoint=`${apiUrl}users/${userId}/playlists`
        return fetch(endPoint, {
          method:"POST",
          headers: {
            Authorization: `Bearer ${accessToken}`
          },
          body: JSON.stringify({
            name:playlistName
          })
        }).then((response)=>{
          return response.json();
        }).then((jsonResponse)=>{
          if(jsonResponse.id){
            playlistId = jsonResponse.id;
            endPoint=`${apiUrl}users/${userId}/playlists/${playlistId}/tracks`;
            return fetch(endPoint, {
              method:"POST",
              headers: {
                Authorization: `Bearer ${accessToken}`
              },
              body: JSON.stringify(
                {
                  uris: trackURIs
                }
              )
            })
          }
        })
      })
    }

  }
}



export default Spotify
