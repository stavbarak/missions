import React, { Component } from 'react';
import ResultsTable from './ResultsTable';

class MainView extends Component {
   constructor(props){
    super(props);
    this.state = {
      missions: [],
      loaded: false
    }
  }
  componentWillMount = () => {
    const FETCH_URL = this.props.baseURL;
    fetch(FETCH_URL, {
      method: 'GET'
    })
    .then(response => response.json())
    .then(json => {
      this.setState({
        missions: json,
        loaded: true
      })
    })
    .catch(err => {
          console.log(err)
      })
      
  }

  render () {
    const { missions } = this.state;
    return (
      <div>
        {this.state.loaded ? <ResultsTable listOfResults={ missions }/> : '...'}
      </div>
    )
  }
}

export default MainView;
