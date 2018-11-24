import React from 'react';
import './SearchBar.css';

class SearchBar extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      term: ''
    };
    this.search=this.search.bind(this);
    this.handleTermChange=this.handleTermChange.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
  }
  search(searchTerm){
    this.props.onSearch(searchTerm);
  }
  handleTermChange(event){
    this.setState({
      term:event.target.value
    });
  }
  handleSearch() {
    this.search(this.state.term);
  }
  render(){
    return (
      <div className="SearchBar">
      <input placeholder="Enter A Song, Album, or Artist"
             onChange={this.handleTermChange}
      />
      <a onClick={this.handleSearch}>SEARCH</a>
      </div>
    );
  }
};

export default SearchBar;
